import { spawn } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const defaultOutputPath = "reports/local-evidence-report.html";

const commandEvidence = [
  {
    label: "Full Local Verification",
    command: "corepack yarn verify",
    scope:
      "Typecheck, lint, node tests, local Solidity tests, and format check.",
  },
  {
    label: "Node Tests",
    command: "corepack yarn test",
    scope: "Deterministic local helper and policy tests.",
  },
  {
    label: "Solidity Contract Tests",
    command: "corepack yarn test:contracts",
    scope: "Local Hardhat contract behavior only.",
  },
  {
    label: "Playwright E2E",
    command: "corepack yarn test:e2e",
    scope: "Mocked-provider browser flows only.",
  },
  {
    label: "Typecheck",
    command: "corepack yarn typecheck",
    scope: "Next.js route type generation and TypeScript checks.",
  },
  {
    label: "Lint",
    command: "corepack yarn lint",
    scope:
      "ESLint checks for app, components, libraries, scripts, tests, and config.",
  },
  {
    label: "Formatting",
    command: "corepack yarn format:check",
    scope:
      "Prettier checks for configured source, test, config, and setup files.",
  },
];

const evidenceBoundaries = [
  "No real wallet",
  "No real funds",
  "No mainnet",
  "No testnet validation",
  "No paid infrastructure",
  "No production wallet",
  "No external assets",
  "No credential values",
];

