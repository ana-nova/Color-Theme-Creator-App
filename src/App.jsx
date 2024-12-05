import { useState } from "react";
import useLocalStorageState from "use-local-storage-state";
import { initialThemes } from "./lib/InitialThemes";
import { initialColors } from "./lib/InitialColors";
import ColorForm from "./Components/ColorForm/ColorForm";
import Color from "./Components/Color/Color";
import "./App.css";
import Theme from "./Components/Theme/Theme";
import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";

function App() {
  const [themes, setThemes] = useLocalStorageState("themes", {
    defaultValue: initialThemes,
  });
  const [colors, setColors] = useLocalStorageState("colors", {
    defaultValue: initialColors,
  });
  const [selectedThemeId, setSelectedThemeId] = useState("t1");

  const handleAddColor = (newColor) => {
    setColors((prevColors) => [newColor, ...prevColors]);

    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [newColor.id, ...theme.colors] }
          : theme
      )
    );
  };

  const handleDeleteColor = (colorId) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== colorId)
    );

    setThemes((prevThemes) =>
      prevThemes.map((theme) => ({
        ...theme,
        colors: theme.colors.filter((id) => id !== colorId),
      }))
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
              colors: theme.colors.map((id) =>
                id === colorId ? updatedColor.id : id
              ),
            }
          : theme
      )
    );
  };

  const selectedTheme = themes.find((theme) => theme.id === selectedThemeId);
  const colorsToShow = selectedTheme.colors
    .map((colorId) => colors.find((color) => color.id === colorId))
    .filter((color) => color !== undefined);

  return (
    <>
      <Flex
        justify="center"
        align="center"
        minHeight="50vh"
        bg="gray.100"
        p={5}
      >
        <Box
          bg="white"
          p={5}
          borderRadius="md"
          boxShadow="lg"
          maxWidth="600px"
          width="100%"
        >
          <VStack spacing={6}>
            <Heading as="h1" size="lg" textAlign="center">
              Create your color theme 🌈🦄
            </Heading>

            <Theme
              themes={themes}
              setThemes={setThemes}
              selectedThemeId={selectedThemeId}
              setSelectedThemeId={setSelectedThemeId}
            />

            <ColorForm onSubmitColor={handleAddColor} />
          </VStack>
        </Box>
      </Flex>

      <SimpleGrid columns={[1, 2, 3]} spacing={3} p={4}>
        {colorsToShow.length > 0 ? (
          colorsToShow.map((color) => (
            <Box key={color.id} width="100%" height="100%">
              <Color
                color={color}
                onDeleteColor={handleDeleteColor}
                onUpdateColor={handleUpdateColor}
              />
            </Box>
          ))
        ) : (
          <p className="color-card-highlight">
            you have no colors in your theme. wanna add some?
          </p>
        )}
      </SimpleGrid>
    </>
  );
}

export default App;

/*
Summary of cuntionalities:
1. Uses useLocalStorageState to keep the state of themes and colors stored in the browser's local storage.
2. Allows users to add, delete, and update colors within the context of the selected theme.
3. Enables the user to select a theme and displays the corresponding colors associated with that theme.
4. Displays the list of colors that belong to the currently selected theme.

trivia:
ColorForm.jsx: The App component renders the ColorForm component, passing the handleAddColor function as 
the onSubmitColor prop. This allows the ColorForm to trigger the addition of new colors to the state when a color is submitted.

Color.jsx: The App component also renders the Color component for each color in the selected theme. 
It passes down the color object and functions for deleting (handleDeleteColor) and updating (handleUpdateColor) colors.

Deletion/Update Logic: The functions for deleting and updating colors are conditionally passed to the Color component 
based on the selected theme's ID to prevent modification of the default theme.

Theme.jsx: This component is responsible for displaying and selecting themes. It receives the themes state, the current 
selectedThemeId, and functions to modify these values from the App component.
*/
