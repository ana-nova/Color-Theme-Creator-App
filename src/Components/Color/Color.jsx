import { useEffect, useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
//import useLocalStorageState from "use-local-storage-state";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [edit, setEdit] = useState(false);
  const [contrastScore, setContrastScore] = useState(null);


  useEffect(() => {
  async function fetchContrastScore() {
    try {
      const response = await fetch("https://www.aremycolorsaccessible.com/api/are-they", {
        mode: 'cors',
        method: "POST",
        body: JSON.stringify({ colors: [color.hex, color.contrastText] })
      });

      const data = await response.json();
      setContrastScore(data.overall); 
    } catch (error) {
      console.error("Error fetching contrast score:", error);
    }
  }
    fetchContrastScore();
}, [color])

  function handleDelete() {
    // Show a confirmation dialog before deleting
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
    onUpdateColor(color.id, updatedColor); // Update the color in the main list
    setEdit(false); // Exit edit mode after updating
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
        <ColorForm onSubmitColor={handleUpdateColor} isEditing={edit} initialColor={color}/>
      ) : (
      <>
        <CopyToClipboard hexCode={color.hex} />
        <h3 className="color-card-headlight">{color.role}</h3>
        <p>hex: {color.hex}</p>
        <p>contrast: {color.contrastText}</p>
        <p>
            Accessibility Score:{" "}
            {contrastScore ? contrastScore : "Loading..."}
          </p>
        <button onClick={handleDelete}>delete</button>
        <button onClick={handleEdit}>edit</button>
      </>
      )}
    </div>
  );
}


/*
    The ) : ( syntax is part of a ternary operator that helps you choose between 
    two expressions based on a condition. It's a concise way to write simple 
    conditional logic in your code.

*/