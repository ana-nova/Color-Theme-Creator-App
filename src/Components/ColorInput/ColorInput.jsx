export default function ColorInput({ id, inputValue, onChange }) {
  function handleInputValue(event) {
    const newValue = event.target.value;
    
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
