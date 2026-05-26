import assert from "node:assert/strict";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";
import {
  buildEvidenceReportHtml,
  writeEvidenceReport,
} from "../scripts/write-local-evidence-report.mjs";

test("builds a local HTML evidence report with required sections", () => {
  const html = buildEvidenceReportHtml({
    commit: "abc123",
    generatedAt: "2026-05-25T20:00:00.000Z",
    workingTreeStatus: "clean",
  });

  assert.match(html, /<!doctype html>/i);
  assert.match(html, /ChainLab QA Local Evidence Report/);
  assert.match(html, /corepack yarn verify/);
  assert.match(html, /corepack yarn test/);
  assert.match(html, /corepack yarn test:contracts/);
  assert.match(html, /corepack yarn test:e2e/);
  assert.match(html, /corepack yarn typecheck/);
  assert.match(html, /corepack yarn lint/);
  assert.match(html, /corepack yarn format:check/);
  assert.match(html, /Typecheck/);
  assert.match(html, /Solidity Contract Tests/);
  assert.match(html, /Playwright E2E/);
  assert.match(html, /No real wallet/);
  assert.match(html, /No real funds/);
  assert.match(html, /No mainnet/);
  assert.match(html, /No testnet validation/);
  assert.match(html, /No paid infrastructure/);
  assert.match(html, /Uncertainty Classification/);
});

test("writes the local HTML evidence report to the requested path", async () => {
  const directory = await mkdtemp(join(tmpdir(), "chainlab-evidence-"));
  const outputPath = join(directory, "local-evidence-report.html");

  try {
    await writeEvidenceReport({
      outputPath,
      commit: "abc123",
      generatedAt: "2026-05-25T20:00:00.000Z",
      workingTreeStatus: "clean",
    });

    const html = await readFile(outputPath, "utf8");
    assert.match(html, /ChainLab QA Local Evidence Report/);
    assert.doesNotMatch(html, /PRIVATE_KEY|MNEMONIC|API_KEY|seed phrase/i);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
