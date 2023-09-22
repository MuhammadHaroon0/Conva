import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from './../resources/logo.svg'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import useStore from '../store/store'

export default function Navbar() {
  const [currentUser, setCurrentUserr] = useState(true);
  const setIsLoggedIn=useStore(state=>state.setIsLoggedIn)
  const setSelected=useStore(state=>state.setSelected)
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  const userImg = useStore((state) => state.userImg);
  const getUserImage = useStore((state) => state.getUserImage);
  useEffect(() => {
    const getImage = async () => {
      try {
        const jwt = Cookies.get("jwt");
        const id = jwtDecode(jwt).id;
        if (!userImg) {
          await getUserImage(id);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getImage();
  }, [getUserImage, userImg]);
  
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    setCurrentUser(undefined)
    setSelected(undefined)
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <nav className="md:px-24 sm:px-4 py-2.5 bg-white text-gray-900 text-sm">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex">
            <img src={logo} alt="" className="w-1/4"/>
          </Link>
          <div className="flex space-x-6">

            {currentUser && (
              <>
                

                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm"
                >
                  <img
                    className="h-12 w-12 rounded-full"
                    src={userImg}
                    alt=""
                  />
                </Link>
                <button
                  className="text-white dark:text-gray-400 hover:bg-[#e88100] dark:hover:bg-gray-700 focus:outline-none rounded-lg px-4 bg-orange "
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}