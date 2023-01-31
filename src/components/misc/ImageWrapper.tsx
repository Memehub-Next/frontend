import { Image, ImageProps, Skeleton, SkeletonProps } from "@chakra-ui/react";
import { useStoreActions } from "../../store/global.store";

interface ImageWrapperProps extends ImageProps {
  isLoaded: boolean;
  skeleton: SkeletonProps;
}

export const ImageWrapper: React.FC<ImageWrapperProps> = ({ isLoaded, skeleton, src, ...imageProps }) => {
  const { openModal } = useStoreActions((actions) => actions.imageModal);
  if (!isLoaded) return <Skeleton {...skeleton} />;
  if (src) return <Image src={src} onClick={() => openModal({ url: src })} _hover={{ cursor: "pointer" }} {...imageProps} />;
  return null;
};
