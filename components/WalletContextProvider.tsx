import { FC, ReactNode } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import * as web3 from '@solana/web3.js'
import * as walletAdapterWallets from '@solana/wallet-adapter-wallets';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from 'react';
require('@solana/wallet-adapter-react-ui/styles.css');
import dynamic from 'next/dynamic';
const ReactUIWalletModalProviderDynamic = dynamic(
	async () =>
	  (await import("@solana/wallet-adapter-react-ui")).WalletModalProvider,
	{ ssr: false }
  );
  
const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {

  const network = WalletAdapterNetwork.Devnet;
 
  
  const endpoint = useMemo(() => web3.clusterApiUrl(network), [network]);
  const wallets = useMemo(
	() => [
		new walletAdapterWallets.PhantomWalletAdapter(),
		new walletAdapterWallets.SolflareWalletAdapter(),
		new walletAdapterWallets.SolletWalletAdapter({ network }),
		new walletAdapterWallets.SolletExtensionWalletAdapter({ network }),
		new walletAdapterWallets.TorusWalletAdapter(),
		// new LedgerWalletAdapter(),
		// new SlopeWalletAdapter(),
	],
	[network]
);
	

	return (
		<ConnectionProvider endpoint={endpoint}>
			<WalletProvider wallets={wallets}>
				<ReactUIWalletModalProviderDynamic>
					{children}
				</ReactUIWalletModalProviderDynamic>
			</WalletProvider>
		</ConnectionProvider>
	)
}

export default WalletContextProvider