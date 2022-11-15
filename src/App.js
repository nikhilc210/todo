import "./App.css";
import { useState } from "react";
import Container from "@mui/material/Container";
import { CssBaseline } from "@mui/material";

import TodoListComponent from "./components/TodoListComponent";

function App() {
  return (
    <>
      <CssBaseline />
      <Container>
        <TodoListComponent />
      </Container>
    </>
  );
}

export default App;
