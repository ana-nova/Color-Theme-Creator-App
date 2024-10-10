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
            bg="white" // Ensures that the background color is white
            borderColor="gray.400" // Adds a visible border color
            focusBorderColor="teal.500" // Border color when the input is focused
            color="black"
          />
          <Input
            type="color"
            value={inputValue}
            onChange={handleInputValue}
            bg="white" // Ensures that the background color is white
            borderColor="gray.400" // Adds a visible border color
            focusBorderColor="teal.500" // Border color when the input is focused
            color="black"
          />
        </VStack>
      </Box>
    </>
  );
}
