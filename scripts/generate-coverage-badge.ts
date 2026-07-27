import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type CoverageSummary = {
  total: {
    lines: {
      pct: number;
    };
  };
};

const rootDir = process.cwd();
const summaryPath = path.join(rootDir, "coverage", "coverage-summary.json");
const badgeDir = path.join(rootDir, "coverage", "badge");
const badgePath = path.join(badgeDir, "coverage.svg");

function getBadgeColor(value: number): string {
  if (value >= 90) return "#16a34a";
  if (value >= 80) return "#65a30d";
  if (value >= 70) return "#ca8a04";
  if (value >= 60) return "#ea580c";
  return "#dc2626";
}

async function main(): Promise<void> {
  const summaryFile = await readFile(summaryPath, "utf8");
  const summary = JSON.parse(summaryFile) as CoverageSummary;
  const coverage = Number(summary.total.lines.pct.toFixed(1));

  const color = getBadgeColor(coverage);
  const label = "coverage";
  const value = `${coverage}%`;
  const labelWidth = 86;
  const valueWidth = 62;
  const totalWidth = labelWidth + valueWidth;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${totalWidth}" height="28" role="img" aria-label="${label}: ${value}">
  <defs>
    <linearGradient id="shine" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffffff" stop-opacity=".14"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${labelWidth + 14}" height="28" rx="14" fill="#1f2937"/>
  <rect x="${labelWidth}" width="${valueWidth}" height="28" rx="14" fill="${color}"/>
  <rect x="${labelWidth}" width="14" height="28" fill="${color}"/>
  <rect width="${totalWidth}" height="28" rx="14" fill="url(#shine)"/>
  <g fill="#ffffff" font-family="Verdana,DejaVu Sans,sans-serif" font-size="12" text-anchor="middle">
    <text x="${labelWidth / 2}" y="18">${label}</text>
    <text x="${labelWidth + valueWidth / 2}" y="18">${value}</text>
  </g>
</svg>
`;

  await mkdir(badgeDir, { recursive: true });
  await writeFile(badgePath, svg, "utf8");

  console.log(`Coverage badge updated: ${path.relative(rootDir, badgePath)}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
