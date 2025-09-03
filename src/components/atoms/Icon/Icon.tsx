"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils/cn";
import type { IconType } from "@/lib/utils/iconMap";
import { iconMap } from "@/lib/utils/iconMap";

type IconProps = React.SVGProps<SVGSVGElement> & {
  type: IconType;
  className?: string;
};

export function Icon({ type, className = "", ...props }: IconProps) {
  const [svgContent, setSvgContent] = useState<string | null>(null);

  useEffect(() => {
    const fetchIcon = async () => {
      try {
        const response = await fetch(iconMap[type]);
        const svgText = await response.text();
        setSvgContent(svgText);
      } catch (error) {
        console.error(`Errore nel caricamento dell'icona ${type}:`, error);
      }
    };

    fetchIcon();
  }, [type]);

  if (!svgContent) return null;

  return (
    <svg
      {...props}
      className={cn(className)}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: SVG content is safely fetched from trusted icon files
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
