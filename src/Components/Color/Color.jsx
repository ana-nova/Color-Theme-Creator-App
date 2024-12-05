import { useEffect, useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [edit, setEdit] = useState(false);
  const [contrastScore, setContrastScore] = useState(null);
  const [fetchColor, setFetchColor] = useState(null);

  useEffect(() => {
    async function fetchContrastScore() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
          }
        );

        const data = await response.json();
        setContrastScore(data.overall);

        if (data.overall === "Yup") {
          setFetchColor("green");
        } else if (data.overall === "Kinda") {
          setFetchColor("orange");
        } else {
          setFetchColor("red");
        }
      } catch (error) {
        console.error("Error fetching contrast score:", error);
      }
    }
    fetchContrastScore();
  }, [color]);

  function handleDelete() {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the color "${color.role}"?`
    );

    if (userConfirmed) {
      onDeleteColor(color.id);
    }
  }

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdateColor(updatedColor) {
    onUpdateColor(color.id, updatedColor);
    setEdit(false);
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      {edit ? (
        <ColorForm
          onSubmitColor={handleUpdateColor}
          isEditing={edit}
          initialColor={color}
        />
      ) : (
        <>
          <CopyToClipboard hexCode={color.hex} />
          <h3 className="color-card-headlight">{color.role}</h3>
          <p>hex: {color.hex}</p>
          <p>contrast: {color.contrastText}</p>
          <p style={{ backgroundColor: fetchColor }}>
            Accessibility Score: {contrastScore ? contrastScore : "Loading..."}
          </p>
          <button onClick={handleDelete}>delete</button>
          <button onClick={handleEdit}>edit</button>
        </>
      )}
    </div>
  );
}

/*
Summary of functionalities:
1. Shows color details, such as the role, hex value, contrast text, and accessibility score.
2. Allows users to edit color details by toggling to an edit form using the ColorForm component.
3. Provides functionality to delete a color from the list with user confirmation.
4. Fetches and displays the accessibility score of the color combination using an external API. 

trivia:
ColorForm.jsx: This component is used when the color is in edit mode, allowing the user to 
modify the color details. It receives onSubmitColor, isEditing, and initialColor as props.
    onSubmitColor: Linked to the handleUpdateColor function, which updates the color data.
    initialColor: Provides the current color data to pre-populate the form fields.

CopyToClipboard.jsx: This component allows users to copy the hex color code to the clipboard. 
It receives hexCode as a prop from the Color component.

App.jsx: The Color component likely receives the color, onDeleteColor, and onUpdateColor props 
from a parent component that manages the state of all colors.
*/

/*
    The ) : ( syntax is part of a ternary operator that helps you choose between 
    two expressions based on a condition. It's a concise way to write simple 
    conditional logic in your code.

*/
