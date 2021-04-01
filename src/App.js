import React from "react";
import "./App.css";
import styled from "styled-components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Chat, Header, Login, Sidebar } from "components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "firebaseConfig";
import Spinner from "react-spinkit";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <AppLoading>
        <AppLoadingContents>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Slack_Technologies_Logo.svg/1280px-Slack_Technologies_Logo.svg.png"
            alt="logo"
          />

          <Spinner name="three-bounce" color="purple" fadeIn="none" />
        </AppLoadingContents>
      </AppLoading>
    );
  }

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <>
          <Header user={user} />
          <AppBody>
            <Sidebar />
            <Switch>
              <Route path="/" exact>
                {/* CHAT */}
                <Chat />
              </Route>
            </Switch>
          </AppBody>
        </>
      )}
    </Router>
  );
}

export default App;

const AppBody = styled.div`
  display: flex;
  height: 100vh;
`;

const AppLoading = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
`;
const AppLoadingContents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
  text-align: center;

  > img {
    height: 100px;
    padding: 20px;
  }
`;
