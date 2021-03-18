import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styled from "styled-components";
import { db } from "firebaseConfig";
import firebase from "firebase";

const ChatInput = ({ channelId, channelName, chatRef }) => {
  const [input, setInput] = useState("");

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
      user: "Brian",
      userImage:
        "https://media-exp1.licdn.com/dms/image/C4E03AQFXDb1nvgzL1Q/profile-displayphoto-shrink_200_200/0/1516367547155?e=1619049600&v=beta&t=5Af8NNWEeqNiUkB4VxWNeLnsvAbO0GU6zHWwHsDxQlk",
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
