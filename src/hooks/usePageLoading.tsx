import Router from "next/router";
import { useState, useEffect } from "react";
export const usePageLoading = () => {
  const [nowLoading, setNowLoading] = useState(false);
  useEffect(() => {
    const start = () => {
      setNowLoading(true);
    };
    const end = () => {
      setNowLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  return nowLoading;
};
