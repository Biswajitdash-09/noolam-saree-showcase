import type { CSSProperties } from "react";
import type { PatternId, Swatch } from "@/lib/data";
import { cn } from "@/lib/utils";

const gold = "rgba(232, 205, 130,";
const goldDeep = "rgba(154, 118, 32,";

function patternLayers(pattern: PatternId): string[] {
  switch (pattern) {
    case "zari":
      return [
        `linear-gradient(90deg, transparent 0 8%, ${gold}0.85) 8% 9.6%, transparent 9.6% 90.4%, ${gold}0.85) 90.4% 92%, transparent 92%)`,
        `linear-gradient(90deg, transparent 0 11%, rgba(255,255,255,0.16) 11% 11.4%, transparent 11.4% 88.6%, rgba(255,255,255,0.16) 88.6% 89%, transparent 89%)`,
        `radial-gradient(circle, ${gold}0.9) 0 1.4px, transparent 1.9px)`,
        `radial-gradient(circle, ${gold}0.55) 0 1px, transparent 1.5px)`,
      ];
    case "check":
      return [
        `repeating-linear-gradient(0deg, transparent 0 17px, ${gold}0.5) 17px 19px, transparent 19px 62px, rgba(0,0,0,0.22) 62px 64px, transparent 64px)`,
        `repeating-linear-gradient(90deg, transparent 0 17px, ${gold}0.5) 17px 19px, transparent 19px 62px, rgba(0,0,0,0.22) 62px 64px, transparent 64px)`,
        `repeating-linear-gradient(90deg, transparent 0 5px, rgba(255,255,255,0.06) 5px 7px)`,
      ];
    case "buta":
      return [
        `radial-gradient(circle at 50% 45%, ${gold}0.95) 0 2.4px, transparent 3.4px)`,
        `radial-gradient(circle at 50% 45%, transparent 0 5px, ${gold}0.45) 5.6px, transparent 6.4px)`,
        `radial-gradient(circle, rgba(255,255,255,0.35) 0 1px, transparent 1.6px)`,
      ];
    case "stripe":
      return [
        `repeating-linear-gradient(105deg, transparent 0 10px, rgba(255,255,255,0.10) 10px 12px, transparent 12px 26px, rgba(0,0,0,0.12) 26px 28px)`,
        `repeating-linear-gradient(90deg, transparent 0 24px, ${gold}0.28) 24px 25px)`,
      ];
    case "temple":
      return [
        `linear-gradient(0deg, ${gold}0.95) 0 7%, transparent 7% 12%, ${gold}0.35) 12% 13%, transparent 13%)`,
        `repeating-conic-gradient(from 135deg at 50% 100%, ${gold}0.75) 0deg 45deg, transparent 45deg 90deg)`,
        `repeating-linear-gradient(90deg, transparent 0 14px, rgba(0,0,0,0.18) 14px 16px)`,
      ];
    case "brocade":
      return [
        `repeating-linear-gradient(45deg, transparent 0 12px, ${gold}0.22) 12px 13px, transparent 13px 30px)`,
        `repeating-linear-gradient(-45deg, transparent 0 12px, rgba(255,255,255,0.14) 12px 13px, transparent 13px 30px)`,
        `radial-gradient(circle, ${gold}0.85) 0 1.6px, transparent 2.2px)`,
        `radial-gradient(circle, ${goldDeep}0.7) 0 1.2px, transparent 1.8px)`,
      ];
    default:
      return [
        `repeating-linear-gradient(90deg, transparent 0 3px, rgba(255,255,255,0.05) 3px 4px)`,
      ];
  }
}

function patternSizes(pattern: PatternId): string[] {
  switch (pattern) {
    case "zari":
      return ["100% 100%", "100% 100%", "26px 34px", "26px 34px"];
    case "check":
      return ["74px 74px", "74px 74px", "100% 100%"];
    case "buta":
      return ["34px 38px", "34px 38px", "34px 38px"];
    case "stripe":
      return ["100% 100%", "100% 100%"];
    case "temple":
      return ["100% 100%", "26px 18px", "100% 100%"];
    case "brocade":
      return ["22px 22px", "22px 22px", "18px 20px", "18px 20px"];
    default:
      return ["100% 100%"];
  }
}

function patternPositions(pattern: PatternId): string[] {
  switch (pattern) {
    case "zari":
      return ["0 0", "0 0", "0 0", "13px 17px"];
    case "buta":
      return ["0 0", "0 0", "17px 19px"];
    case "brocade":
      return ["0 0", "0 0", "0 0", "9px 10px"];
    default:
      return [];
  }
}

export function silkStyle(swatch: Swatch, flip = false): CSSProperties {
  const base = [
    `linear-gradient(${flip ? 200 : 162}deg, ${swatch.light} 0%, ${swatch.base} 38%, ${swatch.base} 62%, ${swatch.deep} 100%)`,
    `radial-gradient(120% 80% at 20% 12%, rgba(255,255,255,0.28), transparent 55%)`,
    ...patternLayers(swatch.pattern),
  ];
  const sizes = ["100% 100%", "100% 100%", ...patternSizes(swatch.pattern)];
  const positions = ["0 0", "0 0", ...patternPositions(swatch.pattern)];

  return {
    backgroundColor: swatch.base,
    backgroundImage: base.join(", "),
    backgroundSize: sizes.slice(0, base.length).join(", "),
    backgroundPosition: positions.slice(0, base.length).join(", "),
  };
}

