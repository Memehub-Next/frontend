import { Button, Checkbox, Divider, HStack, Text, useBoolean } from "@chakra-ui/react";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import { useState } from "react";
import { FaDice } from "react-icons/fa";
import { nextUrqlClient } from "src/graphql/urql-client/nextUrqlClient";
import { EnumSelect } from "../../components/enum/EnumOptions";
import { DefaultRightColumnItems } from "../../components/layout/components/DefaultRightColumnItems";
import { DoubleColLayout } from "../../components/layout/doubleColLayout";
import { InfiniteScrollRedditMemes } from "../../components/reddit/InfiniteScrollRedditMemes";
import { useAuthGuard } from "../../core/hooks/useAuthGuard";
import { useSkipPagination } from "../../core/hooks/useSkipPagination";
import { ETradedOrder, useRandomRedditMemesQuery } from "../../graphql/urql-codegen";

const Page: NextPage = () => {
  const { skip, take, loadMore } = useSkipPagination(15);
  const [traded, { toggle }] = useBoolean(false);
  const guardedToggle = useAuthGuard(toggle);
  const [eTradedOrder, setETradedOrder] = useState(ETradedOrder.Best);
  const [{ data }, refetch] = useRandomRedditMemesQuery({ variables: { skip, take, traded, eTradedOrder }, requestPolicy: "network-only" });
  const RightColumn: React.FC = () => (
    <>
      <HStack w="100%" justifyContent="space-around">
        <Button size="xs" disabled={traded} onClick={() => refetch({ requestPolicy: "network-only" })}>
          <HStack>
            <FaDice />
            <Text>Randomize</Text>
          </HStack>
        </Button>
        <EnumSelect size="xs" w={24} eEnum={ETradedOrder} defaultValue={eTradedOrder} isDisabled={!traded} setSelected={setETradedOrder} />
        <Checkbox isChecked={traded} onChange={guardedToggle}>
          <Text>Traded</Text>
        </Checkbox>
      </HStack>
      <Divider />
      <DefaultRightColumnItems />
    </>
  );
  return (
    <DoubleColLayout RightColumn={<RightColumn />}>
      <InfiniteScrollRedditMemes
        redditMemes={data?.randomRedditMemes.items || []}
        loadMore={loadMore}
        hasMore={Boolean(data?.randomRedditMemes.hasMore)}
      />
    </DoubleColLayout>
  );
};
export default withUrqlClient(nextUrqlClient, { ssr: false })(Page);
