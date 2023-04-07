import { useState } from "react";

export const useSideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sideMenuHandler = () => {
    setIsOpen(!isOpen);
  };
  return {
    isOpen,
    sideMenuHandler,
  };
};
