import { Button } from "../components/Button";

export default {
  title: "Button",
  component: Button,

  args: {
    label: "Button",
    variant: "primary",
    size: "lg",
  },
  parameters: {
    layout: "centered",
  },
};

export const Primary = {
  args: {
    // label: "Button",
    variant: "primary",
  },
};

export const Secondary = {
  args: {
    // label: "Button",
    variant: "secondary",
  },
};

export const Tertiary = {
  args: {
    // label: "Button",
    variant: "tertiary",
  },
};

export const Small = {
  args: {
    size: "sm",
    // label: "Button",
  },
};

export const Medium = {
  args: {
    size: "md",
    // label: "Button",
  },
};

export const Large = {
  args: {
    size: "lg",
    // label: "Button",
  },
};

export const Skeleton = {
  args: {
    variant: "skeleton",
    label: "",
  },
};
