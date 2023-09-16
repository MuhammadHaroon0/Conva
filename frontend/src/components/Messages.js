import React from "react";
import useStore from "../store/store";

const Messages = () => {
  const selected = useStore((state) => state.selected);
  return (
    <>
      {selected.messages.map((item) => (
        <div className="w-fit rounded-lg bg-white p-2">
          <p className="">{item.text}</p>
        </div>
     ))}
    </>
  );
};

export default Messages;
