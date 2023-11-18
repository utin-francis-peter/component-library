import React from "react";

const TextInput = ({
  id,
  inputType,
  labelText = "Update this label text",
  helperText = "Update this helper text",
  size,
  placeholder = "Update this placeholder text",
  showHelperText = false,
  showLabelText = true,
  isDisabled = false,
  isReadOnly = false,
  isPasswordMode = false,
  showPassword,
  togglePasswordVisibility,
  inputValue,
  onChange,
  onClick,
  ...rest
}) => {
  const sizeStyle = size == "lg" ? "p-3" : size == "md" ? "w-1/2 p-3" : "";

  return (
    <form>
      {showLabelText && (
        <label className="text-sm text-gray-500">{labelText}</label>
      )}
      <div className={`${sizeStyle} border flex items-center`}>
        <input
          type={isPasswordMode ? (showPassword ? "text" : "password") : "text"}
          name=""
          id={id}
          onClick={onClick}
          value={inputValue}
          onChange={onChange}
          readOnly={isReadOnly}
          disabled={isDisabled}
          placeholder={placeholder}
          className={`pr-5 rounded-lg focus:outline focus:outline-none flex-1`}
          {...rest}
        />
        {isPasswordMode && (
          <button type="button" onClick={togglePasswordVisibility}>
            <i
              className={`fa-solid fa-${
                showPassword ? "eye" : "eye-slash"
              }`}></i>
          </button>
        )}
      </div>
      {showHelperText && <span className="text-sm">{helperText}</span>}
    </form>
  );
};

export default TextInput;
