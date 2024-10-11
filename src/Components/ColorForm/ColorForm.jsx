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
