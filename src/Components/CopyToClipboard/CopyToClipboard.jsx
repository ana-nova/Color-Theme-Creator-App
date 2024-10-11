import { Box, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexCode }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(hexCode);
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy hex code: ", error);
    }
  }

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <Box position="relative" width="100%">
      <Box position="absolute" top="8px" right="8px">
        <Button colorScheme="yellow" size="xs" onClick={handleCopyClick}>
          copy #hex
        </Button>
        {copied && (
          <p className="confirmation-message">{hexCode} copied successfully!</p>
        )}
      </Box>
    </Box>
  );
}
