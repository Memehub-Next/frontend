import { HStack, Link, SkeletonText, StackProps, Text } from "@chakra-ui/react";
import { useCryptoCompareControllerCryptoPrice } from "../../rest/memehubRestApiComponents";

export const CryptoTickers: React.FC<StackProps> = (stackProps) => {
  return (
    <HStack justifyContent="space-around" w="100%" {...stackProps}>
      <CryptoTicker base="HIVE" quote="USD" precision={2} />
      <CryptoTicker base="HBD" quote="USD" precision={2} />
      <CryptoTicker base="BTC" quote="USD" precision={0} />
    </HStack>
  );
};

interface CryptoTickerProps {
  base: string;
  quote: string;
  precision: number;
}

const CryptoTicker: React.FC<CryptoTickerProps> = ({ base, quote, precision }) => {
  const { data, isLoading, isError } = useCryptoCompareControllerCryptoPrice(
    { queryParams: { base, quote } },
    { refetchInterval: 1000 * 60 * 15 }
  );

  return (
    <Link href={`https://bittrex.com/Market/Index?MarketName=${base}-${quote}`} target="_blank">
      <Text textAlign="center" fontWeight="bold">
        {base}
      </Text>
      <SkeletonText textAlign="center" noOfLines={1} isLoaded={!isError && !isLoading}>
        <Text noOfLines={1}>
          {data?.price.toFixed(precision)} {quote}
        </Text>
      </SkeletonText>
    </Link>
  );
};
