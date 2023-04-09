import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const useSideMenu = () => {
  const { pathname } = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const sideMenuOpen = () => {
    setIsOpen(true);
  };
  const sideMenuClose = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    sideMenuClose();
  }, [pathname]);
  return {
    isOpen,
    sideMenuOpen,
    sideMenuClose,
  };
};
