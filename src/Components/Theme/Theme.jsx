import { useState } from "react";

export default function Theme({
  themes,
  setThemes,
  selectedThemeId,
  setSelectedThemeId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [themeInput, setThemeInput] = useState("");

  const themeToDelete = themes.find((theme) => theme.id === selectedThemeId); // Finding the currently selected theme to potentially delete

  const handleThemeSelectChange = (event) => {
    setSelectedThemeId(event.target.value);
  };

  const handleAddTheme = () => {
    setIsAdding(true); // Setting the state to indicate that a new theme is being added
    setThemeInput(""); // Resetting the theme input field to an empty string
  };

  const handleEditTheme = () => {
    if (selectedThemeId === "t1") return; // Prevent editing the default theme
    const currentTheme = themes.find((theme) => theme.id === selectedThemeId);
    setIsEditing(true); // Setting the state to indicate that a theme is being edited
    setThemeInput(currentTheme.name); // Setting the theme input field with the current theme's name
  };

  const handleInputChange = (event) => {
    setThemeInput(event.target.value); // Updating the theme input state with the new value
  };

  const handleSaveTheme = () => {
    if (isAdding) {
      const newTheme = {
        id: `t${themes.length + 1}`,
        name: themeInput,
        colors: [],
      };
      setThemes([...themes, newTheme]); // Adding the new theme to the themes array
      setSelectedThemeId(newTheme.id);
      setIsAdding(false);
    } else if (isEditing) {
      // If an existing theme is being edited
      setThemes(
        themes.map((theme) =>
          theme.id === selectedThemeId ? { ...theme, name: themeInput } : theme
        )
      );
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setIsEditing(false);
    setThemeInput("");
  };

  const handleDeleteTheme = (theme) => {
    if (selectedThemeId === "t1") return; // Prevent deleting the default theme; Writing just return without anything following it means that the function stops executing at that point.

    const confirmed = window.confirm(
      `Are you sure you want to delete this ${theme.name}?`
    );
    if (confirmed) {
      setThemes(themes.filter((theme) => theme.id !== selectedThemeId));
      setSelectedThemeId("t1");
    }
  };

  return (
    <div className="theme-actions">
      {isEditing || isAdding ? (
        <>
          <input
            type="text"
            value={themeInput}
            onChange={handleInputChange}
            placeholder={
              isAdding ? "Enter new theme name" : "Edit ccurent theme name"
            }
          />
          <button onClick={handleSaveTheme}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </>
      ) : (
        <>
          <select value={selectedThemeId} onChange={handleThemeSelectChange}>
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
          <button onClick={handleAddTheme}>add theme</button>
          <button onClick={handleEditTheme} disabled={selectedThemeId === "t1"}>
            edit theme
          </button>
          <button
            onClick={() => handleDeleteTheme(themeToDelete)}
            disabled={selectedThemeId === "t1"}
          >
            delete theme
          </button>
        </>
      )}
    </div>
  );
}
