import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Navbar from './components/NavBar';
import Hero from './components/Hero';

const App = () => {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
      offset: 100
    });
    document.documentElement.classList.add('dark');
  }, []);

  useEffect(() => {
    AOS.refresh()
  }, [darkMode])

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle('dark');
  }
  return (
    <div className={
      darkMode
        // Dark Mode සක්‍රිය විට: තද අළු (gray-950) සිට තද Teal සහ Emerald (කොළ පැහැයට හුරු) වර්ණයක් දක්වා විහිදෙන පසුබිම
        ? "bg-linear-to-br from-gray-950 via-teal-950 to-emerald-900 min-h-screen"
        // Light Mode සක්‍රිය විට: ලා අළු (gray-50) සිට ලා Teal සහ Emerald දක්වා විහිදෙන පසුබිම
        : "bg-linear-to-br from-gray-50 via-teal-100 to-emerald-300 min-h-screen"
    }>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero/>
    </div>
  )
}

export default App