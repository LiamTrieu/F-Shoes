import { RouterProvider } from "react-router-dom";
import router from "./routers/router";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

function App() {
  const themeApp = createTheme({
    typography: { fontFamily: "Open Sans" },
  });

  return (
    <div className="App">
      <ThemeProvider theme={themeApp}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </div>
  );
}

export default App;
