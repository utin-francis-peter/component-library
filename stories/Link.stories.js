import Link from "../components/Link";

export default {
  title: "Link",
  component: Link,
};

export const Default = () => {
  return <Link href="https://twitter.com"> Download </Link>;
};

export const PairedWithIcon = () => {
  return (
    <Link
      isPairedWithIcon={true}
      icon="fa-solid fa-download"
      href="https://google.com">
      Download
    </Link>
  );
};
