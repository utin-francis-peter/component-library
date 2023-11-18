import React, { useState } from "react";

const Tab = ({ tabNavList, variant }) => {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabAnimation = "transition-all ease-in-out delay-100 duration-150";

  return (
    <div className="shadow-lg">
      {/* the component would have two sections:
      1. nav: where the tab navs are flexed:
        - the component should expect tab navs data: a list [{id: "tab1", title: "", }]

    2. active tab view: based on active tab state, render a particular tab's data
      */}

      <ul
        className={`flex justify-between items-center gap-1 p-5 ${
          variant == "contained" ? "" : "w-[20%]"
        }`}>
        {tabNavList.map((nav) => (
          <li
            onClick={() => setActiveTab(nav.id)}
            key={nav.id}
            className={`${
              variant === "contained" ? "border-l-[2px]" : "border-b-[2px]"
            }  w-full text-center p-3   cursor-pointer ${tabAnimation} ${
              nav.id === activeTab
                ? "border-blue-500 text-black hover:none"
                : "hover:text-black hover:border-gray-500 text-gray-300"
            }`}>
            {nav.title}
          </li>
        ))}
      </ul>

      {/* tab body */}
      <main className="py-10 px-5">
        {tabContentData.map((content) => {
          if (content.id === activeTab) {
            return (
              <TabContent key={content.id} animation={tabAnimation}>
                <h1>Yoo, this is epic!</h1>
                <p>{content.contents}</p>
              </TabContent>
            );
          }
        })}
      </main>
    </div>
  );
};

export default Tab;

// tab content
export const TabContent = ({ children, animation }) => {
  return <div className={animation}>{children}</div>;
};

// mock tab content data
const tabContentData = [
  {
    id: "tab1",
    contents: "I love red for whatever weird reason",
  },
  {
    id: "tab2",
    contents: "I love green for whatever weird reason",
  },
  {
    id: "tab3",
    contents: "I love blue for whatever weird reason",
  },
];
