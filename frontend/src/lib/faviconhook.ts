import { useEffect } from "react";

const useFavicon = (faviconUrl: string) => {
  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    if (favicon) {
      favicon.href = faviconUrl;
    }
  }, [faviconUrl]); 
};

export default useFavicon;