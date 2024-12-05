import { Box, Input, VStack } from "@chakra-ui/react";

export default function ColorInput({ id, inputValue, onChange }) {
  function handleInputValue(event) {
    const newValue = event.target.value;
    onChange(newValue);
  }

  return (
    <>
      <Box>
        <VStack>
          <Input
            type="text"
            id={id}
            name={id}
            value={inputValue}
            onChange={handleInputValue}
            bg="white"
            borderColor="gray.400"
            focusBorderColor="teal.500"
            color="black"
          />
          <Input
            type="color"
            value={inputValue}
            onChange={handleInputValue}
            bg="white"
            borderColor="gray.400"
            focusBorderColor="teal.500"
            color="black"
          />
        </VStack>
      </Box>
    </>
  );
}

/*
Summary of functionalities:
 1. Displays the color's hex code as text, allowing the user to edit it directly.
 2. Allows the user to select a color visually, which automatically updates the color value in real-time.
 
 trivia:
 The ColorInput component is used within the ColorForm to handle color input fields for both the hex value and the contrast text. 
 It receives the following props:
    inputValue: This prop is the current color value (either hex or contrast text) that is displayed in the input fields.
    onChange: The onChange function is used to update the state in the ColorForm component when the color value changes.
*/
