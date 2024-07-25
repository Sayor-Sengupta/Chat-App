import React from "react";
import Conversation from "./Consersation.jsx";
import useGetConversation from "../../hooks/useGetConversation.js";
import { getRandomEmoji } from "../../utils/emoji.js";

const Conversations = () => {
  const { loading, conversations } = useGetConversation();
  console.log("conversation", conversations);

  return (
    <div className="py-2 flex flex-col overflow-auto">
      {conversations.map((conversation, idx) => (
        <Conversation
          key={conversation._id}
          conversation={conversation}
          emoji={getRandomEmoji()}
          lastIdx={idx === conversations.length - 1}
        />
      ))}
      {loading ? (
        <span className="loading loading-spinner mx-auto"> </span>
      ) : null}
    </div>
  );
};

export default Conversations;
