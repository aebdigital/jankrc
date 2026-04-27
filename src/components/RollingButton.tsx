import Link from "next/link";
import type { Route } from "next";

type Variant = "primary" | "outline" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-accent text-brand-dark hover:bg-white",
  outline:
    "border border-white/30 text-white hover:bg-white hover:text-brand-dark",
  dark: "bg-brand-dark text-white hover:bg-brand-accent hover:text-brand-dark",
};

type Props = {
  children: string;
  href?: Route | string;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
};

export default function RollingButton({
  children,
  href,
  variant = "primary",
  className = "",
  type = "button",
  disabled,
  onClick,
}: Props) {
  const base =
    "btn-roll font-semibold px-7 py-3.5 transition-colors duration-300 disabled:opacity-60";
  const merged = `${base} ${variants[variant]} ${className}`.trim();

  const inner = (
    <span className="btn-roll-text" data-text={children}>
      <span aria-hidden className="invisible">{children}</span>
    </span>
  );

  if (href) {
    return (
      <Link href={href as Route} className={merged}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} className={merged}>
      {inner}
    </button>
  );
}
