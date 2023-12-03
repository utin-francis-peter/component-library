import React, { useState, useRef, useEffect } from 'react';

const Accordion = _ref => {
  let {
    accordionList
  } = _ref;
  const [activeAccordion, setActiveAccordion] = useState("0");
  return (
    /*#__PURE__*/
    /*   this component expects a list of accordion items at the top level.
    1. map over the list and return an AccordionItem component
    2.
    */
    React.createElement("div", null, accordionList?.map(item => /*#__PURE__*/React.createElement(AccordionItem, {
      key: item.id,
      item: item,
      activeAccordion: activeAccordion,
      setActiveAccordion: setActiveAccordion
    })))
  );
};

// accordion item
const AccordionItem = _ref2 => {
  let {
    item,
    activeAccordion,
    setActiveAccordion
  } = _ref2;
  return /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (item.id === activeAccordion) setActiveAccordion(null);else {
        setActiveAccordion(item.id);
      }
    },
    className: "block  w-full mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between p-3 border border-gray-400 rounded-xl"
  }, /*#__PURE__*/React.createElement("p", null, item.question), /*#__PURE__*/React.createElement("div", {
    className: `border border-gray-400 p-3 w-[20px] h-[20px] flex items-center justify-center rounded-full ${item.id === activeAccordion ? "border-green-600" : "border-gray-400"}`
  }, /*#__PURE__*/React.createElement("i", {
    className: ` text-gray-400 fa-solid fa-chevron-${item.id === activeAccordion ? "up" : "down"}`
  }))), item.id === activeAccordion && /*#__PURE__*/React.createElement("p", {
    className: "text-gray-700 text-left mt-3 px-3 py-2 transition-all ease-in-out delay-300"
  }, item.response));
};

function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

const Button = _ref => {
  let {
    className,
    children,
    type = "button",
    variant = "primary",
    size = "sm",
    onClick,
    isDisabled,
    ...rest
  } = _ref;
  const variantStyle = variant == "primary" ? "bg-blue-400 " : variant == "secondary" ? "bg-blue-600" : variant == "tertiary" ? "bg-blue-800" : variant == "skeleton" ? "animate-pulse space-x-4 bg-slate-700 " : "";
  const sizeStyle = size == "sm" ? "px-10 py-1" : size == "md" ? "px-20 py-2" : size == "lg" ? "px-40 py-5" : "";
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    onClick: onClick,
    disabled: isDisabled,
    className: `block rounded-full text-white disabled:cursor-not-allowed disabled:opacity-60 ${className} ${variantStyle} ${sizeStyle}`
  }, rest), children);
};

