import { WalletConnectPanel } from "../components/wallet-connect-panel";

export default function Home() {
  return (
    <main className="shell">
      <section className="panel" aria-labelledby="page-title">
        <p className="eyebrow">Phase 2 Wallet Connect</p>
        <h1 id="page-title">ChainLab QA</h1>
        <p>
          Local-first Web3 QA Automation playground. Wallet checks use local or
          mocked providers before any manual wallet testing.
        </p>
        <WalletConnectPanel />
      </section>
    </main>
  );
}
