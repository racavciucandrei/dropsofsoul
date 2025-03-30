import React, { useState } from 'react';
import { ModeToggle } from './ModeToggle';
import AuthNavItems from './AuthNavItems';
import ProfileDropdown from './ProfileDropdown';
import { useAuth } from '@/context/AuthProvider';
import { Link } from 'react-router-dom';
import ShoppingCart from './ShoppingCart';  // Fixed import statement
import LightSwitch from './LightSwitch';

const Navbar = () => {
  const { user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-slate-800 p-4 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <Link to="/" className="text-2xl font-bold text-gray-800 dark:text-white">
          Drops of Soul
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-600 dark:text-gray-300 focus:outline-none"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/products" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            Products
          </Link>
          <Link to="/about" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors">
            Contact
          </Link>
          <ShoppingCart />
          <ModeToggle />
          <LightSwitch />
          <AuthNavItems />
          {user && <ProfileDropdown />}
        </div>
      </div>

      {/* Mobile Menu (Hidden by default) */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'none'}`}>
        <div className="bg-gray-100 dark:bg-slate-700 p-4 rounded mt-2">
          <Link to="/products" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2">
            Products
          </Link>
          <Link to="/about" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2">
            About
          </Link>
          <Link to="/contact" className="block text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors py-2">
            Contact
          </Link>
          <div className="py-2">
            <ShoppingCart />
          </div>
          <div className="py-2">
            <ModeToggle />
          </div>
          <div className="py-2">
            <LightSwitch />
          </div>
          <div className="py-2">
            <AuthNavItems />
          </div>
          {user && (
            <div className="py-2">
              <ProfileDropdown />
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
