import { Divider } from "@chakra-ui/react";
import { LeaderboardWidget } from "../../leaderboards/LeaderboardWidget";
import { CryptoTickers } from "./CryptoTickers";
import { TOSPPRules } from "./TOSPPRules";

export const DefaultRightColumnItems: React.FC<{}> = () => (
  <>
    <CryptoTickers />
    <Divider />
    <LeaderboardWidget />
    <Divider />
    <TOSPPRules />
  </>
);
