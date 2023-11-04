import React from "react";
import "../styles/Tooltip.css";

const Tooltip = ({ children, content }) => {
  return (
    <div className="tooltip-container relative ">
      <div className="tooltip-children group">
        {children}

        <div className="tooltip text-white p-3 rounded-[6px] bg-black  absolute top-1/2 -translate-y-1/2 left-[40px] opacity-0 invisible w-max group-hover:visible group-hover:opacity-100 transition-all ease-in-out delay-100 duration-200">
          <span>{content}</span>
        </div>
      </div>
    </div>
  );
};

export default Tooltip;
