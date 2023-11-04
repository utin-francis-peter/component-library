import { useState } from "react";
import TextInput from "../components/TextInput";

export default {
  title: "TextInput",
  component: TextInput,
};

export const Medium = {
  args: {
    size: "md",
  },
};

export const Large = {
  args: {
    size: "lg",
  },
};

export const PasswordMode = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextInput
      isPasswordMode={true}
      showPassword={showPassword}
      togglePasswordVisibility={togglePasswordVisibility}
      size="md"
    />
  );
};
