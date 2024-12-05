import { useState, useEffect } from "react";

export default function CopyToClipboard({ hexCode }) {
  const [copied, setCopied] = useState(false);

  async function handleCopyClick() {
    try {
      await navigator.clipboard.writeText(hexCode); // Using the Clipboard API to copy the hex code to the clipboard
      setCopied(true);
    } catch (error) {
      console.error("Failed to copy hex code: ", error);
    }
  }
  // useEffect hook to handle side effects when the 'copied' state changes
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => {
        setCopied(false); // Reset the copied state to false after 3 seconds
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <div>
      <button onClick={handleCopyClick}>copy #hex</button>
      {copied && (
        <p className="confirmation-message">{hexCode} copied successfully!</p>
      )}
    </div>
  );
}

/*
Summary of functionalities:
1. Uses Clipboard API to copy the provided hex code to the user's clipboard when a button is clicked.
2. Displays a confirmation message that lasts for 3 seconds to inform the user that the hex code was successfully copied.
3. Uses the copied state to track whether the copy action was successful and manages the timing of the confirmation message.

trivia:
Color.jsx: The CopyToClipboard component is used within the Color component to provide a copy functionality for the color's hex code. 
It receives the hexCode prop directly from the Color component, ensuring that the value displayed matches the color being shown.
hexCode: The prop hexCode represents the hex color value that needs to be copied, and it is passed down from the parent component (Color.jsx).
*/
