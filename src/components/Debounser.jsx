import { useState, useEffect } from "react";

function Debounser(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  // SETTING A TIMEOUT FOR THE VALUE COMING FROM THE INPUT FIELD TO BE RESOLVED
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]); 

  return debouncedValue;
}

export default Debounser;
