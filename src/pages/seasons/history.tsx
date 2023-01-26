import { VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { SingleColLayout } from "../../components/layout/singleColLayout";
import { SeasonHistory } from "../../components/leaderboards/components/SeasonHistory";
import { SeasonNumberInput } from "../../components/RedditBets/SeasonNumberInput";
import { nextUrqlClient } from "../../graphql/urql-client/nextUrqlClient";

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  const [seasonId, setSeasonId] = useState<number>();
  return (
    <SingleColLayout>
      <VStack w="100%">
        <SeasonNumberInput seasonId={seasonId} setSeasonId={setSeasonId} />
        <SeasonHistory w="100%" key={seasonId} seasonId={seasonId} />
      </VStack>
    </SingleColLayout>
  );
};

export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
