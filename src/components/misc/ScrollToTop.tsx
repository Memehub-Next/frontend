import { Box } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { Environment } from "../../utils/environment";

interface ScrollToTopProps {}

export const ScrollToTop: React.FC<ScrollToTopProps> = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const browser = Environment.isBrowser();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const handleScroll = () => setScrollPosition(window.pageYOffset);
  useEffect(() => {
    if (browser) window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [browser]);
  if (scrollPosition < 3200) return <></>;
  return (
    <Box onClick={scrollTop} _hover={{ cursor: "pointer" }} position="fixed" left="43%" bottom="20px" opacity={0.8}>
      Back To Top
    </Box>
  );
};
