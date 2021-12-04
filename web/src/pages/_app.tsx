import "@styles/global.css";
import "@styles/normalize.css";
import type { AppProps } from "next/app";
import { RecoilRoot } from "recoil";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />;
    </RecoilRoot>
  );
}

export default MyApp;
