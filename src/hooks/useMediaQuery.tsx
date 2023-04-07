import { useMediaQuery } from "react-responsive";

// mobile 1 / tablet 3 / desktop 4
export const MediaQuery = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isTablet = useMediaQuery({ maxWidth: 1023 });
  const isDesktop = useMediaQuery({ minWidth: 1024 });
  const thisMedia = isMobile ? 1 : isTablet ? 3 : 4;
  return thisMedia;
};
