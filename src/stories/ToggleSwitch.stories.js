import ToggleSwitch from "../components/ToggleSwitch/ToggleSwitch";

export default {
  title: "ToggleSwitch",
  component: ToggleSwitch,
  parameters: {
    layout: "centered",
  },
  args: {
    size: "sm",
    onClickHandler: () => {
      console.log("Update on click logic here");
    },
  },
};

export const Default = {
  args: {
    variant: "sm",
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const Labelled = {
  args: {
    showLabel: true,
  },
};

export const Skeleton = {
  args: {
    variant: "skeleton",
  },
};
