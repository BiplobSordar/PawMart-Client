import { useEffect } from "react";

const usePageTitle = (title) => {
  useEffect(() => {
    document.title = title || "PawMart";
  }, [title]);
};

export default usePageTitle;
