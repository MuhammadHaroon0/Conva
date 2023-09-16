import React from "react";
import useStore from "../store/store";

const SideChats = (props) => {
  const { item } = props;
  const setSelected = useStore((state) => state.setSelected);
  const currentUserID = useStore((state) => state.currentUserID);

  // console.log(item);
  const handleChatClick = () => {
    setSelected(item);
  };
  return (
    <div className="hover:bg-black hover:text-white" onClick={handleChatClick}>
      <div className="p-3 justify-center border-x border-b border-slate cursor-pointer text-white font-bold">
        {item.names && currentUserID() === item.sender
          ? item.names[1]
          : item.names[0]}
      </div>
    </div>
  );
};

export default SideChats;
