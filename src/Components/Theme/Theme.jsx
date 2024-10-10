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

  const themeToDelete = themes.find((theme) => theme.id === selectedThemeId);

  const handleThemeSelectChange = (event) => {
    setSelectedThemeId(event.target.value);
  };

  const handleAddTheme = () => {
    setIsAdding(true);
    setThemeInput("");
  };

  const handleEditTheme = () => {
    if (selectedThemeId === "t1") return;
    const currentTheme = themes.find((theme) => theme.id === selectedThemeId);
    setIsEditing(true);
    setThemeInput(currentTheme.name);
  };

  const handleInputChange = (event) => {
    setThemeInput(event.target.value);
  };

  const handleSaveTheme = () => {
    if (isAdding) {
      const newTheme = {
        id: `t${themes.length + 1}`,
        name: themeInput,
        colors: [],
      };
      setThemes([...themes, newTheme]);
      setSelectedThemeId(newTheme.id);
      setIsAdding(false);
    } else if (isEditing) {
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
    if (selectedThemeId === "t1") return;

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
