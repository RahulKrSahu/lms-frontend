import React from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import App from "./App";
import theme from "./styles/theme";

const container = document.getElementById("root");

if (!container) {
  console.error(
    "Root container element with id 'root' not found in index.html."
  );
} else {
  const root = createRoot(container);

  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </React.StrictMode>
  );
}
