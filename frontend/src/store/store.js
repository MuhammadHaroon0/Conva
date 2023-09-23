import { create } from "zustand";
import axios from "axios";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import {produce} from 'immer'
import {  deepCopyWithAddition } from "../utils/deepcopy";
const socket = io("http://localhost:5000");

const useStore = create((set) => ({
  messages: [], //holding all the messages got from api call
  setMessages: (val) => {  //maintaining the immutability
    set((state) => {
      const index = state.messages.findIndex((item) => 
        (val.sender === item.sender && val.receiver === item.receiver) ||
        (val.sender === item.receiver && val.receiver === item.sender)
      );
      //getting the index where the chat is present in the array

      if (index !== -1) {
        // Using immer to update the state in an immutable way
        // console.log(val.messages[val.messages.length - 1])
        return produce(state, (draftState) => {
          draftState.messages[index].messages=[...draftState.messages[index].messages,val.messages[val.messages.length - 1]];
        });
      }

      return state; // No match found, return the current state
    });
  },

  setChats: (val) => 
    set((state) => {
      const added = deepCopyWithAddition(state.messages);
      added.push(val)
      return {
        messages: added,
      };
    }),//specifically used for add friend functionality it will use sockets

  setMessagesOnInitialRender: (val) => set({ messages: val }), //on reload with api call

  selected: undefined,
  setSelected: (val) => set({ selected: val }), //selecting the clicked chat

  currentUser: Cookies.get("jwt") || null, //user sending the messages
  setCurrentUser: (val) => set({ currentUser: val }),

  currentUserID: () => { //function for convenience to get current user id
    if (Cookies.get("jwt") === undefined || Cookies.get("jwt") === null)
      return 0;
    return jwt_decode(Cookies.get("jwt")).id;
  },

  postLoginData: async (loginData) => { //logging in the user
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login`,
        loginData,
        { withCredentials: true }
      );
      await useStore.getState().getUserImage(response.data.data.id);
    } catch (error) {
      throw error;
    }
  },
  postSignUpData: async (signupData) => {//signing up the user
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/users/signup`,
        signupData,
        { withCredentials: true }
      );
      set({ data: await response.data });
    } catch (error) {
      throw error;
    }
  },

  isLoggedIn: false, //used for logout and accesing of protected route
  setIsLoggedIn: (val) => {
    set({ isLoggedIn: val });
  },

  patchUpdatePicture: async (picture) => { //not used in the ui but can be added based on requirements
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}/users/`,
        picture,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  userImg: null, //current user image to display on the ui
  getUserImage: async (id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/user/${id}`,
        { responseType: "arraybuffer", withCredentials: true }
      );
      const fileBlob = new Blob([response.data]);
      set({ userImg: URL.createObjectURL(fileBlob) });
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  sendMessage: (data) => { //sending a single message to user 
    try {
      socket.emit("sendmsg", data);
    } catch (error) {
      console.log(error);
    }
  },
  addChat: (data) => { //adding a friend
    try {
      socket.emit("addChat", data);
    } catch (error) {
      console.log(error);
    }
  },

  getAllMessages: async (senderID) => { //reload api call
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/message/${senderID}`,
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
}));
export default useStore;
