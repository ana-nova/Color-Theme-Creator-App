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
    setColors((prevColors) => [...prevColors, newColor]);
    setThemes((prevThemes) =>
      prevThemes.map((theme) =>
        theme.id === selectedThemeId
          ? { ...theme, colors: [...theme.colors, newColor.id] }
          : theme
      )
    );
  };

  const handleDeleteColor = (colorId) => {
    setColors((prevColors) =>
      prevColors.filter((color) => color.id !== colorId)
    );
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

      <SimpleGrid columns={[1, 2, 3, 4]} spacing={4} p={4}>
        {colorsToShow.map((color) => (
          <Color
            key={color.id}
            color={color}
            onDeleteColor={selectedThemeId !== "t1" ? handleDeleteColor : null}
            onUpdateColor={selectedThemeId !== "t1" ? handleUpdateColor : null}
          />
        ))}
      </SimpleGrid>
    </>
  );
}

export default App;
