import { Button, HStack, Input, Select } from "@chakra-ui/react";
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
          <Input
            type="text"
            value={themeInput}
            onChange={handleInputChange}
            placeholder={
              isAdding ? "Enter new theme name" : "Edit current theme name"
            }
            bg="white"
            borderColor="teal.400"
            focusBorderColor="teal.600"
            size="sm"
            mb={2}
          />
          <Button
            onClick={handleSaveTheme}
            colorScheme="green"
            size="sm"
            mr={2}
          >
            Save
          </Button>
          <Button onClick={handleCancel} colorScheme="red" size="sm">
            Cancel
          </Button>
        </>
      ) : (
        <HStack spacing={4} align="center">
          <Select
            value={selectedThemeId}
            onChange={handleThemeSelectChange}
            maxWidth="200px" 
            bg="white"
            borderColor="teal.400"
            focusBorderColor="teal.600"
          >
            {themes.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </Select>
          <Button colorScheme="green" padding={"5"} onClick={handleAddTheme}>
            Add Theme
          </Button>
          <Button
            padding={"5"}
            colorScheme="blue"
            onClick={handleEditTheme}
            isDisabled={selectedThemeId === "t1"}
          >
            Edit Theme
          </Button>
          <Button
            padding={"5"}
            colorScheme="red"
            onClick={() => handleDeleteTheme(themeToDelete)}
            isDisabled={selectedThemeId === "t1"} 
          >
            Delete Theme
          </Button>
        </HStack>
      )}
    </div>
  );
}
