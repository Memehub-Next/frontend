import { Button, chakra, FormControl, HStack, Image, Tooltip, useToast } from "@chakra-ui/react";
import { ErrorMessage, useField } from "formik";
import { ChangeEvent, PropsWithChildren, useState } from "react";
import { FaClipboard, FaTrashAlt } from "react-icons/fa";
import { DEFAULT_IMAGE } from "../../core/utils/constants";

interface FileFieldProps {
  name: string;
  showFileImg?: boolean;
  useDefaultImage?: boolean;
}

const FileField: React.FC<PropsWithChildren<FileFieldProps>> = ({ name, children, useDefaultImage = true, showFileImg = true }) => {
  const toast = useToast();
  const [url, setUrl] = useState<string>();
  const [, { error, touched }, { setValue }] = useField(name);
  const clearFile = async () => {
    setValue(undefined);
    setUrl(undefined);
  };
  const setFile = async (file: File) => {
    setValue(file);
    setUrl(URL.createObjectURL(file));
  };
  const handleFileInput = ({ currentTarget: { files } }: ChangeEvent<HTMLInputElement>) => {
    if (!files?.length) toast({ title: "Where file??", status: "warning" });
    else {
      const [file] = files;
      if (!["image/png", "image/gif", "image/jpeg"].includes(file.type))
        toast({ title: "only png, jpeg, and gifs are allowed", status: "warning" });
      else setFile(file);
    }
  };
  const handleClipboard = async () => {
    const [clipboardItem] = await navigator.clipboard.read();
    const type = ["image/png", "image/gif", "image/jpeg"].find((ext) => clipboardItem.types.includes(ext));
    if (!type) toast({ title: "Memehub did not find an image in your clipboard!", status: "error" });
    else setFile(new File([await clipboardItem.getType(type)], "clipboard.png", { type }));
  };
  return (
    <>
      {showFileImg && (url || useDefaultImage) && <Image maxHeight="330px" src={url || DEFAULT_IMAGE} _hover={{ cursor: "pointer" }} />}
      <FormControl isInvalid={Boolean(error) && touched}>
        <ErrorMessage name={name} />
        <HStack w="100%">
          <chakra.input type="file" multiple={false} width="100%" onChange={handleFileInput} />
          <Tooltip label="paste from clipboard">
            <Button size="sm" onClick={handleClipboard}>
              <FaClipboard />
            </Button>
          </Tooltip>
          <Tooltip label="clear meme">
            <Button size="sm" onClick={clearFile}>
              <FaTrashAlt />
            </Button>
          </Tooltip>
          {children}
        </HStack>
      </FormControl>
    </>
  );
};
export default FileField;
