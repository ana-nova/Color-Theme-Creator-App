import { initialColors } from "./lib/colors";
import Color from "./Components/Color/Color";
import "./App.css";
import { useState } from "react";
import ColorForm from "./Components/ColorForm/ColorForm";


function App() {
  // State to keep track of all colors
  const [colors, setColors] = useState(initialColors);

  // Function to handle adding a new color to the list
  function handleAddColor(newColor) {
    setColors((prev) => ([newColor, ...prev]));
  }

  return (
    <>
      <h1>Theme Creator</h1>
      <ColorForm onSubmitColor={handleAddColor} />
      {colors.map((color) => {
        return <Color key={color.id} color={color} />;
      })}
    </>
  );
}

export default App;
