'use client';
import React, { useState, useEffect } from 'react';
import { iconMap } from '@/lib/utils/iconMap';
import type { IconType } from '@/lib/utils/iconMap';
import { cn } from '@/lib/utils/cn';

type IconProps = React.SVGProps<SVGSVGElement> & {
  type: IconType;
  className?: string;
};

export function Icon({ type, className = '', ...props }: IconProps) {
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
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  );
}
