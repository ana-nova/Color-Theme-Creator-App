import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import "./ColorForm.css";

export default function ColorForm({
  onSubmitColor,
  isEditing,
  initialColor = { role: "primary", hex: "#ffffff", contrastText: "#000000" },
}) {
  const [role, setRole] = useState(initialColor.role);
  const [hex, setHex] = useState(initialColor.hex);
  const [contrastText, setContrastText] = useState(initialColor.contrastText);

  function handleSubmit(event) {
    event.preventDefault();
    const newColor = {
      id: uid(),
      role,
      hex,
      contrastText,
    };

    onSubmitColor(newColor);
    resetForm();
  }

  function resetForm() {
    setRole("primary");
    setHex("#000000");
    setContrastText("#ffffff");
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="input-container">
        {/* Role input group */}
        <div className="input-group">
          <label htmlFor="role">
            Role
            <input
              className="input-field"
              type="text"
              id="role"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            />
          </label>
        </div>

        {/* Hex input and color picker group */}
        <div className="input-group">
          <label htmlFor="hex">
            Hex
            <ColorInput
              className="input-field"
              id="hex"
              inputValue={hex}
              onChange={setHex}
            />
          </label>
        </div>

        {/* Contrast text input and color picker group */}
        <div className="input-group">
          <label htmlFor="contrastText">
            Contrast Text
            <ColorInput
              className="input-field"
              id="contrastText"
              inputValue={contrastText}
              onChange={setContrastText}
            />
          </label>
        </div>

        {/* Add button */}
        <button className="button" type="submit">
          {isEditing ? "Update your color" : "Add your color"}
        </button>
      </div>
    </form>
  );
}
    <form className="color-form" onSubmit={handleSubmit}>
      <label htmlFor="role">
        Role
        <br />
        <input
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(event) => setRole(event.target.value)}
        />
      </label>

      <label htmlFor="hex">
        Hex
        <br />
        <ColorInput id="hex" inputValue={hex} onChange={setHex} />
      </label>

      <label htmlFor="contrastText">
        Contrast Text
        <br />
        <ColorInput
          id="contrastText"
          inputValue={contrastText} // passing the hex state as a prop to the ColorInput.jsx
          onChange={setContrastText} // Passing the setHex function as a prop to update the hex value when it changes
        />
      </label>

      <button type="submit">
        {isEditing ? "update your color" : "add your color"}
      </button>
    </form>
  );
}

/*
Summary of functionalities here:
1. Users can enter the role, hex color, and contrast text.
2. When the form is submitted, it generates a new color object and passes it to a parent component via the onSubmitColor prop.
3. After submission, the form fields reset to their default values using the resetForm function.
4. The form can dynamically change its behavior between "add" and "update" modes based on the isEditing prop.

trivia:
ColorInput.jsx: The ColorForm uses the ColorInput component for the hex and contrast text fields. 
The ColorInput component receives two props: inputValue to control the displayed value and onChange to update the state when the value changes.

Parent Component: The form's submission behavior is controlled by the onSubmitColor prop, 
which is a function passed down from a parent component (App.jsx). 
This function handles what happens when a new color is added or updated.
*/
