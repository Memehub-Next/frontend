import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetCurrentSeasonIdQuery } from "../../graphql/urql-codegen";
import { NumberInputWrapper } from "../misc/NumberInputWrapper";

interface SeasonNumberInputProps {
  seasonId?: number;
  setSeasonId: Dispatch<SetStateAction<number | undefined>>;
}

export const SeasonNumberInput: React.FC<SeasonNumberInputProps> = ({ seasonId, setSeasonId }) => {
  const [seasonIdResp] = useGetCurrentSeasonIdQuery({ pause: Boolean(seasonId) });
  useEffect(() => setSeasonId(seasonIdResp.data?.getCurrentSeasonId), [seasonIdResp]);
  return (
    <NumberInputWrapper
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
