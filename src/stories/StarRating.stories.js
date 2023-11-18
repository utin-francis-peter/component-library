import StarRating from "../components/StarRating/StarRating";

export default {
  title: "StarRating",
  component: StarRating,
  parameters: {
    layout: "centered",
  },
};

export const Default = () => {
  return <StarRating />;
};
