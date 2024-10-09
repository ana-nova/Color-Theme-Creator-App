import "./Color.css";

export default function Color({ color, onDeleteColor }) {
  function handleDelete() {
    // Show a confirmation dialog before deleting
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the color "${color.role}"?`
    );

    if (userConfirmed) {
      onDeleteColor(color.id); 
    }
  }

  return (
    <div
      className="color-card"
      style={{
        background: color.hex,
        color: color.contrastText,
      }}
    >
      <h3 className="color-card-headlight">{color.role}</h3>
      <p>hex: {color.hex}</p>
      <p>contrast: {color.contrastText}</p>
      <button onClick={handleDelete}>delete</button>
    </div>
  );
}
