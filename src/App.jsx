import { useState } from "react";
import useLocalStorageState from "use-local-storage-state"; // Ensure you have this package installed
import { initialThemes } from "./lib/InitialThemes";
import { initialColors } from "./lib/InitialColors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import Theme from "./Components/Theme/Theme";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", { defaultValue: initialThemes });
  const [colors, setColors] = useLocalStorageState("colors", { defaultValue: initialColors });
  const [selectedThemeId, setSelectedThemeId] = useState("t1"); // Default to the Default Theme


  const handleAddColor = (newColor) => {
    setColors((prevColors) => [...prevColors, newColor]); // Add new color to the color list
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [...theme.colors, newColor.id] }
          : theme
      )
    );
  };

  const handleDeleteColor = (colorId) => {
    setColors((prevColors) => prevColors.filter((color) => color.id !== colorId)); // Remove color from colors list
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: theme.colors.filter((id) => id !== colorId) }
          : theme
      )
    );
  };

  const handleUpdateColor = (colorId, updatedColor) => {
    setColors((prevColors) =>
      prevColors.map((color) => (color.id === colorId ? updatedColor : color))
    );
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? {
              ...theme,
              colors: theme.colors.map((id) => (id === colorId ? updatedColor.id : id)),
            }
          : theme
      )
    );
  };

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
  const colorsToShow = selectedTheme.colors
    .map((colorId) => colors.find((color) => color.id === colorId))
    .filter((color) => color !== undefined); // Filter out any undefined colors

    return (
      <>
        <h1>Theme Creator</h1>
        
        {/* Use the new Theme component for theme actions */}
        <Theme
          themes={themes}
          setThemes={setThemes}
          selectedThemeId={selectedThemeId}
          setSelectedThemeId={setSelectedThemeId}
        />
  
        <ColorForm onSubmitColor={handleAddColor} />
        {colorsToShow.map((color) => (
          <Color
            key={color.id}
            color={color}
           onDeleteColor={selectedThemeId !== "t1" ? handleDeleteColor : null} // Disable delete for Default Theme
           onUpdateColor={selectedThemeId !== "t1" ? handleUpdateColor : null} // Disable edit for Default Theme
          />
        ))}
      </>
    );
  }
  
  export default App;
