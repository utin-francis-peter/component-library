import Accordion from "../components/Accordion";

export default {
  title: "Accordion",
  component: Accordion,
};

const accordionList = [
  {
    id: "0",
    question: "What is your name?",
    response: "Utin, Francis Peter",
  },
  {
    id: "1",
    question: "What is your profession?",
    response: "Front-end Developer",
  },
  {
    id: "2",
    question: "What is your marital status",
    response: "Not married",
  },
];

export const Default = () => {
  return <Accordion accordionList={accordionList} />;
};
