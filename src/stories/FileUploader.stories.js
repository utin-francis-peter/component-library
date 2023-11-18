import FileUploader from "../components/FileUploader/FileUploader";

export default {
  title: "FileUploader",
  component: FileUploader,

  args: {},
};

export const Default = () => {
  const handleUpload = () => {
    console.log("Uploading...");
  };

  return (
    <FileUploader
      btnLabel={"Add file"}
      maxFileSize={"1mb"}
      accept={[".png", ".svg", ".webp"]}
      handleUpload={handleUpload}
    />
  );
};

export const CanDragAndDrop = () => {
  const handleUpload = () => {
    console.log("Uploading...");
  };

  return (
    <FileUploader
      accept={[".png", ".svg", ".webp"]}
      btnLabel={"Add file"}
      maxFileSize={"1mb"}
      canDragAndDrop={true}
      canUseIcon={true}
      iconColor="text-gray-500"
      iconSize={"text-[50px]"}
      handleUpload={handleUpload}
    />
  );
};
