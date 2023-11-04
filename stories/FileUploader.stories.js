import FileUploader from "../components/FileUploader";

export default {
  title: "FileUploader",
  component: FileUploader,

  args: {},
};

export const Default = () => {
  return (
    <FileUploader
      btnLabel={"Add file"}
      maxFileSize={"1mb"}
      accept={[".png", ".svg", ".webp"]}
    />
  );
};

export const CanDragAndDrop = () => {
  return (
    <FileUploader
      accept={[".png", ".svg", ".webp"]}
      btnLabel={"Add file"}
      maxFileSize={"50kb"}
      canDragAndDrop={true}
    />
  );
};
