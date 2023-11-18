import React, { useState, useEffect, useRef } from "react";

const Tooltip = ({ children, content }) => {
  // const [position, setPosition] = useState({ top: 0, left: 0 });

  const [tooltipWidth, setTooltipWidth] = useState(null);
  const [tooltipHeight, setTooltipHeight] = useState(null);

  const tooltipRef = useRef(null);
  const tooltipParentRef = useRef(null);

  console.log(tooltipWidth, tooltipHeight);
  /*
1. know the total width of the tooltip content
2. compare tooltip width to available space of parent from the left, right, top, and bottom.

  */

  const handleTooltipPositioning = (clientRect) => {
    const { top, right, bottom, left, width } = clientRect;
    // check if available space from wrapper to tooltip is enough for tooltip's content
    // if top is okay, position tooltip to the top, etc
    if (left >= tooltipWidth) {
      tooltipRef.current.style.left = `-${width + 140}px`;
    } else if (right >= tooltipWidth)
      tooltipRef.current.style.right = `-${width + 140}px`;
    else if (top >= tooltipHeight) {
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

  return (
    <div
      ref={tooltipParentRef}
      onMouseEnter={(e) =>
        handleTooltipPositioning(e.target.getBoundingClientRect())
      }
      className="group relative inline-block">
      {children}

      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition p-1 bg-black text-white rounded absolute mt-2 whitespace-nowrap">
        {content}
      </span>
    </div>
  );
};

export default Tooltip;
