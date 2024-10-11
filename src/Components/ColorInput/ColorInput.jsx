export default function ColorInput({ id, inputValue, onChange }) {
  function handleInputValue(event) {
    const newValue = event.target.value; // call the new value from the event object when the input changes
    onChange(newValue); // update parent component: ColorForm.jsx
  }

  return (
    <>
      <input
        type="text"
        id={id}
        name={id}
        value={inputValue} // Binding the input field's value as prop
        onChange={handleInputValue}
      />
      <input type="color" value={inputValue} onChange={handleInputValue} />
    </>
  );
}

/*
Summary of functionalities:
 1. Displays the color's hex code as text, allowing the user to edit it directly.
 2. Allows the user to select a color visually, which automatically updates the color value in real-time.
 
 trivia:
 The ColorInput component is used within the ColorForm to handle color input fields for both the hex value and the contrast text. 
 It receives the following props:
    inputValue: This prop is the current color value (either hex or contrast text) that is displayed in the input fields.
    onChange: The onChange function is used to update the state in the ColorForm component when the color value changes.
*/
