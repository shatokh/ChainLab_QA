import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";

const readText = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const readJson = (path) => JSON.parse(readText(path));

test("package manager is pinned to Yarn and npm lockfiles are absent", () => {
  const pkg = readJson("package.json");

  assert.match(pkg.packageManager, /^yarn@4\.\d+\.\d+$/);
  assert.equal(existsSync(new URL("../yarn.lock", import.meta.url)), true);
  assert.equal(
    existsSync(new URL("../package-lock.json", import.meta.url)),
    false,
  );
});

test("direct dependencies are exact stable versions", () => {
  const pkg = readJson("package.json");
  const groups = [pkg.dependencies ?? {}, pkg.devDependencies ?? {}];
  const prereleasePattern =
    /(?:alpha|beta|canary|rc|nightly|experimental|git\+)/i;

  for (const group of groups) {
    for (const [name, version] of Object.entries(group)) {
      assert.doesNotMatch(
        version,
        /^[~^*]/,
        `${name} must use an exact version`,
      );
      assert.doesNotMatch(
        version,
        prereleasePattern,
        `${name} must use a stable registry release`,
      );
    }
  }
});

test("web3 configuration remains local-only and secret-free", () => {
  const hardhatConfig = readText("hardhat.config.ts");
  const envExample = readText(".env.example");

  assert.match(hardhatConfig, /edr-simulated/);
  assert.doesNotMatch(
    hardhatConfig,
    /sepolia|mainnet|private[_-]?key|mnemonic|api[_-]?key/i,
  );
  assert.match(envExample, /127\.0\.0\.1/);
  assert.doesNotMatch(envExample, /private[_-]?key|seed|mnemonic|api[_-]?key/i);
});
