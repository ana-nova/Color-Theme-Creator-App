import { useState } from "react";

export default function ColorInput({ id, defaultValue, onChange }) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleInputValue(event) {
    const newValue = event.target.value;
    setInputValue(newValue); // Update local state
    onChange(newValue); // Directly pass the new value to the parent component

  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue}
        onChange={handleInputValue}
      />
      <input type="color" value={inputValue} onChange={handleInputValue} />
    </>
  );
}