const FileUploader = _ref => {
  let {
    btnLabel,
    accept,
    canAcceptMultiple,
    maxFileSize,
    canDragAndDrop,
    canUseIcon,
    iconColor,
    iconSize,
    canSelectMultiple,
    handleUpload
  } = _ref;
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
  useState(null);
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
  const handleSelection = files => {
    //  FUNCTION converts specified sizeLimit from its original unit size to a byte size
    const handleSizeLimitConversion = sizeLimit => {
      const {
        size: specifiedSize,
        unit: specifiedUnit
      } = sizeLimit;
      // mission: convert specified size value from current unit size to bytes
      switch (specifiedUnit) {
        case "kb":
          return specifiedSize * 1024;
        case "mb":
          return specifiedSize * 1024 * 1024;
        case "gb":
          return specifiedSize * 1024 * 1024 * 1024;
      }
    };

    // TODO: HANDLING MULTIPLE FILES SELECTION AND UPLOAD
    // check files list length.when 1, extract file at position 0. else, convert the list to an array and map over each item(process the data and store the list)

    // console.log("all files include:", files);
    const singleFile = files[0];
    const {
      size: selectedFileSize,
      name
    } = singleFile;
    setSelectedFileName(name);

    // console.log(selectedFileName, selectedFileSize);

    const specifiedByteSize = handleSizeLimitConversion(sizeLimit);
    if (selectedFileSize <= specifiedByteSize) {
      //  proceed with conversion process that uses FileReader API
      setErrorMessage("");
      const reader = new FileReader();
      reader.readAsDataURL(singleFile);
      reader.addEventListener("load", e => {
        setFileInBase64(e.target.result);
      });
    } else {
      // return a warning message
      setErrorMessage("file size too big");
    }

    //   TODO handle multiple files upload
  };

  const preventDefaults = e => {
    e.preventDefault();
    e.stopPropagation();
  };
  useEffect(() => {
    const extractMaxSizeValue = _maxFileSize => {
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
          unit: unitList.join("")
        };
      }
    };
    if (maxFileSize.length) {
      const res = extractMaxSizeValue(maxFileSize);
      setSizeLimit(res);
    }
  }, [maxFileSize]);
  console.log("can highlight?", canHighlight);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h4", {
    className: "font-semibold"
  }, "Upload files"), /*#__PURE__*/React.createElement("label", {
    draggable: false,
    className: "text-sm text-gray-500"
  }, "Max file size is ", maxFileSize, ". Only ", handleAccept(), "files are supported."), /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    hidden: true,
    accept: [...accept],
    multiple: canSelectMultiple,
    onChange: e => handleSelection(e.target.files)
  }), selectedFileName && fileInBase64 && /*#__PURE__*/React.createElement("div", {
    className: "mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "shadow-md inline-block p-2 mt-3 gap-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("p", null, selectedFileName), /*#__PURE__*/React.createElement("button", {
    onClick: () => setFileInBase64(null),
    className: "text-red-300 transition-colors ease-in delay-150 hover:text-red-600"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-close"
  }))))), canDragAndDrop ? /*#__PURE__*/React.createElement(React.Fragment, null, fileInBase64 ? /*#__PURE__*/React.createElement(Button, {
    size: "md",
    className: "rounded-none ",
    onClick: handleUpload
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap3"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-cloud-arrow-up"
  }), /*#__PURE__*/React.createElement("span", null, "Upload"))) : /*#__PURE__*/React.createElement("button", {
    onDragEnter: e => {
      preventDefaults(e);
      setCanHighlight(true);
    },
    onDragLeave: e => {
      preventDefaults(e);
      setCanHighlight(false);
    },
    onDragOver: e => {
      preventDefaults(e);
      setCanHighlight(true);
    },
    onDrop: e => {
      preventDefaults(e);
      setCanHighlight(false);
      handleSelection(e.dataTransfer.files);
    },
    onClick: () => inputRef.current?.click(),
    className: `border border-gray-500 p-3 text-gray-500 block mt-3 w-full min-h-[30vh] hover:border-blue-600 hover:border-solid hover:border-[2px] transition-colors ease-in delay-150 ${canHighlight ? "border-[2px] border-solid border-blue-600" : "border-dashed"}`
  }, canUseIcon && /*#__PURE__*/React.createElement("span", {
    className: `block mb-3 ${iconColor} ${iconSize}`
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-download"
  })), /*#__PURE__*/React.createElement("span", {
    className: " flex items-center justify-center gap-1 group"
  }, /*#__PURE__*/React.createElement("span", null, "Drag and drop file here or"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold group-hover:text-blue-700"
  }, "click to upload")))) : /*#__PURE__*/React.createElement(Button, {
    size: "md",
    className: "rounded-none flex items-center gap2",
    onClick: () => !fileInBase64 ? inputRef.current?.click() : handleUpload()
  }, fileInBase64 ? /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-cloud-arrow-up"
  }), " Upload") : btnLabel), errorMessage && /*#__PURE__*/React.createElement("p", {
    className: "text-red-600"
  }, "*", errorMessage));
};

const Link = _ref => {
  let {
    children,
    href,
    icon,
    isPairedWithIcon
  } = _ref;
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    className: "flex items-center gap-2 cursor-pointer hover:underline text-blue-500 hover:text-blue-600"
  }, children, isPairedWithIcon && /*#__PURE__*/React.createElement("i", {
    className: icon
  }));
};

