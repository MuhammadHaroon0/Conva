import { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { EmojiHappyIcon } from "@heroicons/react/solid";
import Picker from "emoji-picker-react";
import useStore from './../store/store'
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export default function ChatForm() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const sendMessage=useStore(state=>state.sendMessage)
  const selected = useStore((state) => state.selected);

  const [decoded,setDecoded]=useState(undefined);
  useEffect(() => {
    setDecoded(jwt_decode(Cookies.get('jwt')))
  }, []);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [showEmojiPicker]);

  const handleEmojiClick = ( emojiObject) => {
    let newMessage = message + emojiObject.emoji;
    setMessage(newMessage);
  };
 

  const handleFormSubmit =  (e) => {
    e.preventDefault();

    sendMessage({message:{text:message,from:decoded.id},sender:decoded.id,user1:selected.receiver,user2:selected.sender})
    setMessage("");
  };

  return (
    <div ref={scrollRef}>
      <div className="absolute bottom-24">
      {showEmojiPicker && (
        <Picker className="dark:bg-gray-900" height={300} onEmojiClick={handleEmojiClick} />
        )}

      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center justify-between w-full p-3 border-y border-slate">
          <button
            onClick={(e) => {
              e.preventDefault();
              setShowEmojiPicker(!showEmojiPicker);
            }}
          >
            <EmojiHappyIcon
              className="h-7 w-7 text-blue-600 dark:text-blue-500"
              aria-hidden="true"
            />
          </button>

          <input
            type="text"
            placeholder="Write a message"
            className="block w-full py-2 pl-4 mx-3 outline-none bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button type="submit">
            <PaperAirplaneIcon
              className="h-6 w-6 text-blue-600 dark:text-blue-500 rotate-[90deg]"
              aria-hidden="true"
              
            />
          </button>
        </div>
      </form>
    </div>
  );
}