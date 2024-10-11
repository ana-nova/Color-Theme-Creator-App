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
      id: uid(),
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

          {/* Hex Input and Color Picker on the same line */}
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

          {/* Contrast Text Input and Color Picker with 80:20 ratio */}
          <FormControl id="contrastText">
            <FormLabel>Contrast Text</FormLabel>
            <HStack spacing={4}>
              <Input
                type="text"
                value={contrastText}
                onChange={(event) => setContrastText(event.target.value)}
                bg="white"
                flex="8" // Takes up 80% of the space
              />
              <Input
                type="color"
                value={contrastText}
                onChange={(event) => setContrastText(event.target.value)}
                flex="2" // Takes up 20% of the space
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
