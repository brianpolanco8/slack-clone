import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Header, Sidebar } from "components";

function App() {
  return (
    <Router>
      <>
        <Header />
        <AppBody>
          <Sidebar />
          <Switch>
            <Route path="/" exact>
              {/* CHAT */}
            </Route>
          </Switch>
        </AppBody>
      </>
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;
