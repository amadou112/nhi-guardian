import Image from "next/image";
import { cn } from "@/lib/utils";

interface DuotoneImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Opacity of the color wash — lower reads more like a photo, higher reads more like a graphic. */
  intensity?: "subtle" | "medium" | "strong";
}

const INTENSITY_OPACITY: Record<NonNullable<DuotoneImageProps["intensity"]>, string> = {
  subtle: "opacity-60",
  medium: "opacity-80",
  strong: "opacity-95",
};

// Tints any photo/illustration toward the brand's indigo/violet palette so
// stock imagery reads as one cohesive graphic system instead of clashing
// full-color photography dropped into a bespoke dark UI.
export function DuotoneImage({
  src,
  alt,
  fill,
  width,
  height,
  sizes,
  priority,
  className,
  imgClassName,
  intensity = "medium",
}: DuotoneImageProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill={fill}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        sizes={sizes}
        priority={priority}
        className={cn("grayscale contrast-125 brightness-90", imgClassName)}
      />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-br from-accent-600 via-accent-900 to-glow-600 mix-blend-color",
          INTENSITY_OPACITY[intensity]
        )}
      />
    </div>
  );
}