const Pagination = _ref => {
  let {
    data,
    itemsPerPage,
    setItemsPerPage
  } = _ref;
  // const [data, setData] = useState([]);
  const [groupedData, setGroupedData] = useState([]);
  // console.log("groupedData:", groupedData);

  // const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstItemIndex, setFirstItemIndex] = useState(0);
  const [lastItemIndex, setLastItemIndex] = useState(itemsPerPage);

  // console.log(
  //   "logging MIN and MAX item index: ",
  //   firstItemIndex,
  //   lastItemIndexconsole.log("CURRENT PAGE:", currentPage);
  // );

  // since an array holds page number, create a new structure that groups current pages in view together.
  // also create another structure that groups data based on current page in view

  // create a loop that runs data length number of times and increments based on itemsPerPage. Within the loop, slice and push into the new structure

  const pageNumbers = [];
  if (data?.length > 0 && itemsPerPage) {
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
      pageNumbers.push(i);
    }
  }
  useEffect(() => {
    if (data?.length > 0 && itemsPerPage) {
      const newData = [];
      for (let i = 0; i < data.length; i += itemsPerPage) {
        const slicedData = data.slice(i, i + itemsPerPage);
        newData.push(slicedData);
      }
      setGroupedData(newData);
    }
  }, [data, itemsPerPage]);

  // create a useEffect function that fires when pageNo and itemsPerPage state changes
  useEffect(() => {
    const calculateIndexes = () => {
      const newFirstItemIndex = (currentPage - 1) * itemsPerPage + 1;
      const newLastItemIndex = Math.min(currentPage * itemsPerPage, data.length);
      setFirstItemIndex(newFirstItemIndex);
      setLastItemIndex(newLastItemIndex);
    };
    data?.length > 0 && calculateIndexes();
  }, [itemsPerPage, currentPage, data?.length]);
  return /*#__PURE__*/React.createElement("div", null, groupedData?.length > 0 && groupedData[currentPage - 1]?.map((d, i) => /*#__PURE__*/React.createElement("p", {
    key: i
  }, d.title)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gray-200 flex items-center gap-10  text-gray-600 mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center border-r-[1px] border-gray-300 p-2"
  }, /*#__PURE__*/React.createElement("p", null, "Items per page:"), /*#__PURE__*/React.createElement("select", {
    value: itemsPerPage,
    onChange: e => {
      setItemsPerPage(Number(e.target.value));
      // then check if currentPage value is greater than the last item in pageNumbers array. If true, reset currentPage to 1
      if (currentPage > pageNumbers?.length) {
        setCurrentPage(1);
      }
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: 5
  }, "5"), /*#__PURE__*/React.createElement("option", {
    value: 10
  }, "10"), /*#__PURE__*/React.createElement("option", {
    value: 15
  }, "15"), /*#__PURE__*/React.createElement("option", {
    value: 20
  }, "20"), /*#__PURE__*/React.createElement("option", {
    value: 25
  }, "25"))), /*#__PURE__*/React.createElement("p", {
    className: "border-r-[1px] border-gray-300 flex-1 p-2"
  }, firstItemIndex + 1, " - ", lastItemIndex, " of ", data?.length, " items"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center border-r-[1px] border-gray-300 p-2"
  }, /*#__PURE__*/React.createElement("select", {
    value: currentPage,
    onChange: e => setCurrentPage(Number(e.target.value))
  }, pageNumbers.map((pageNo, i) => /*#__PURE__*/React.createElement("option", {
    key: i,
    value: pageNo
  }, pageNo))), /*#__PURE__*/React.createElement("p", null, "of ", pageNumbers?.length, " pages")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === 1,
    onClick: () => setCurrentPage(currentPage - 1),
    className: "border-r-[1px] border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-gray-300"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-left"
  })), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage == pageNumbers[pageNumbers?.length - 1],
    onClick: () => {
      setCurrentPage(currentPage + 1);
      // check if the next currentPage would be greater than current maxItemIndex
      setFirstItemIndex(firstItemIndex + itemsPerPage);
      setLastItemIndex(lastItemIndex + itemsPerPage);
    },
    className: "border-r-[1px] border-gray-300 p-2 disabled:cursor-not-allowed disabled:text-gray-300"
  }, /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-chevron-right"
  })))));
};

