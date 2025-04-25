import "./App.css";
import Card from "./Card";

// MUI
import { createTheme, ThemeProvider } from "@mui/material";
import { Container } from "@mui/material";
const theme = createTheme({
  typography: {
    h6: {
      fontFamily: ["monospace"],
    }
  }
});
function App() {

  return (
    <ThemeProvider theme={theme}>
      <div className="App" style={{ backgroundColor: "#0048CA" , height: "100vh" , display: "flex" , justifyContent: "center" , alignItems: "center" }}>
        <Container maxWidth="sm">
          <Card />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default App;
