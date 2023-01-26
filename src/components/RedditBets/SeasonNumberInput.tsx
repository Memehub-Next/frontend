import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetCurrentSeasonIdQuery } from "../../graphql/urql-codegen";
import { ExtendedNumberInput } from "../chakra/ExtendedNumberInput";

interface SeasonNumberInputProps {
  seasonId?: number;
  setSeasonId: Dispatch<SetStateAction<number | undefined>>;
}

export const SeasonNumberInput: React.FC<SeasonNumberInputProps> = ({ seasonId, setSeasonId }) => {
  const [seasonIdResp] = useGetCurrentSeasonIdQuery({ pause: Boolean(seasonId) });
  useEffect(() => setSeasonId(seasonIdResp.data?.getCurrentSeasonId), [seasonIdResp]);
  return (
    <ExtendedNumberInput
      size="xs"
      step={1}
      min={1}
      max={seasonIdResp.data?.getCurrentSeasonId}
      defaultValue={seasonId}
      value={seasonId}
      onChange={setSeasonId}
      prefix="Season "
    />
  );
};
