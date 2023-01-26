import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import { useRedirect } from "../../../core/hooks/useRedirect";

export const TOSPPRules: React.FC<{}> = () => {
  const redirect = useRedirect();
  return (
    <HStack w="100%" justifyContent="space-around">
      <Button onClick={redirect("/about/rules")} size="sm">
        RULES
      </Button>
      <Button onClick={redirect("/about/privacy")} size="sm">
        Privacy Policy
      </Button>
      <Button onClick={redirect("/about/terms")} size="sm">
        Terms Of Service
      </Button>
    </HStack>
  );
};
