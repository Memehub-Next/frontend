import { Grid, GridItem, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { ScrollToTop } from "../misc/ScrollToTop";
import { ImageModal } from "../modals/ImageModal";
import { DefaultRightColumnItems } from "./components/DefaultRightColumnItems";
import { PageContainer } from "./components/PageContainer";
import { MobileNavBar } from "./navbar/MobileNavBar";

interface DoubleColLayoutProps {
  RightColumn?: React.ReactNode;
}

export const DoubleColLayout: React.FC<PropsWithChildren<DoubleColLayoutProps>> = ({ children, RightColumn }) => (
  <PageContainer minHeight="100vh" overflow="auto">
    <MobileNavBar />
    <Grid
      display={{ base: "inline-block", md: "inline-block", lg: "grid" }}
      mt="15vh"
      templateColumns="3fr 1fr"
      minH="85vh"
      w="100%"
      alignItems="center"
      justifyContent="center"
    >
      <GridItem>
        {children}
        <ScrollToTop />
      </GridItem>
      <GridItem>
        <VStack
          w="25vw"
          pr={3}
          spacing={3}
          top="15vh"
          position={{ base: "initial", md: "initial", lg: "fixed" }}
          width={{ base: "100%", md: "100%", lg: "25%" }}
          marginBottom={{ base: "2rem", md: "2rem", sm: "2rem" }}
        >
          {RightColumn || <DefaultRightColumnItems />}
        </VStack>
      </GridItem>
    </Grid>
    <ImageModal />
  </PageContainer>
);
