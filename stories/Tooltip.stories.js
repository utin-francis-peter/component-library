import Tooltip from "../components/Tooltip";

export default {
  title: "Tooltip",
  component: Tooltip,
  parameters: {
    // layout: "centered",
  },
};

export const Default = () => {
  return (
    <Tooltip content={"Update this content"}>
      <button className="bg-black text-white w-8 h-8 rounded-full font-bold">
        i
      </button>
    </Tooltip>
  );
};
