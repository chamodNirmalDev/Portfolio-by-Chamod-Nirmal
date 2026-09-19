import React from 'react';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white/10 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-md">
        
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600 dark:text-emerald-400">
          Admin Portal
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-teal-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input 
              type="password" 
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-teal-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter password"
            />
          </div>

          <button 
            type="submit" 
            className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
            Login to Dashboard
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-teal-400 transition-colors">
            &larr; Back to Portfolio
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminLogin;