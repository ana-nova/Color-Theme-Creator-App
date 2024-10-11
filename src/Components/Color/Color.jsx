import { useEffect, useState } from "react";
import "./Color.css";
import ColorForm from "../ColorForm/ColorForm";
import CopyToClipboard from "../CopyToClipboard/CopyToClipboard";
import { Box, Button, ButtonGroup } from "@chakra-ui/react";

export default function Color({ color, onDeleteColor, onUpdateColor }) {
  const [edit, setEdit] = useState(false);
  const [contrastScore, setContrastScore] = useState(null);
  const [a11yBgColor, setA11yBgColor] = useState(null);

  useEffect(() => {
    async function fetchContrastScore() {
      try {
        const response = await fetch(
          "https://www.aremycolorsaccessible.com/api/are-they",
          {
            mode: "cors",
            method: "POST",
            body: JSON.stringify({ colors: [color.hex, color.contrastText] }),
          }
        );

        const data = await response.json();
        setContrastScore(data.overall);

        // Set the background color based on the score
        if (data.overall === "Yup") {
          setA11yBgColor("green");
        } else if (data.overall === "Kinda") {
          setA11yBgColor("orange");
        } else {
          setA11yBgColor("red");
        }
      } catch (error) {
        console.error("Error fetching contrast score:", error);
      }
    }
    fetchContrastScore();
  }, [color]);

  function handleDelete() {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete the color "${color.role}"?`
    );

    if (userConfirmed) {
      onDeleteColor(color.id);
    }
  }

  function handleEdit() {
    setEdit(!edit);
  }

  function handleUpdateColor(updatedColor) {
    onUpdateColor(color.id, updatedColor);
    setEdit(false);
  }

  return (
    <Box
      borderRadius="lg" // Makes the color card rounded
      overflow="hidden" // Ensures content stays within the rounded edges
      p={4}
      bg={color.hex}
      color={color.contrastText}
      boxShadow="md"
    >
      <div
        className="color-card"
        style={{
          background: color.hex,
          color: color.contrastText,
        }}
      >
        {edit ? (
          <ColorForm
            onSubmitColor={handleUpdateColor}
            isEditing={edit}
            initialColor={color}
          />
        ) : (
          <>
            <CopyToClipboard hexCode={color.hex} />
            <h3 className="color-card-headlight">{color.role}</h3>
            <p>hex: {color.hex}</p>
            <p>contrast: {color.contrastText}</p>
            <p style={{ backgroundColor: a11yBgColor }}>
              Accessibility Score:{" "}
              {contrastScore ? contrastScore : "Loading..."}
            </p>

            <ButtonGroup gap="2">
              <Button colorScheme="blackAlpha" size="xs" onClick={handleDelete}>
                delete
              </Button>
              <Button colorScheme="blackAlpha" size="xs" onClick={handleEdit}>
                edit
              </Button>
            </ButtonGroup>
          </>
        )}
      </div>
    </Box>
  );
}

/*
    The ) : ( syntax is part of a ternary operator that helps you choose between 
    two expressions based on a condition. It's a concise way to write simple 
    conditional logic in your code.

*/
