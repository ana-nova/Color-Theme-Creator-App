import { useState } from "react";
// import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import "./ColorForm.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";

export default function ColorForm({
  onSubmitColor,
  isEditing,
  initialColor = { role: "primary", hex: "#ffffff", contrastText: "#000000" },
}) {
  const [role, setRole] = useState(initialColor.role);
  const [hex, setHex] = useState(initialColor.hex);
  const [contrastText, setContrastText] = useState(initialColor.contrastText);

  function handleSubmit(event) {
    event.preventDefault();
    const newColor = {
      id: initialColor.id || uid(),
      role,
      hex,
      contrastText,
    };

    onSubmitColor(newColor);
    resetForm();
  }

  function resetForm() {
    setRole("primary");
    setHex("#000000");
    setContrastText("#ffffff");
  }

  return (
    <Box
      p={2}
      borderRadius="md"
      boxShadow="md"
      maxWidth="500px"
      padding="5"
      display="flex"
      alignItems="center"
      overflow="hidden" // Match the card overflow behavior
      flexDirection="column"
      justifyContent="center"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} width="300px">
          <FormControl id="role">
            <FormLabel>Role</FormLabel>
            <Input
              type="text"
              name="role"
              value={role}
              onChange={(event) => setRole(event.target.value)}
              bg="white"
            />
          </FormControl>

          <FormControl id="hex">
            <FormLabel>Hex</FormLabel>
            <HStack spacing={4}>
              <Input
                type="text"
                value={hex}
                onChange={(event) => setHex(event.target.value)}
                bg="white"
                flex="8"
              />
              <Input
                type="color"
                value={hex}
                onChange={(event) => setHex(event.target.value)}
                flex="2"
              />
            </HStack>
          </FormControl>

          <FormControl id="contrastText">
            <FormLabel>Contrast Text</FormLabel>
            <HStack spacing={4}>
              <Input
                type="text"
                value={contrastText}
                onChange={(event) => setContrastText(event.target.value)}
                bg="white"
                flex="8"
              />
              <Input
                type="color"
                value={contrastText}
                onChange={(event) => setContrastText(event.target.value)}
                flex="2"
              />
            </HStack>
          </FormControl>

          <Button type="submit" colorScheme="pink" width="full">
            {isEditing ? "Update Color" : "Add Color"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}

/*
Summary of functionalities here:
1. Users can enter the role, hex color, and contrast text.
2. When the form is submitted, it generates a new color object and passes it to a parent component via the onSubmitColor prop.
3. After submission, the form fields reset to their default values using the resetForm function.
4. The form can dynamically change its behavior between "add" and "update" modes based on the isEditing prop.

trivia:
ColorInput.jsx: The ColorForm uses the ColorInput component for the hex and contrast text fields. 
The ColorInput component receives two props: inputValue to control the displayed value and onChange to update the state when the value changes.

Parent Component: The form's submission behavior is controlled by the onSubmitColor prop, 
which is a function passed down from a parent component (App.jsx). 
This function handles what happens when a new color is added or updated.
*/
