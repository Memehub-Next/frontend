import { HStack, StackProps } from "@chakra-ui/layout";
import { VStack } from "@chakra-ui/react";
import React, { useCallback } from "react";

import { EPositionSide, RedditMemeFragment, useMyRedditBetQuery } from "../../graphql/urql-codegen";
import { ExtendedImage } from "../chakra/ExtendedImage";
import { ExtendedText } from "../chakra/ExtendedText";
import { BetResultMenu } from "./BetResultMenu";
import { PlaceBetMenu } from "./PlaceBetMenu";

interface RedditMemeCardProps extends StackProps {
  redditMeme?: RedditMemeFragment;
}

export const RedditMemeCard: React.FC<RedditMemeCardProps> = React.memo(({ redditMeme, ...stackProps }) => {
  const [{ data }, refetch] = useMyRedditBetQuery({ variables: { redditMemeId: redditMeme?.id || "" }, pause: true });
  const done = useCallback(() => refetch({ requestPolicy: "network-only" }), [refetch]);
  const redditBet = data?.myRedditBet ?? redditMeme?.redditBet;
  return (
    <VStack p={2} {...stackProps}>
      <ExtendedText
        isLoaded={Boolean(redditMeme)}
        example="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        textAlign="center"
        noOfLines={1}
      >
        {redditMeme?.title}
      </ExtendedText>
      <ExtendedImage
        isLoaded={Boolean(redditMeme)}
        skeleton={{ w: "15rem", h: "15rem" }}
        _hover={{ cursor: "pointer" }}
        px={2}
        w="100%"
        src={redditMeme?.url}
      />
      {redditBet ? (
        <BetResultMenu size="xs" redditBet={redditBet} />
      ) : (
        <HStack>
          {Object.values(EPositionSide).map((ePositionSide, idx) => (
            <PlaceBetMenu key={idx} size="xs" redditMemeId={redditMeme?.id} ePositionSide={ePositionSide} done={done} />
          ))}
        </HStack>
      )}
    </VStack>
  );
});
