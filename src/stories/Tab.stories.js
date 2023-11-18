import Tab from "../components/Tab/index";

export default {
  title: "Tab",
  Component: Tab,
};

const tabNavList = [
  {
    id: "tab1",
    title: "Red",
  },
  {
    id: "tab2",
    title: "Green",
  },
  {
    id: "tab3",
    title: "Blue",
  },
];

export const Default = () => {
  return <Tab tabNavList={tabNavList} />;
};

export const ContainedFullWidth = () => {
  return <Tab tabNavList={tabNavList} variant="contained" />;
};
