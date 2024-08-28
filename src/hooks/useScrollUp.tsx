import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useScrollUp = () => {
  const pathname = usePathname();

  useEffect(() => {
    document.body.scrollTo({ top: 0 });
  }, [pathname]);
};
