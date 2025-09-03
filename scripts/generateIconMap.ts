import fs from "node:fs";
import path from "node:path";

const ICONS_DIR = path.resolve(process.cwd(), "public", "icons");
const OUTPUT_FILE = path.resolve(
  process.cwd(),
  "src",
  "lib",
  "utils",
  "iconMap.ts",
);

function generateIconMap(): void {
  try {
    if (fs.existsSync(OUTPUT_FILE)) {
      fs.unlinkSync(OUTPUT_FILE);
    }

    if (!fs.existsSync(ICONS_DIR)) {
      console.error(`La cartella delle icone non esiste: ${ICONS_DIR}`);
      return;
    }

    const iconFiles = fs
      .readdirSync(ICONS_DIR)
      .filter((file) => path.extname(file) === ".svg")
      .map((file) => file.toLowerCase());

    if (iconFiles.length === 0) {
      console.warn("Nessuna icona SVG trovata. Rimuovo il file di mapping.");

      const utilsDir = path.dirname(OUTPUT_FILE);
      try {
        const files = fs.readdirSync(utilsDir);
        if (files.length === 0) {
          fs.rmdirSync(utilsDir);
        }
      } catch (error) {
        console.error(
          "Errore durante la rimozione della cartella utils:",
          error,
        );
      }

      return;
    }

    const iconMap = iconFiles.reduce((map: Record<string, string>, file) => {
      const iconName = path
        .basename(file, ".svg")
        .replace(/[-\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ""));

      map[iconName] = `/icons/${file}`;
      return map;
    }, {});

    const utilsDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(utilsDir)) {
      fs.mkdirSync(utilsDir, { recursive: true });
    }

    let existingIconMap: Record<string, string> = {};
    try {
      if (fs.existsSync(OUTPUT_FILE)) {
        const existingContent = fs.readFileSync(OUTPUT_FILE, "utf-8");
        const match = existingContent.match(
          /export const iconMap = (.*) as const/,
        );
        if (match) {
          existingIconMap = JSON.parse(match[1]);
        }
      }
    } catch (error) {
      console.error("Errore nella lettura del mapping esistente:", error);
    }

    Object.keys(existingIconMap).forEach((iconName) => {
      const iconPath = existingIconMap[iconName].replace("/icons/", "");
      const fullIconPath = path.resolve(ICONS_DIR, iconPath);

      if (!fs.existsSync(fullIconPath)) {
        console.log(`Icona rimossa: ${iconPath}`);
      }
    });

    fs.writeFileSync(
      OUTPUT_FILE,
      `export const iconMap = ${JSON.stringify(iconMap, null, 2)} as const;

export type IconType = keyof typeof iconMap;`,
    );

    console.log(`Mapping delle icone generato con successo!`);
    console.log(`Icone trovate: ${Object.keys(iconMap).join(", ")}`);
  } catch (error) {
    console.error(
      "Errore durante la generazione del mapping delle icone:",
      error,
    );
    process.exit(1);
  }
}

generateIconMap();
