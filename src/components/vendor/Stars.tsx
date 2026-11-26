import Image from "next/image";

/** Row of rose-gold stars. Empty stars are shown faded. */
export default function Stars({ value, size = 14, className = "" }: { value: number; size?: number; className?: string }) {
  const full = Math.round(value);
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} role="img" aria-label={`${value} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Image
          key={i}
          src="/figma/icons/star-brand.svg"
          alt=""
          width={size}
          height={size}
          className={i < full ? "" : "opacity-25"}
          style={{ width: size, height: size }}
        />
      ))}
    </span>
  );
}
