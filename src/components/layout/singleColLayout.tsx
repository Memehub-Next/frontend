import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ImageModal } from "../misc/ImageModal";
import { ScrollToTop } from "../misc/ScrollToTop";

import { MobileNavBar } from "./MobileNavBar";
import { PageContainer } from "./PageContainer";

export const SingleColLayout: React.FC<PropsWithChildren<{}>> = ({ children }) => (
  <PageContainer minH="100vh" overflow="auto">
    <MobileNavBar />
    <Flex
      mt={{ lg: "15vh", xl: "15vh" }}
      padding={{ base: "2vh", sm: "2vh", md: "2vh" }}
      minH="90vh"
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      {children}
    </Flex>
    <ScrollToTop />
    <ImageModal />
  </PageContainer>
);
