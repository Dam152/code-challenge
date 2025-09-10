export type Locale = "en" | "it";

export const getClientDictionary = async (locale: Locale) => {
  const dictionaries = {
    en: () =>
      import("../../dictionaries/en.json").then((module) => module.default),
    it: () =>
      import("../../dictionaries/it.json").then((module) => module.default),
  };

  return dictionaries[locale]();
};
