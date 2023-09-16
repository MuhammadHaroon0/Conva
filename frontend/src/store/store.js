import { create } from "zustand";
import axios from "axios";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import { deepCopyWithAddition } from "../utils/deepcopy";
const socket = io("http://localhost:5000");

const useStore = create((set, get) => ({
  messages: [],
  setMessages: (val) => {
    set((state) => {
      const res = state.messages.findIndex(
        (item) => item.receiver === val.receiver
      );
      let newSel
      if (res === -1) {
        state.messages.push(val);
      } else {
        state.messages[res].messages.push(
          val.messages[val.messages.length - 1]
        );
         newSel=deepCopyWithAddition(state.selected,val.messages[val.messages.length - 1])
      }console.log(state.selected);
      return {
        messages: state.messages,
        selected: newSel
      };
    });
  },

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
  getUserImage: async (name) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/image/user/${name}`,
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
