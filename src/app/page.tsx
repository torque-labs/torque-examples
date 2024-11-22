"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { TorqueDrawer, useTorque } from "@torque-labs/torque-ui";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

export default function Home(): JSX.Element {
  const { publicKey, disconnect, wallet } = useWallet();
  const { initialize, logout, user } = useTorque();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    console.log("publicKey", publicKey);
    console.log("wallet", wallet);
  }, [publicKey, wallet]);

  return (
    <main className="container px-4 mx-auto py-8">
      <div className="mb-4">
        <WalletMultiButtonDynamic />
      </div>

      {publicKey && !user ? (
        <button
          className="px-3 py-2 rounded bg-slate-500 text-white"
          onClick={async () => {
            await initialize();
          }}
          type="button"
        >
          Init
        </button>
      ) : null}

      {user ? (
        <div>
          <p className="mb-4">User: {user.pubKey}</p>
          <div className="flex gap-4">
            <button
              className="px-3 py-2 rounded bg-slate-500 text-white"
              onClick={async () => {
                setIsOpen(true);
              }}
              type="button"
            >
              Open Drawer
            </button>

            <button
              onClick={() => {
                disconnect();
                logout();
              }}
              className="px-3 py-2 rounded bg-red-500 text-white"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}

      <TorqueDrawer open={isOpen} showButton={false} onOpenChange={setIsOpen} />
    </main>
  );
}
