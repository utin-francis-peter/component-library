/**
 * Primary UI component for user interaction
 */

export const Button = ({ primary, backgroundColor, size, label, ...props }) => {
  return (
    <button type="button" className="bg-red-600">
      {label}
    </button>
  );
};
