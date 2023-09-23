import React, { useEffect, useState } from "react";
import useStore from "../store/store";


const Messages = () => {
  const selected = useStore((state) => state.selected);
  const messages = useStore((state) => state.messages);
  const [current,setCurrent]=useState(selected);

  const currentUserID = useStore((state) => state.currentUserID);
  useEffect(() => {
    // based on selected chat finding the messages
      const cur=messages.find((item)=>(item.sender===selected.sender && item.receiver===selected.receiver )
      ||(item.sender===selected.receiver && item.receiver===selected.sender ))
      if(cur!==-1)
     setCurrent(cur) 
    
  }, [messages,selected]);

  return (

    <>
      {current.messages.map((item, index) => (
  <div
    key={item.id} // Replace 'id' with the actual unique identifier of the message
    className={`p-2 ${
      index === 0
        ? 'w-full text-center text-white bg-[#e88922]' // Style for the first message
        : item.from === currentUserID()
        ? 'm-2 w-fit rounded-lg self-end text-white bg-black'
        : 'm-2 w-fit rounded-lg self-start bg-white'
    }`}
  >
    <p className="">{item.text}</p>
  </div>
))}
    </>
  );
};

export default Messages;
