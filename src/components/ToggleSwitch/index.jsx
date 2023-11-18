import React, { useState } from "react";

const ToggleSwitch = ({ variant, showLabel, size, onClickHandler }) => {
  const [isToggled, setIsToggled] = useState(false);

  const sizeStyle =
    size == "sm" ? "w-20 h-10" : size == "lg" ? "w-40 h-20" : "";
  const skeletonStyle = "animate-pulse space-x-4 bg-slate-800";

  const isToggledStyle = isToggled ? "right-1" : "left-1";

  const transition = "transition ease-in-out delay-200";
  return (
    <button
      disabled={variant == "skeleton"}
      onClick={() => {
        setIsToggled(!isToggled);
        onClickHandler();
      }}
      className={`relative border border-gray-500 ${
        variant == "skeleton" ? "cursor-none" : "cursor-pointer"
      } rounded-full overflow-hidden ${transition} ${
        variant == "skeleton" ? skeletonStyle : ""
      } ${sizeStyle} ${isToggled ? "bg-green-700" : "bg-gray-500"}`}>
      {showLabel && (
        <i className="fa-solid fa-check text-white absolute left-[20%] top-1/2 -translate-y-1/2"></i>
      )}
      <div
        className={`absolute top-1/2 -translate-y-1/2 w-1/2 h-5/6 ${transition} bg-white rounded-full ${isToggledStyle} ${
          variant == "skeleton" ? skeletonStyle : ""
        }`}></div>
    </button>
  );
};

export default ToggleSwitch;
