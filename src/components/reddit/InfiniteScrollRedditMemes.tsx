import { VStack } from "@chakra-ui/react";

import InfiniteScroll from "react-infinite-scroll-component";
import { RedditMemeFragment } from "../../graphql/urql-codegen";
import { endMessage } from "../misc/endMessage";
import { loader } from "../misc/loader";
import { RedditMemeCard } from "./RedditMemeCard";

interface InfiniteScrollRedditMemesProps {
  hasMore: boolean;
  loadMore: () => void;
  redditMemes: RedditMemeFragment[];
}

export const InfiniteScrollRedditMemes: React.FC<InfiniteScrollRedditMemesProps> = ({ hasMore, loadMore, redditMemes }) => (
  <InfiniteScroll dataLength={redditMemes.length || 6} next={loadMore} hasMore={hasMore} loader={loader} endMessage={endMessage}>
    <VStack w="100%" minH="90vh" spacing={5} justify="center" align="center">
      {(redditMemes || Array(6).fill(undefined)).map((meme, idx) => (
        <RedditMemeCard key={idx} redditMeme={meme} />
      ))}
    </VStack>
  </InfiniteScroll>
);
