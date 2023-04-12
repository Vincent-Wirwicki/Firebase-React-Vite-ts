import { useEffect, useState } from "react";

interface RulesType {
  regex?: RegExp;
  min?: number;
  max?: number;
}

export const useCheckInput = (
  initialValue: string,
  validationRules: RulesType
) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState("");

  useEffect(() => {
    let errorMessage = "";

    if (validationRules.regex && !validationRules.regex.test(value)) {
      errorMessage = "Invalid input";
    }

    if (validationRules.min && value.length < validationRules.min) {
      errorMessage = `Input must be at least ${validationRules.min} characters`;
    }

    if (validationRules.max && value.length > validationRules.max) {
      errorMessage = `Input must be at most ${validationRules.max} characters`;
    }

    setError(errorMessage);
  }, [value]);

  return { error };
};
