import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Container from "@mui/material/Container";
import React from "react";

import LoginForm from "./components/LoginForm";

const App = () => {
  return (
    <div className="App">
      <Container maxWidth="sm">
        <LoginForm />
      </Container>
    </div>
  );
};

export default App;
