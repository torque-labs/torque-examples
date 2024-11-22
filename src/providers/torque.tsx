"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import type { PropsWithChildren } from "react";
import type { TorqueOptions } from "@torque-labs/torque-ui";
import { TorqueProvider } from "@torque-labs/torque-ui";

export function TorqueWrapper({ children }: PropsWithChildren) {
  const { wallet } = useWallet();

  const torqueOptions: TorqueOptions = {
    apiUrl: process.env.NEXT_PUBLIC_TORQUE_API_URL
      ? process.env.NEXT_PUBLIC_TORQUE_API_URL
      : "https://api.torque.so",
    appUrl: process.env.NEXT_PUBLIC_TORQUE_APP_URL
      ? process.env.NEXT_PUBLIC_TORQUE_APP_URL
      : "https://app.torque.so",
    rpc: process.env.NEXT_PUBLIC_RPC,
  };

  return (
    <TorqueProvider options={torqueOptions} wallet={wallet}>
      {children}
    </TorqueProvider>
  );
}