const references = [
  "docs/qa/README.md",
  "docs/qa/test-plan.md",
  "docs/qa/traceability-matrix.md",
  "docs/qa/evidence-report-template.md",
  "docs/setup/local-app-runbook.md",
  "docs/specs/0010-local-html-evidence-report.md",
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function renderStatusCards() {
  return commandEvidence
    .map(
      (item) => `
        <article class="card">
          <div class="card-label">${escapeHtml(item.label)}</div>
          <code>${escapeHtml(item.command)}</code>
          <p>${escapeHtml(item.scope)}</p>
        </article>`,
    )
    .join("");
}

function renderCommandRows() {
  return commandEvidence
    .map(
      (item) => `
        <tr>
          <td>${escapeHtml(item.label)}</td>
          <td><code>${escapeHtml(item.command)}</code></td>
          <td>${escapeHtml(item.scope)}</td>
        </tr>`,
    )
    .join("");
}

export function buildEvidenceReportHtml(options = {}) {
  const generatedAt = options.generatedAt ?? new Date().toISOString();
  const commit = options.commit ?? "local working tree";
  const workingTreeStatus =
    options.workingTreeStatus ??
    "Run git status --short before publishing this report.";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>ChainLab QA Local Evidence Report</title>
    <style>
      :root {
        color-scheme: light;
        --background: #f6f7f9;
        --surface: #ffffff;
        --ink: #17202a;
        --muted: #5f6b7a;
        --line: #d9dee7;
        --accent: #146c63;
        --accent-soft: #dff3ee;
        --warn-soft: #fff1cf;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--background);
        color: var(--ink);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        line-height: 1.5;
      }

      main {
        width: min(1120px, calc(100% - 32px));
        margin: 0 auto;
        padding: 32px 0 48px;
      }

      header {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
        padding: 28px;
      }

      h1,
      h2 {
        margin: 0;
        line-height: 1.15;
      }

      h1 {
        font-size: 34px;
      }

      h2 {
        font-size: 22px;
      }

      p {
        margin: 10px 0 0;
        color: var(--muted);
      }

      code {
        border-radius: 6px;
        background: #eef1f5;
        color: #10202f;
        padding: 2px 6px;
        font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
        font-size: 0.92em;
      }

      section {
        margin-top: 24px;
      }

      .meta,
      .cards,
      .boundary-grid,
      .references {
        display: grid;
        gap: 12px;
      }

      .meta {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 20px;
      }

      .meta div,
      .card,
      .boundary,
      .references li,
      .note {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }

      .meta div {
        padding: 12px;
      }

      .meta span,
      .card-label {
        display: block;
        color: var(--muted);
        font-size: 12px;
        font-weight: 700;
        text-transform: uppercase;
      }

      .meta strong {
        display: block;
        margin-top: 4px;
        overflow-wrap: anywhere;
      }

      .cards {
        grid-template-columns: repeat(3, minmax(0, 1fr));
        margin-top: 14px;
      }

      .card {
        padding: 16px;
      }

      .card code {
        display: inline-block;
        margin-top: 8px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--surface);
      }

      th,
      td {
        padding: 12px;
        border-bottom: 1px solid var(--line);
        text-align: left;
        vertical-align: top;
      }

      th {
        background: #eef1f5;
        font-size: 12px;
        text-transform: uppercase;
      }

      tr:last-child td {
        border-bottom: 0;
      }

      .boundary-grid {
        grid-template-columns: repeat(4, minmax(0, 1fr));
        margin-top: 14px;
      }

      .boundary {
        background: var(--accent-soft);
        color: #0e4c46;
        font-weight: 700;
        padding: 12px;
      }

      .references {
        grid-template-columns: repeat(2, minmax(0, 1fr));
        margin: 14px 0 0;
        padding: 0;
        list-style: none;
      }

      .references li,
      .note {
        padding: 12px;
      }

      .note.warning {
        background: var(--warn-soft);
      }

      @media (max-width: 800px) {
        .meta,
        .cards,
        .boundary-grid,
        .references {
          grid-template-columns: 1fr;
        }

        h1 {
          font-size: 28px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <header>
        <h1>ChainLab QA Local Evidence Report</h1>
        <p>
          Static local report for ChainLab QA verification evidence. This file is safe
          to open directly in a browser and does not require a server, network access,
          paid reporting tool, or external assets.
        </p>
        <div class="meta">
          <div>
            <span>Generated</span>
            <strong>${escapeHtml(generatedAt)}</strong>
          </div>
          <div>
            <span>Commit</span>
            <strong>${escapeHtml(commit)}</strong>
          </div>
          <div>
            <span>Working Tree</span>
            <strong>${escapeHtml(workingTreeStatus)}</strong>
          </div>
        </div>
      </header>

      <section>
        <h2>Status Cards</h2>
        <div class="cards">${renderStatusCards()}</div>
      </section>

      <section>
        <h2>Command Evidence</h2>
        <p>Run these commands locally before treating this report as current evidence.</p>
        <table>
          <thead>
            <tr>
              <th>Check</th>
              <th>Command</th>
              <th>Evidence Scope</th>
            </tr>
          </thead>
          <tbody>${renderCommandRows()}</tbody>
        </table>
      </section>

      <section>
        <h2>Evidence Boundaries</h2>
        <div class="boundary-grid">
          ${evidenceBoundaries
            .map(
              (boundary) =>
                `<div class="boundary">${escapeHtml(boundary)}</div>`,
            )
            .join("")}
        </div>
      </section>

      <section>
        <h2>References</h2>
        <ul class="references">
          ${references.map((reference) => `<li><code>${escapeHtml(reference)}</code></li>`).join("")}
        </ul>
      </section>

      <section>
        <h2>Known Limitations</h2>
        <div class="note warning">
          Local Hardhat and mocked-provider evidence does not prove public test network,
          live wallet extension, production, or hosted environment behavior. Optional
          public test network validation must remain a later, separately approved scope.
        </div>
      </section>

      <section>
        <h2>Uncertainty Classification</h2>
        <div class="note">
          Medium until the report is generated after a fresh local verification run.
          Low only when the listed commands have been run for the referenced commit or
          working tree and the report has been reviewed for local evidence boundaries.
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

export async function writeEvidenceReport(options = {}) {
  const outputPath = resolve(options.outputPath ?? defaultOutputPath);
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, buildEvidenceReportHtml(options), "utf8");
  return outputPath;
}

function parseArgs(argv) {
  const args = { outputPath: defaultOutputPath, shouldOpen: false };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--output") {
      args.outputPath = argv[index + 1];
      index += 1;
    } else if (arg === "--open") {
      args.shouldOpen = true;
    }
  }

  return args;
}

function openReport(outputPath) {
  const platform = process.platform;
  const command =
    platform === "win32" ? "cmd" : platform === "darwin" ? "open" : "xdg-open";
  const args =
    platform === "win32" ? ["/c", "start", "", outputPath] : [outputPath];
  const child = spawn(command, args, { detached: true, stdio: "ignore" });
  child.unref();
}

const isCli =
  process.argv[1] &&
  fileURLToPath(import.meta.url) === resolve(process.argv[1]);

if (isCli) {
  const { outputPath, shouldOpen } = parseArgs(process.argv.slice(2));
  const writtenPath = await writeEvidenceReport({ outputPath });
  console.log(`Wrote ${writtenPath}`);

  if (shouldOpen) {
    openReport(writtenPath);
  }
}
