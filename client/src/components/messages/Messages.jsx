import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../hooks/useGetMessage";
import MessageSkeleton from "../skeletons/MessageSkeleton.jsx";
import userListenMessages from "../../hooks/userListenMessages.js";

const Messages = () => {
  const { messages, loading } = useGetMessage();
  // console.log(loading);
  userListenMessages();
  console.log("messages: ", messages);
  const LastMessageRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      LastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);
  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading &&
        messages.length > 0 &&
        messages.map((message) => (
          <div key={message._id} ref={LastMessageRef}>
            <Message message={message} />
          </div>
        ))}{" "}
      {!loading && messages.length === 0 && (
        <p className="text-center">
          {" "}
          Send a message to start the conversation{" "}
        </p>
      )}
      
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
    </div>
  );
};

export default Messages;
