import React, { useState, useEffect } from "react";
import Button from "../Button/index";
import { useRef } from "react";

const FileUploader = ({
  btnLabel,
  accept,
  canAcceptMultiple,
  maxFileSize,
  canDragAndDrop,
  canUseIcon,
  iconColor,
  iconSize,
  canSelectMultiple,
  handleUpload,
}) => {
  /*
Props desc:
- btnLabel = file upload btn label
- accept: a string array of accepted file types
- canAcceptMultiple: allows the file input to accept multiple files selection
- canAcceptMultiple: a boolean condition that allows the input file to accept multiple files selection
- maxFileSize: allowed size of file to be uploaded
- handleUpload: callback function that handles upload of file to the server
  */

  const [sizeLimit, setSizeLimit] = useState({});
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [fileList, setFileList] = useState(null);
  const [fileInBase64, setFileInBase64] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [canHighlight, setCanHighlight] = useState(false);

  const inputRef = useRef(null);

  const handleAccept = () => {
    const res = accept?.map((item, i, arr) => {
      /*
        item[i] !== last item in the list? `${item}, `
        ...
        item[i]== item[arr.length-1]? `and ${item} `
        */

      if (item[i] !== item[arr.length - 1]) {
        return `${item}, `;
      } else {
        return `and ${item} `;
      }
    });
    return res;
  };

  const handleSelection = (files) => {
    //  FUNCTION converts specified sizeLimit from its original unit size to a byte size
    const handleSizeLimitConversion = (sizeLimit) => {
      const { size: specifiedSize, unit: specifiedUnit } = sizeLimit;
      // mission: convert specified size value from current unit size to bytes
      switch (specifiedUnit) {
        case "kb":
          return specifiedSize * 1024;

        case "mb":
          return specifiedSize * 1024 * 1024;

        case "gb":
          return specifiedSize * 1024 * 1024 * 1024;

        default:
          break;
      }
    };

    // TODO: HANDLING MULTIPLE FILES SELECTION AND UPLOAD
    // check files list length.when 1, extract file at position 0. else, convert the list to an array and map over each item(process the data and store the list)

    // console.log("all files include:", files);
    const singleFile = files[0];
    const { size: selectedFileSize, name } = singleFile;

    setSelectedFileName(name);

    // console.log(selectedFileName, selectedFileSize);

    const specifiedByteSize = handleSizeLimitConversion(sizeLimit);
    if (selectedFileSize <= specifiedByteSize) {
      //  proceed with conversion process that uses FileReader API
      setErrorMessage("");

      const reader = new FileReader();
      reader.readAsDataURL(singleFile);

      reader.addEventListener("load", (e) => {
        setFileInBase64(e.target.result);
      });
    } else {
      // return a warning message
      setErrorMessage("file size too big");
    }

    //   TODO handle multiple files upload
  };

  const preventDefaults = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  useEffect(() => {
    const extractMaxSizeValue = (_maxFileSize) => {
      console.log(typeof _maxFileSize);
      // run a loop Sting(maxFileSize) number of times.
      // at each iteration, check if character !isNaN (a criteria to check the string character can be converted to a number)
      const numList = [];
      const unitList = [];
      for (let i = 0; i < _maxFileSize.length; i++) {
        if (!isNaN(_maxFileSize[i])) {
          numList.push(_maxFileSize[i]);
        } else {
          unitList.push(_maxFileSize[i]);
        }
      }
      if (numList.length > 0 && unitList.length > 0) {
        return {
          size: Number(numList.join("")),
          unit: unitList.join(""),
        };
      }
    };

    if (maxFileSize.length) {
      const res = extractMaxSizeValue(maxFileSize);
      setSizeLimit(res);
    }
  }, [maxFileSize]);
  console.log("can highlight?", canHighlight);
  return (
    <>
      <h4 className="font-semibold">Upload files</h4>
      <label draggable={false} className="text-sm text-gray-500">
        Max file size is {maxFileSize}. Only {handleAccept()}
        files are supported.
      </label>
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={[...accept]}
        multiple={canSelectMultiple}
        onChange={(e) => handleSelection(e.target.files)}
      />

      {selectedFileName && fileInBase64 && (
        <div className="mb-3">
          <div className="shadow-md inline-block p-2 mt-3 gap-2">
            <div className="flex items-center gap-3">
              <p>{selectedFileName}</p>
              <button
                onClick={() => setFileInBase64(null)}
                className="text-red-300 transition-colors ease-in delay-150 hover:text-red-600">
                <i className="fa-solid fa-close"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {canDragAndDrop ? (
        <>
          {fileInBase64 ? (
            <Button size="md" className="rounded-none " onClick={handleUpload}>
              <span className="flex items-center gap3">
                <i className="fa-solid fa-cloud-arrow-up"></i>
                <span>Upload</span>
              </span>
            </Button>
          ) : (
            <button
              onDragEnter={(e) => {
                preventDefaults(e);
                setCanHighlight(true);
              }}
              onDragLeave={(e) => {
                preventDefaults(e);
                setCanHighlight(false);
              }}
              onDragOver={(e) => {
                preventDefaults(e);
                setCanHighlight(true);
              }}
              onDrop={(e) => {
                preventDefaults(e);
                setCanHighlight(false);
                handleSelection(e.dataTransfer.files);
              }}
              onClick={() => inputRef.current?.click()}
              className={`border border-gray-500 p-3 text-gray-500 block mt-3 w-full min-h-[30vh] hover:border-blue-600 hover:border-solid hover:border-[2px] transition-colors ease-in delay-150 ${
                canHighlight
                  ? "border-[2px] border-solid border-blue-600"
                  : "border-dashed"
              }`}>
              {canUseIcon && (
                <span className={`block mb-3 ${iconColor} ${iconSize}`}>
                  <i className="fa-solid fa-download"></i>
                </span>
              )}

              <span className=" flex items-center justify-center gap-1 group">
                <span>Drag and drop file here or</span>
                <span className="font-bold group-hover:text-blue-700">
                  click to upload
                </span>
              </span>
            </button>
          )}
        </>
      ) : (
        <Button
          size="md"
          className="rounded-none flex items-center gap2"
          onClick={() =>
            !fileInBase64 ? inputRef.current?.click() : handleUpload()
          }>
          {fileInBase64 ? (
            <span>
              <i className="fa-solid fa-cloud-arrow-up"></i> Upload
            </span>
          ) : (
            btnLabel
          )}
        </Button>
      )}

      {errorMessage && <p className="text-red-600">*{errorMessage}</p>}
    </>
  );
};

export default FileUploader;
