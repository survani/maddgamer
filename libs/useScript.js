import { useEffect } from "react";

export const useScript = (url, position, async) => {
  useEffect(() => {
    const placement = document.querySelector(position);
    const script = document.createElement("script");
    script.src = url;
    script.async = typeof async === "undefined" ? true : async;
    placement.appendChild(script);
    return () => {
      placement.removeChild(script);
    };
  }, [url, position, async]);
};
