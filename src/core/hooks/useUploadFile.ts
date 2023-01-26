import { useToast } from "@chakra-ui/react";
import { compress, EImageType } from "image-conversion";
import { useCallback } from "react";
import { EBucketFolder, useGetSignedUrlMutation } from "../../../graphql/urql-codegen";
import { hashBlob } from "../../lib/functions/hashBlob";

export const useUploadFile = ({
  eBucketFolder,
  required,
}: {
  eBucketFolder: EBucketFolder;
  required: boolean;
}): ((file?: File) => Promise<boolean>) => {
  const toast = useToast();
  const [, getSignedUrlFN] = useGetSignedUrlMutation();
  return useCallback(
    async (file?: File) => {
      if (file) {
        const type = file.type as EImageType;
        const ext = type.split("/")[1];
        const blob = await compress(file, { quality: 0.8, type });
        const hash = await hashBlob(blob);
        const optFile = new File([blob], `${hash}.${ext}`, { type });
        const signedUrlResponse = await getSignedUrlFN({ eBucketFolder, hash, ext });
        if (signedUrlResponse.data?.getSignedUrl) {
          const resp = await fetch(signedUrlResponse.data.getSignedUrl, { method: "PUT", body: optFile });
          if (resp.status === 200) return true;
        }
      } else if (!required) return true;
      toast({ title: "Oh no something went wrong", status: "error" });
      return false;
    },
    [getSignedUrlFN]
  );
};
