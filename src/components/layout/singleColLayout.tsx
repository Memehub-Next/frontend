import { Flex } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { CommentsModal } from "../comments/CommentsModal";
import { ScrollToTop } from "../misc/ScrollToTop";
import { FlagModal } from "../modals/Flag";
import { ImageModal } from "../modals/ImageModal";

import { PageContainer } from "./components/PageContainer";
import { MobileNavBar } from "./navbar/MobileNavBar";

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
    <FlagModal />
    <ImageModal />
    <CommentsModal />
  </PageContainer>
);
