import React, { useEffect, useState } from "react";
import useStore from "../store/store";

const SideChats = (props) => {
  const { item,searchQuery } = props;
  // console.log(searchQuery);
  const setSelected = useStore((state) => state.setSelected);
  const currentUserID = useStore((state) => state.currentUserID);
  const [id,setId]=useState(undefined);
  useEffect(()=>{
    setId(currentUserID())
  },[])
  const handleChatClick = () => {
    setSelected(item);
  };
  return (
    <div className={`hover:bg-black hover:text-white ${item.names&&id===item.sender?(item.names[1].toLowerCase().includes(searchQuery)?"block":"hidden"):(item.names[0].toLowerCase().includes(searchQuery)?"block":"hidden")}`} onClick={handleChatClick}>
      <div className="p-3 justify-center border-x border-b border-slate cursor-pointer text-white font-bold">
        {item.names && id === item.sender //based on current user id showing the name of the receiver
          ? item.names[1]
          : item.names[0]}
      </div>
    </div>
  );
};

export default SideChats;
