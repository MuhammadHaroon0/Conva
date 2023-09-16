import React, { useEffect, useState } from "react";
import logo from './../resources/logo.svg'
import { Link , useNavigate } from 'react-router-dom'
import notify from "./toast";
import useStore from "./../store/store";
import LoadingBar from "react-top-loading-bar";
const Login = () => {

    const isLoggedIn = useStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useStore((state) => state.setIsLoggedIn);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();
  const postLoginData = useStore((state) => state.postLoginData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !loginData.email ||
      !loginData.password ||
      !document.getElementById("email").checkValidity()
      ) {
        notify("Please enter correct email and password");
        return;
      }
    try {
      setProgress(80);
      await postLoginData(loginData);
      setProgress(100);
    } catch (error) {
      setProgress(100);
      notify("Wrong Email or Password");
      return;
    }
    setIsLoggedIn(true);
    notify("Logged In successfully");
    navigate("/");
  };

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  });

  return (
    <div>
    <LoadingBar
      color="#f11946"
      progress={progress}
      onLoaderFinished={() => setProgress(0)}
    />
    <section className="bg-gray-50 dark:bg-gray-900">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          <img className="w-16 h-10 mr-2" src={logo} alt="logo"/>
          Conva    
      </a>
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login
              </h1>
              <form className="space-y-4 md:space-y-6">
                  <div>
                      <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input type="email" name="email"  value={loginData.email} onChange={(e) => handleChange(e)} id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required/>
                  </div>
                  <div>
                      <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password" name="password"  value={loginData.password} onChange={(e) => handleChange(e)} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
                  </div>
                 
                 
                  <button type="submit" onClick={handleSubmit} className="w-full text-white bg-orange hover:bg-slate focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Login</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Don't have an account? <Link to="/signup" className="font-medium text-orange hover:underline dark:text-primary-500">SignUp here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
  </div>
  )
}

export default Login
