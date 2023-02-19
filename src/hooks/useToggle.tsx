import { useState } from "react";

const useToggle = defaultValue => {
  const [value, setValue] = useState<boolean>(defaultValue);

  const toggleValue = () => {
    setValue(currentValue => {
      typeof value === "boolean" ? value : !currentValue;
    });
  };
  return [value, toggleValue];
};

export default useToggle;
