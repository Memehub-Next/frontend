import { Divider, Grid, GridItem, HStack, Link, Text, VStack } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import { useAllLeaderboardsQuery, useGetCryptoPricesQuery, useMyLeaderboardsQuery } from "../../graphql/urql-codegen";
import { LeaderboardWidget } from "../leaderboards/LeaderboardWidget";
import { ImageModal } from "../misc/ImageModal";
import { ScrollToTop } from "../misc/ScrollToTop";
import { NavBar } from "./NavBar";
import { PageContainer } from "./PageContainer";

interface DoubleColLayoutProps {}

export const DoubleColLayout: React.FC<PropsWithChildren<DoubleColLayoutProps>> = ({ children }) => {
  const [allLeaderboardsResp] = useAllLeaderboardsQuery({ variables: { take: 3 } });
  const [myLeaderboardsResp] = useMyLeaderboardsQuery();
  const [getCryptoPricesResp] = useGetCryptoPricesQuery({
    variables: {
      pairs: [
        { base: "HIVE", quote: "USD" },
        { base: "HBD", quote: "USD" },
        { base: "BTC", quote: "USD" },
      ],
    },
  });
  return (
    <PageContainer minHeight="100vh" overflow="auto">
      <NavBar />
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
            display={{ base: "none", lg: "flex" }}
            position="fixed"
            width={{ base: "100%", md: "100%", lg: "25%" }}
            marginBottom={{ base: "2rem", md: "2rem", sm: "2rem" }}
          >
            <HStack justifyContent="space-around" w="100%">
              {getCryptoPricesResp.data?.getCryptoPrices.map(({ base, price, quote }) => (
                <Link key={base} href={`https://bittrex.com/Market/Index?MarketName=${base}-${quote}`} target="_blank">
                  <Text textAlign="center" fontWeight="bold">
                    {base}
                  </Text>
                  <Text noOfLines={1}>
                    {price.toFixed(price >= 100 ? 0 : 2)} {quote}
                  </Text>
                </Link>
              ))}
            </HStack>
            <Divider />
            <LeaderboardWidget
              myLeaderboards={myLeaderboardsResp.data?.myLeaderboards ?? undefined}
              allLeaderboards={allLeaderboardsResp.data?.allLeaderboards}
            />
            <Divider />
          </VStack>
        </GridItem>
      </Grid>
      <ImageModal />
    </PageContainer>
  );
};
