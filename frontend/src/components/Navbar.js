import { useState } from "react";
import { Link } from "react-router-dom";
import logo from './../resources/logo.svg'
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import useStore from '../store/store'

export default function Navbar() {
  const [currentUser, setCurrentUserr] = useState(true);
  const setIsLoggedIn=useStore(state=>state.setIsLoggedIn)
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("jwt");
    setCurrentUser(undefined)
    setIsLoggedIn(false);
    navigate("/login");
  };
  return (
    <>
      <nav className="md:px-24 sm:px-4 py-2.5 bg-gray-50 border-gray-200 dark:bg-gray-800 dark:border-gray-700 text-gray-900 text-sm rounded border dark:text-white">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <Link to="/" className="flex">
            <img src={logo} alt="" className="w-1/4"/>
          </Link>
          <div className="flex space-x-6">

            {currentUser && (
              <>
                

                <Link
                  to="/profile"
                  className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none rounded-full text-sm p-2.5"
                >
                  <img
                    className="h-8 w-8 rounded-full"
                    src={logo}
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