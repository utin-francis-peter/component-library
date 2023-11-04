import React, { useState } from "react";

const Accordion = ({ accordionList }) => {
  const [activeAccordion, setActiveAccordion] = useState("0");
  return (
    /*   this component expects a list of accordion items at the top level.
    1. map over the list and return an AccordionItem component
    2.
    */
    <div>
      {accordionList.map((item) => (
        <AccordionItem
          key={item.id}
          item={item}
          activeAccordion={activeAccordion}
          setActiveAccordion={setActiveAccordion}
        />
      ))}
    </div>
  );
};

export default Accordion;

// accordion item
export const AccordionItem = ({
  item,
  activeAccordion,
  setActiveAccordion,
}) => {
  return (
    <button
      onClick={() => {
        if (item.id === activeAccordion) setActiveAccordion(null);
        else {
          setActiveAccordion(item.id);
        }
      }}
      className="block  w-full mt-3">
      <div className="flex items-center justify-between p-3 border border-gray-400 rounded-xl">
        <p>{item.question}</p>
        <div
          className={`border border-gray-400 p-3 w-[20px] h-[20px] flex items-center justify-center rounded-full ${
            item.id === activeAccordion ? "border-green-600" : "border-gray-400"
          }`}>
          <i
            className={` text-gray-400 fa-solid fa-chevron-${
              item.id === activeAccordion ? "up" : "down"
            }`}></i>
        </div>
      </div>

      {item.id === activeAccordion && (
        <p className="text-gray-700 text-left mt-3 px-3 py-2 transition-all ease-in-out delay-300">
          {item.response}
        </p>
      )}
    </button>
  );
};
