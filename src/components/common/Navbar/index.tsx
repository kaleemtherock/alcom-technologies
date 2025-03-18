import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-blue-500" : "text-gray-700";

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Courses', href: '/courses' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <nav className="fixed w-full top-4 z-20 px-8">
      <div className="max-w-[90rem] mx-auto relative">
        {/* Floating Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-teal-900/50 via-cyan-900/50 to-teal-900/50 rounded-2xl blur"></div>
        
        {/* Main Navbar Container */}
        <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(13,148,136,0.37)] px-8 py-4">
          <div className="flex justify-between items-center">
            {/* Logo with Glow Effect */}
            <Link to="/" className="flex-shrink-0 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
              <img src="/images/alcom-logo.png" alt="Alcom Logo" className="h-12 relative" />
            </Link>

            {/* Search Bar with Animated Border */}
            <div className="hidden md:flex flex-1 max-w-xl mx-12">
              <div className="relative w-full group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="relative w-full px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:outline-none text-white placeholder-gray-400"
                />
                <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-400" />
              </div>
            </div>

            {/* Navigation Links with Hover Effects */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative text-base font-medium text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 
                    ${location.pathname === item.href ? "text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400" : ""}
                    after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-teal-400 after:to-cyan-400 hover:after:w-full after:transition-all after:duration-300`}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Auth Buttons with Gradient Effects */}
              <div className="flex items-center space-x-4">
                <Link to="/signin" className="text-white hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300">
                  Sign In
                </Link>
                <Link to="/signup" className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative px-4 py-2 rounded-lg bg-black block text-white group-hover:bg-black/50 transition duration-300">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu Button with Gradient */}
            <div className="flex md:hidden items-center space-x-4">
              <button onClick={() => setSearchOpen(!searchOpen)} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                <FaSearch className="relative text-white text-xl" />
              </button>
              <button onClick={() => setMenuOpen(!menuOpen)} className="relative group">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500"></div>
                {menuOpen ? <FaTimes className="relative text-white text-xl" /> : <FaBars className="relative text-white text-xl" />}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {searchOpen && (
            <div className="md:hidden px-4 pb-4 mt-4">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-500"></div>
                <input
                  type="text"
                  placeholder="Search courses..."
                  className="relative w-full px-4 py-2 rounded-lg bg-black/50 border border-white/20 focus:outline-none text-white placeholder-gray-400"
                />
              </div>
            </div>
          )}

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="relative group block"
                    onClick={() => setMenuOpen(false)}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                    <span className="relative block px-4 py-2 rounded-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400">
                      {item.name}
                    </span>
                  </Link>
                ))}
                <Link
                  to="/signin"
                  className="relative group block"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
                  <span className="relative block px-4 py-2 rounded-lg text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400">
                    Sign In
                  </span>
                </Link>
                <Link
                  to="/signup"
                  className="relative group block"
                  onClick={() => setMenuOpen(false)}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-500"></div>
                  <span className="relative block px-4 py-2 rounded-lg bg-black text-white group-hover:bg-black/50">
                    Sign Up
                  </span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;