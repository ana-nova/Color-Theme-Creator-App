import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import "./ColorForm.css";

export default function ColorForm({ onSubmitColor }) {
  const [role, setRole] = useState("primary");
  const [hex, setHex] = useState("#000000");
  const [contrastText, setContrastText] = useState("#ffffff");

  function handleSubmit(event) {
    event.preventDefault();
    event.stopPropagation();
    const newColor = {
      id: uid(),
      role,
      hex,
      contrastText,
    };
  //  console.log("Form submitted:", newColor);

    onSubmitColor(newColor); // Pass the new color to the parent component
    resetForm(); // Reset the form to default values after submission
  }

  function resetForm() {
    setRole("primary");
    setHex("#000000");
    setContrastText("#ffffff");
  }

  return (
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)} // Controlled input for role
        />
      </label>
  
      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput
          id="hex"
          inputValue={hex}
          onChange={setHex} // Controlled input for hex color using ColorInput
        />
      </label>

      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput
          id="contrastText"
          inputValue={contrastText}
          onChange={setContrastText} // Controlled input for contrast text using ColorInput
        />
      </label>

      <button type="submit">add your color</button>
    </form>
  );
}


/*
                        my steps for issue 1:

    Step 1: Created ColorForm.jsx file to handle user input for adding new colors.
    Step 2: Used useState to manage the values for role, hex, and contrastText with default values.
    Step 3: Created a handleSubmit function to process the form input, create a new color object, generate a unique ID using nanoid, and pass it to the parent component.
    Step 4: After submitting the form, reset the input fields to their default values.
    Step 5: Created ColorInput.jsx file to synchronize the color and text inputs, ensuring they stay in sync using controlled inputs (e.g. value={role} in line 40, they provide a clean way to manage user input and keep the state consistent with what the user sees).
    Step 6: Updated ColorForm.jsx to use the ColorInput component for the hex and contrastText fields to make the form cleaner and more reusable.
    Step 7: Imported the ColorForm component in App.jsx and set up a state to manage the list of colors.
    Step 8: Created a function in App.jsx to add new colors to the top of the color list.
    Step 9: Added the ColorForm component to the main app to allow users to add new colors.
    Step 10: Used the .map() method to loop through the list of colors and display each one on a color card.
    Step 11: Added CSS styling in ColorForm.css to bring each input to its own line and enhance the layout.

*/