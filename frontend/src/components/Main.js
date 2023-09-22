import React, { useEffect, useRef } from "react";
import SideChats from "./SideChats";
import logo from "./../resources/logo.svg";
import ChatForm from "./ChatForm";
import Messages from "./Messages";
import Navbar from "./Navbar";
import Modal from "./Modal";
import useStore from "../store/store";
import io from "socket.io-client";
import Welcome from "./Welcome";
const socket = io("http://localhost:5000");

const Main = () => {
  const scrollableDivRef = useRef(null);

  const setMessages = useStore((state) => state.setMessages);
  const setChats = useStore((state) => state.setChats);
  const setMessagesOnInitialRender = useStore(
    (state) => state.setMessagesOnInitialRender
  );
  const messages = useStore((state) => state.messages);
  const currentUserID = useStore((state) => state.currentUserID);
  const selected = useStore((state) => state.selected);
  const getAllMessages = useStore((state) => state.getAllMessages);

    useEffect(() => {
      scrollableDivRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, [messages]); 

    

  useEffect(() => {
    const func = async () => {
      try {
        const id = currentUserID();
        const response = await getAllMessages(id);
        setMessagesOnInitialRender(response.data.data.doc);
      } catch (error) {
        console.log(error);
      }
    };
    func();
  }, []);

  useEffect(() => {
    const handleReceivedMessage = (newMessage) => {
      // console.log("klk");
      const id = currentUserID();
      if (id === newMessage.sender || id === newMessage.receiver) {
        setMessages(newMessage);
      }
    };
  
    socket.on("recmsg", handleReceivedMessage);
  
    // Cleanup function to unsubscribe from the event when the component unmounts
    return () => {
      socket.off("recmsg", handleReceivedMessage);
    };
  }, []);
  
  useEffect(() => {
    const handleReceivedChats=(newChat => {
      const id = currentUserID();
      if (
        id === newChat.sender ||
        id === newChat.receiver
        ) {
        setChats(newChat);
      }
    });

    socket.on("recChat", handleReceivedChats)

    return () => {
      socket.off("recChat", handleReceivedChats);
    };
  }, []);

  const selectedChat = () => {
    if (selected && currentUserID() === selected.sender) {
      return selected.names[1];
    } else if (selected) {
      return selected.names[0];
    }
    return "Select a chat to send message";
  };

  return (
    <>
      <div className="h-100 min-h-screen">
        <Navbar />
        <Modal />
        <div className="px-2 py-8 max-w-90 flex flex-col md:flex-row">
          <div className="flex flex-col p-4 w-1/3">
            <div class="search mb-4">
              <i class="fa fa-search"></i>
              <input type="text" class="form-control" placeholder="Search" />
            </div>
            <div className="flex flex-row  mb-2  justify-between items-center">
              <h1 className="font-bold text-white">Chats</h1>
              <button
                className="p-1 px-2 text-white bg-[#e88922] hover:bg-[#e88100] rounded-full"
                // onClick={setModal(true)}
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                Add Friend
              </button>
            </div>
            <div className="border-white border-t flex flex-col">
              {messages.map((item) => (
                <SideChats item={item} />
              ))}
            </div>
          </div>
          <div className={`flex flex-col w-2/3  ${selected&&'border border-white'}`}>
            {selected&&<div className="py-3 px-12 flex space-x-4 items-center border-white border-b">
              <img src={logo} className="w-10" alt="as" />
              <h1 className="text-white font-bold">{selectedChat()}</h1>
            </div>}
            <div className={`pb-2 relative flex flex-col min-h-[21.3rem] max-h-[21.3rem] ${selected&&'overflow-y-auto'}`} ref={scrollableDivRef}>
              {selected && messages.length > 0 ? <Messages />:<Welcome/>}
            </div>
            <div className="flex flex-col">
              {selected&&<ChatForm />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
