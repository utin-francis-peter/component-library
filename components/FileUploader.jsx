import { useState, useEffect } from "react";
import { Button } from "./Button";
import { useRef } from "react";

const FileUploader = ({
  btnLabel,
  desc,
  accept,
  btnType,
  onChange,
  disabled,
  canAcceptMultiple,
  maxFileSize,
  canDragAndDrop,
}) => {
  /*
Props desc:
- btnLabel = file upload btn label
- desc: description text that provides more context about file upload (max file size and accepted file type(s)
- accept: a string array of accepted file types
btnType: is file upload btn a submit or normal btn element?
- onChange: a click handler fxn invoke when input field value changes
- disabled: a boolean condition that disabled file upload btn
- canAcceptMultiple: a boolean condition that allows the input file to accept multiple files upload
- maxFileSize: allowed size of file to be uploaded
  */

  const [sizeLimit, setSizeLimit] = useState({});
  // sizeLimit value would be used to set max permitted file size and check that uploaded file size falls within the specified size range
  const [selectedFileName, setSelectedFileName] = useState(null);
  const [fileInBase64, setFileInBase64] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const inputRef = useRef(null);

  console.log(fileInBase64);
  //TODO some browsers may not support max-size. run size validation with JS before initiating file upload procedures

  const handleSelection = () => {
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

    const singleFile = inputRef.current?.files[0];
    const { size: selectedFileSize, name } = singleFile;

    setSelectedFileName(name);

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

  const formatAccept = () => {
    const res = accept?.map((item, i, arr) => {
      /*
        item[i] !== last item in the list? `${item}, `
        ...
        item[i]== item[arr.length-1]? `and ${item} `
        */

      if (item[i] !== item[arr.length - 1]) {
        return `${item}, `;
      } else {
        return `and ${item}. `;
      }
    });
    return res;
  };

  //   side effect functions below runs each time a new maxFileSize is specified; pulls out the size:number and unit:string and store separately into sizeLimit state
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

  return (
    <div>
      <h4 className="font-semibold">Upload files</h4>
      <label className="text-sm text-gray-500">
        Max file size is {maxFileSize}. Only {formatAccept()}
        files are supported.
      </label>
      <input
        className="hidden"
        ref={inputRef}
        type="file"
        accept={[...accept]}
        onChange={handleSelection}
      />

      {canDragAndDrop ? (
        <button
          onClick={() => inputRef.current?.click()}
          className="border border-dashed border-gray-500 p-3 text-blue-500 block mt-3 w-full min-h-[30vh] hover:border-blue-600 hover:border-solid hover:border-[2px] transition-colors ease-in delay-150">
          Drag and drop file here or click to upload
        </button>
      ) : (
        <Button
          size="md"
          className="rounded-none"
          onClick={() => inputRef.current?.click()}>
          {btnLabel}
        </Button>
      )}

      {selectedFileName && fileInBase64 && (
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
      )}
      {errorMessage && <p className="text-red-600">*{errorMessage}</p>}
    </div>
  );
};

export default FileUploader;
