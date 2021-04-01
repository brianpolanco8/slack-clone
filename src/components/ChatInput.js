import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { auth, db } from "firebaseConfig";
import firebase from "firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const ChatInput = ({ channelId, channelName, chatRef }) => {
  const [input, setInput] = useState("");
  const [user] = useAuthState(auth);

  const sendMessage = (e) => {
    e.preventDefault(); // Prevents refresh

    // if not channelId return
    if (!channelId) {
      return;
    }

    // submit message
    db.collection("rooms").doc(channelId).collection("messages").add({
      message: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef.current.scrollIntoView({
      behaviour: "smooth",
    });

    setInput("");
  };

  return (
    <ChatInputContainer>
      <form>
        <input
          placeholder={`Message #${channelName || "room"}`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
};

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }

  > form > input {
    /* padding:  */
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }

  > form > button {
    display: none !important;
  }
`;