const fold =
  "linear-gradient(90deg, rgba(0,0,0,0.30) 0%, transparent 14%, rgba(255,255,255,0.12) 30%, transparent 46%, rgba(0,0,0,0.16) 62%, transparent 76%, rgba(0,0,0,0.28) 100%)";

type SilkArtProps = {
  swatch: Swatch;
  shape?: "panel" | "drape" | "blouse";
  className?: string;
  flip?: boolean;
  sheen?: boolean;
};

export function SilkArt({
  swatch,
  shape = "panel",
  className,
  flip = false,
  sheen = true,
}: SilkArtProps) {
  return (
    <div
      aria-hidden
      className={cn("relative overflow-hidden", className)}
      style={{
        ...silkStyle(swatch, flip),
        clipPath:
          shape === "panel" ? undefined : `url(#silk-${shape})`,
      }}
    >
      {sheen && (
        <div
          className="absolute inset-0"
          style={{ backgroundImage: fold, opacity: 0.75 }}
        />
      )}
      {shape === "blouse" && (
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path
            d="M33 8 Q50 24 67 8"
            fill="none"
            stroke="rgba(232,205,130,0.9)"
            strokeWidth="2.2"
          />
          <path
            d="M28 9 L38 5"
            stroke="rgba(232,205,130,0.55)"
            strokeWidth="1.4"
          />
          <path
            d="M72 9 L62 5"
            stroke="rgba(232,205,130,0.55)"
            strokeWidth="1.4"
          />
        </svg>
      )}
      {shape === "drape" && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 h-[9%]"
            style={{
              background:
                "linear-gradient(180deg, transparent, rgba(0,0,0,0.22) 60%, rgba(0,0,0,0.4))",
            }}
          />
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="absolute inset-0 h-full w-full"
            aria-hidden
          >
            <path
              d="M83 88.6 C76 90 70 87.6 63 89 C56 90.4 50 87 43 88.5 C36 90 30 87.2 24 88.7 C20 89.6 17.5 89.8 17 88.6 L17.4 82.6 C18 82.2 20 82 22.6 82.4 C28 83.4 34 82 40 83.2 C46 84.4 52 81.4 58 82.8 C64 84.2 70 81.6 76 82.6 C79.5 83.2 81.6 82.6 82.7 82.4 Z"
              fill="rgba(232,205,130,0.62)"
            />
            <path
              d="M83 82.4 C81.6 82.6 79.5 83.2 76 82.6 C70 81.6 64 84.2 58 82.8 C52 81.4 46 84.4 40 83.2 C34 82 28 83.4 22.6 82.4 C20 82 18 82.2 17.4 82.6"
              fill="none"
              stroke="rgba(120,88,16,0.5)"
              strokeWidth="0.7"
            />
            <path
              d="M33 4 L33.8 40 L34.6 78 L35 88.6"
              fill="none"
              stroke="rgba(0,0,0,0.12)"
              strokeWidth="1.4"
            />
            <path
              d="M25.6 6.6 C33 8.4 42 6.8 50 8.2 C58 9.4 66 7.2 74.4 7.4"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.8"
            />
            <path
              d="M24.8 11.4 C33 13 42 11.6 50 12.8 C58 14 66 12 74.8 12.4"
              fill="none"
              stroke="rgba(0,0,0,0.16)"
              strokeWidth="0.9"
            />
            <path
              d="M83 86.4 C76 87.8 70 85.4 63 86.8 C56 88.2 50 84.8 43 86.3 C36 87.8 30 85 24 86.5 C20 87.4 17.5 87.6 17.1 86.4"
              fill="none"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="0.8"
            />
            <path
              d="M45 4 L45.6 42 L46.2 80 L46.6 89"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1.2"
            />
            <path
              d="M58 4 L58.4 42 L58.8 80 L59 89"
              fill="none"
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="1.2"
            />
            <path
              d="M71 4 L71.2 42 L71.4 80 L71.6 89"
              fill="none"
              stroke="rgba(255,255,255,0.09)"
              strokeWidth="1"
            />
          </svg>
        </>
      )}
    </div>
  );
}

export function SilkClipDefs() {
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        <clipPath id="silk-drape" clipPathUnits="objectBoundingBox">
          <path
            d="M0.25 0.015 L0.75 0.015
               C0.762 0.14 0.775 0.30 0.79 0.46
               C0.80 0.60 0.815 0.76 0.83 0.885
               C0.76 0.905 0.70 0.875 0.63 0.89
               C0.56 0.905 0.50 0.87 0.43 0.885
               C0.36 0.90 0.30 0.872 0.24 0.888
               C0.20 0.898 0.175 0.90 0.17 0.885
               C0.185 0.76 0.20 0.60 0.21 0.46
               C0.225 0.30 0.238 0.14 0.25 0.015 Z"
          />
        </clipPath>
        <clipPath id="silk-blouse" clipPathUnits="objectBoundingBox">
          <path
            d="M0.17 0.1 L0.3 0.045 L0.4 0.115
               L0.6 0.115 L0.7 0.045 L0.83 0.1
               L0.9 0.295 L0.775 0.355 L0.735 0.56
               C0.6 0.615 0.4 0.615 0.265 0.56
               L0.225 0.355 L0.1 0.295 Z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
