import { create } from "zustand";
import axios from "axios";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import {produce} from 'immer'
import {  deepCopyWithAddition } from "../utils/deepcopy";
const socket = io("http://localhost:5000");

const useStore = create((set) => ({
  messages: [],
  setMessages: (val) => {
    set((state) => {
      const index = state.messages.findIndex((item) =>
        (val.sender === item.sender && val.receiver === item.receiver) ||
        (val.sender === item.receiver && val.receiver === item.sender)
      );

      if (index !== -1) {
        // Use immer to update the state in an immutable way
        console.log(val.messages[val.messages.length - 1])
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
    }),

  setMessagesOnInitialRender: (val) => set({ messages: val }),

  selected: undefined,
  setSelected: (val) => set({ selected: val }),

  currentUser: Cookies.get("jwt") || null,
  setCurrentUser: (val) => set({ currentUser: val }),
  currentUserID: () => {
    if (Cookies.get("jwt") === undefined || Cookies.get("jwt") === null)
      return 0;
    return jwt_decode(Cookies.get("jwt")).id;
  },

  postLoginData: async (loginData) => {
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
  postSignUpData: async (signupData) => {
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

  isLoggedIn: false,
  setIsLoggedIn: (val) => {
    set({ isLoggedIn: val });
  },

  patchUpdatePicture: async (picture) => {
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
  userImg: null,
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
  sendMessage: (data) => {
    try {
      socket.emit("sendmsg", data);
    } catch (error) {
      console.log(error);
    }
  },
  addChat: (data) => {
    try {
      socket.emit("addChat", data);
    } catch (error) {
      console.log(error);
    }
  },
  getAllMessages: async (senderID) => {
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
