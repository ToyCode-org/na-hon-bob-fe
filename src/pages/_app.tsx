import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@/redux/store";
import { ThemeProvider } from "styled-components";
import { light } from "@/styles/theme";
import { Layout } from "@/components/layout/layout";
import { EclipsLoadingSpinner } from "@/util/eclipsLoadingSpinner";
import { usePageLoading } from "@/hooks/usePageLoading";
import { ProjectHead } from "@/components/meta/projecthead";
export default function App({ Component, pageProps }: AppProps) {
  const isLoading = usePageLoading();

  return (
    <Provider store={store}>
      <ThemeProvider theme={light}>
        <ProjectHead />
        <Layout>
          <Component {...pageProps} />
        </Layout>
        {isLoading ? <EclipsLoadingSpinner /> : null}
      </ThemeProvider>
    </Provider>
  );
}
