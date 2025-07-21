import { useState } from "react";
import { motion as _motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/logo2.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../Context/User/UserContext";

export default function Navbar() {
  let { userLogin, setuserLogin } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  function signoutFunc() {
    localStorage.removeItem("userToken");
    setuserLogin(null);
    navigate("/login");
  }

  return (
    <_motion.nav
      initial={{ transform: "translateX(-500px)" }}
      animate={{ transform: "translateX(0px)" }}
      transition={{ type: "spring" }}
      duration={0.5}
      className='bg-slate-50 fixed top-0 left-0 w-full border-gray-200 z-50'
    >
      <div className='flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4'>
        {/* Logo */}
        <div className='flex items-center space-x-3 rtl:space-x-reverse'>
          <Link to='/'>
            <img src={logo} className='h-8' alt='Azam-Logo' />
          </Link>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className='md:hidden cursor-pointer text-gray-700 focus:outline-none text-2xl'
        >
          <i className='fa-solid fa-bars'></i>
        </button>

        {/* Desktop Nav */}
        <div className='hidden md:flex items-center gap-6'>
          {userLogin ? (
            <ul className='flex gap-3'>
              <li>
                <NavLink className='hover:text-blue-400' to='/'>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className='hover:text-blue-400' to='/cart'>
                  Cart
                </NavLink>
              </li>
              <li>
                <NavLink className='hover:text-blue-400' to='/products'>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink className='hover:text-blue-400' to='/categories'>
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink className='hover:text-blue-400' to='/brands'>
                  Brands
                </NavLink>
              </li>
            </ul>
          ) : null}
        </div>

        {/* Desktop Right Side */}
        <div className='hidden md:flex items-center space-x-6 rtl:space-x-reverse'>
          <ul className='flex gap-3 text-xl'>
            <li>
              <i className='fa-brands fa-instagram hover:text-blue-400'></i>
            </li>
            <li>
              <i className='fa-brands fa-facebook hover:text-blue-400'></i>
            </li>
            <li>
              <i className='fa-brands fa-tiktok hover:text-blue-400'></i>
            </li>
            <li>
              <i className='fa-brands fa-twitter hover:text-blue-400'></i>
            </li>
            <li>
              <i className='fa-brands fa-youtube hover:text-blue-400'></i>
            </li>
          </ul>
          {userLogin != null ? (
            <span
              onClick={signoutFunc}
              className='hover:text-blue-400 text-sm cursor-pointer'
            >
              SignOut
            </span>
          ) : (
            <>
              <NavLink className='hover:text-blue-400 text-sm' to='/login'>
                Login
              </NavLink>
              <NavLink className='hover:text-blue-400 text-sm' to='/register'>
                Register
              </NavLink>
            </>
          )}
        </div>

        {/* Mobile Dropdown with Animation */}
        <AnimatePresence>
          {isOpen && (
            <_motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className='w-full mt-4 md:hidden overflow-hidden space-y-3 text-center'
            >
              {userLogin ? (
                <>
                  <ul className='space-y-2'>
                    <li>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        className='block hover:text-blue-400'
                        to='/'
                      >
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        className='block hover:text-blue-400'
                        to='/cart'
                      >
                        Cart
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        className='block hover:text-blue-400'
                        to='/products'
                      >
                        Products
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        className='block hover:text-blue-400'
                        to='/categories'
                      >
                        Categories
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        onClick={() => setIsOpen(false)}
                        className='block hover:text-blue-400'
                        to='/brands'
                      >
                        Brands
                      </NavLink>
                    </li>
                  </ul>
                </>
              ) : null}

              <div className='flex justify-center gap-4 text-xl'>
                <i className='fa-brands fa-instagram hover:text-blue-400'></i>
                <i className='fa-brands fa-facebook hover:text-blue-400'></i>
                <i className='fa-brands fa-tiktok hover:text-blue-400'></i>
                <i className='fa-brands fa-twitter hover:text-blue-400'></i>
                <i className='fa-brands fa-youtube hover:text-blue-400'></i>
              </div>

              <div className='space-x-4 text-sm'>
                {userLogin != null ? (
                  <span
                    onClick={() => {
                      setIsOpen(false);
                      signoutFunc();
                    }}
                    className='hover:text-blue-400 cursor-pointer'
                  >
                    SignOut
                  </span>
                ) : (
                  <>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      className='hover:text-blue-400'
                      to='/login'
                    >
                      Login
                    </NavLink>
                    <NavLink
                      onClick={() => setIsOpen(false)}
                      className='hover:text-blue-400'
                      to='/register'
                    >
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </_motion.div>
          )}
        </AnimatePresence>
      </div>
    </_motion.nav>
  );
}
