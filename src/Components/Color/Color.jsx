import { useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  function handleDelete() {
    // Show a confirmation dialog before deleting
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the color "${color.role}"?`
    );

    if (userConfirmed) {
      onDeleteColor(color.id); 
    }
  }

  const [edit, setEdit] = useState(false);

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
        <ColorForm onSubmitColor={handleUpdateColor} initialData={color}/>
      ) : (
      <>
        <h3 className="color-card-headlight">{color.role}</h3>
        <p>hex: {color.hex}</p>
        <p>contrast: {color.contrastText}</p>
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