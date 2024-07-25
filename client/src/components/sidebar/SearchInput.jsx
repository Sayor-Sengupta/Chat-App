import React, { useState } from "react";
import { LuMailSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import useConversation from "../../Zustand/useConversation";
import useGetConversation from "../../hooks/useGetConversation";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversation();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    if (search.length < 3) {
      return toast.error("search item must be atleast 3 characters long");
    }

    // const conversation = conversations.find((c)=> c.fulName.toLowerCase().includes(search.toLowerCase()))
    const conversation = conversations.find((c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("no such user found");
    }
  };
  
  return (
    <form className="flex items-center gap-2" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type here"
        className="input input-bordered w-full max-w-xs"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white ">
        <LuMailSearch className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;