const StarRating = () => {
  // on clicking any star, set a stateful Rating value to be the rating value of clicked star
  const [selectedRating, setSelectedRating] = useState(null);
  const [hoveredRating, setHoveredRating] = useState(null);
  //   apply yellow color to stars whose value falls within the selectedRating value

  return /*#__PURE__*/React.createElement("div", null, [...Array(5)].map((value, i) => {
    const rating = i + 1;
    return /*#__PURE__*/React.createElement("label", null, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSelectedRating(rating),
      onMouseEnter: () => setHoveredRating(rating),
      onMouseLeave: () => setHoveredRating(null)
    }, /*#__PURE__*/React.createElement("i", {
      className: `fa-solid fa-star text-2xl ${rating <= (hoveredRating || selectedRating) ? "text-yellow-300 transition-all ease-in-out delay-200 duration-200" : "text-gray-300"}`
    })), /*#__PURE__*/React.createElement("input", {
      type: "radio",
      name: "rating",
      value: rating,
      className: "hidden"
    }));
  }));
};

const Tab = _ref => {
  let {
    tabNavList,
    tabContentData,
    variant
  } = _ref;
  const [activeTab, setActiveTab] = useState("tab1");
  const tabAnimation = "transition-all ease-in-out delay-100 duration-150";
  return /*#__PURE__*/React.createElement("div", {
    className: "shadow-lg"
  }, /*#__PURE__*/React.createElement("ul", {
    className: `flex justify-between items-center gap-1 p-5 ${variant == "contained" ? "" : "w-[20%]"}`
  }, tabNavList?.map(nav => /*#__PURE__*/React.createElement("li", {
    onClick: () => setActiveTab(nav.id),
    key: nav.id,
    className: `${variant === "contained" ? "border-l-[2px]" : "border-b-[2px]"}  w-full text-center p-3   cursor-pointer ${tabAnimation} ${nav.id === activeTab ? "border-blue-500 text-black hover:none" : "hover:text-black hover:border-gray-500 text-gray-300"}`
  }, nav.title))), /*#__PURE__*/React.createElement("main", {
    className: "py-10 px-5"
  }, tabContentData?.map(content => {
    if (content.id === activeTab) {
      return /*#__PURE__*/React.createElement(TabContent, {
        key: content.id,
        animation: tabAnimation
      }, /*#__PURE__*/React.createElement("h1", null, "Yoo, this is epic!"), /*#__PURE__*/React.createElement("p", null, content.contents));
    }
  })));
};

// tab content
const TabContent = _ref2 => {
  let {
    children,
    animation
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    className: animation
  }, children);
};

// mock tab content data
// const tabContentData = [
//   {
//     id: "tab1",
//     contents: "I love red for whatever weird reason",
//   },
//   {
//     id: "tab2",
//     contents: "I love green for whatever weird reason",
//   },
//   {
//     id: "tab3",
//     contents: "I love blue for whatever weird reason",
//   },
// ];

const TextInput = _ref => {
  let {
    id,
    inputType,
    labelText = "Update this label text",
    helperText = "Update this helper text",
    size,
    placeholder = "Update this placeholder text",
    showHelperText = false,
    showLabelText = true,
    isDisabled = false,
    isReadOnly = false,
    isPasswordMode = false,
    showPassword,
    togglePasswordVisibility,
    inputValue,
    onChange,
    onClick,
    ...rest
  } = _ref;
  const sizeStyle = size == "lg" ? "p-3" : size == "md" ? "w-1/2 p-3" : "";
  return /*#__PURE__*/React.createElement("form", null, showLabelText && /*#__PURE__*/React.createElement("label", {
    className: "text-sm text-gray-500"
  }, labelText), /*#__PURE__*/React.createElement("div", {
    className: `${sizeStyle} border flex items-center`
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: isPasswordMode ? showPassword ? "text" : "password" : "text",
    name: "",
    id: id,
    onClick: onClick,
    value: inputValue,
    onChange: onChange,
    readOnly: isReadOnly,
    disabled: isDisabled,
    placeholder: placeholder,
    className: `pr-5 rounded-lg focus:outline focus:outline-none flex-1`
  }, rest)), isPasswordMode && /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: togglePasswordVisibility
  }, /*#__PURE__*/React.createElement("i", {
    className: `fa-solid fa-${showPassword ? "eye" : "eye-slash"}`
  }))), showHelperText && /*#__PURE__*/React.createElement("span", {
    className: "text-sm"
  }, helperText));
};

