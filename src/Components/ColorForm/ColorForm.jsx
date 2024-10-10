import { useState } from "react";
import ColorInput from "../ColorInput/ColorInput";
import { uid } from "uid";
import "./ColorForm.css";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
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

  // return (
  //   <form className="color-form" onSubmit={handleSubmit}>
  //     <label htmlFor="role">
  //       Role
  //       <br />
  //       <input
  //         type="text"
  //         id="role"
  //         name="role"
  //         value={role}
  //         onChange={(event) => setRole(event.target.value)}
  //       />
  //     </label>

  //     <label htmlFor="hex">
  //       Hex
  //       <br />
  //       <ColorInput
  //         id="hex"
  //         inputValue={hex}
  //         onChange={setHex}
  //       />
  //     </label>

  //     <label htmlFor="contrastText">
  //       Contrast Text
  //       <br />
  //       <ColorInput
  //         id="contrastText"
  //         inputValue={contrastText}
  //         onChange={setContrastText}
  //       />
  //     </label>

  //     <button type="submit">{isEditing ? "update your color" : "add your color"}</button>
  //   </form>
  // );

  return (
    <Box
      p={2}
      borderRadius="md"
      boxShadow="md"
      maxWidth="500px"
      margin="0 auto"
      bg={"brown"}
      width={"100%"}
      display="flex"
      alignItems="center"
    >
      <form onSubmit={handleSubmit}>
        <VStack spacing={4} align="stretch" width="400px">
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
            <ColorInput type="color" inputValue={hex} onChange={setHex} />
          </FormControl>

          <FormControl id="contrastText">
            <FormLabel>Contrast Text</FormLabel>
            <ColorInput
              type="color"
              inputValue={contrastText}
              onChange={setContrastText}
            />
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full">
            {isEditing ? "Update Color" : "Add Color"}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
