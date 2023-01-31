import {
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useStoreActions, useStoreState } from "../../store/global.store";

type TSizes = "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
const sizes: TSizes[] = ["md", "lg", "xl", "2xl", "3xl", "full"];

interface ImageModalProps {}

export const ImageModal: React.FC<ImageModalProps> = () => {
  const [sizeIndex, setSizeIndex] = useState(0);
  const { isOpen, url } = useStoreState((state) => state.imageModal);
  const { closeModal } = useStoreActions((actions) => actions.imageModal);
  return (
    <Modal size={sizes[sizeIndex]} isCentered isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent p={0} rounded="sm" border="1px solid gray" backgroundColor="black" color="white">
        <ModalBody p={0}>
          <VStack w="100%" p={3} pt={9}>
            <ModalCloseButton />
            <Slider maxW="25vw" mx={4} defaultValue={0} min={0} max={sizes.length - 1} step={1} onChange={setSizeIndex}>
              {Array.from(Array(sizes.length).keys()).map((sizeIndex) => (
                <SliderMark key={sizeIndex} ml="-2.5" mt={2} value={sizeIndex}>
                  {sizes[sizeIndex]}
                </SliderMark>
              ))}
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb color="black" />
            </Slider>
            <Image pt={9} maxW="100%" maxH="100%" src={url} />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