const ToggleSwitch = _ref => {
  let {
    variant,
    showLabel,
    size,
    onClickHandler
  } = _ref;
  const [isToggled, setIsToggled] = useState(false);
  const sizeStyle = size == "sm" ? "w-20 h-10" : size == "lg" ? "w-40 h-20" : "";
  const skeletonStyle = "animate-pulse space-x-4 bg-slate-800";
  const isToggledStyle = isToggled ? "right-1" : "left-1";
  const transition = "transition ease-in-out delay-200";
  return /*#__PURE__*/React.createElement("button", {
    disabled: variant == "skeleton",
    onClick: () => {
      setIsToggled(!isToggled);
      onClickHandler();
    },
    className: `relative border border-gray-500 ${variant == "skeleton" ? "cursor-none" : "cursor-pointer"} rounded-full overflow-hidden ${transition} ${variant == "skeleton" ? skeletonStyle : ""} ${sizeStyle} ${isToggled ? "bg-green-700" : "bg-gray-500"}`
  }, showLabel && /*#__PURE__*/React.createElement("i", {
    className: "fa-solid fa-check text-white absolute left-[20%] top-1/2 -translate-y-1/2"
  }), /*#__PURE__*/React.createElement("div", {
    className: `absolute top-1/2 -translate-y-1/2 w-1/2 h-5/6 ${transition} bg-white rounded-full ${isToggledStyle} ${variant == "skeleton" ? skeletonStyle : ""}`
  }));
};

const Tooltip = _ref => {
  let {
    children,
    content
  } = _ref;
  // const [position, setPosition] = useState({ top: 0, left: 0 });

  const [tooltipWidth, setTooltipWidth] = useState(null);
  const [tooltipHeight, setTooltipHeight] = useState(null);
  const tooltipRef = useRef(null);
  const tooltipParentRef = useRef(null);

  // console.log(tooltipWidth, tooltipHeight);
  /*
  1. know the total width of the tooltip content
  2. compare tooltip width to available space of parent from the left, right, top, and bottom.
   */

  const handleTooltipPositioning = clientRect => {
    const {
      top,
      right,
      bottom,
      left,
      width
    } = clientRect;
    // check if available space from wrapper to tooltip is enough for tooltip's content
    // if top is okay, position tooltip to the top, etc
    if (left >= tooltipWidth) {
      tooltipRef.current.style.left = `-${width + 140}px`;
    } else if (right >= tooltipWidth) tooltipRef.current.style.right = `-${width + 140}px`;else if (top >= tooltipHeight) {
      tooltipRef.current.style.top = `-${height + 140}px`;
    } else if (bottom >= tooltipHeight) {
      tooltipRef.current.style.bottom = `-${height + 140}px`;
    }
  };
  useEffect(() => {
    if (tooltipRef.current) {
      setTooltipWidth(tooltipRef.current.getBoundingClientRect().width);
      setTooltipHeight(tooltipRef.current.getBoundingClientRect().height);
    }
  }, [tooltipRef.current]);
  return /*#__PURE__*/React.createElement("div", {
    ref: tooltipParentRef,
    onMouseEnter: e => handleTooltipPositioning(e.target.getBoundingClientRect()),
    className: "group relative inline-block"
  }, children, /*#__PURE__*/React.createElement("span", {
    ref: tooltipRef,
    className: "invisible group-hover:visible opacity-0 group-hover:opacity-100 transition p-1 bg-black text-white rounded absolute mt-2 whitespace-nowrap"
  }, content));
};

export { Accordion, Button, FileUploader, Link, Pagination, StarRating, Tab, TextInput, ToggleSwitch, Tooltip };
