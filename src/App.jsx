// App.jsx ගොනුව තමයි ඔබගේ වෙබ් අඩවියේ "ප්‍රධාන පාලක මැදිරිය" (Main Controller). වෙබ් අඩවියට එන කෙනෙකුට මොනවාද පෙන්වන්නේ, සහ වෙබ් අඩවියේ වර්ණ (Dark/Light) වෙනස් වෙන්නේ කොහොමද යන්න සියල්ල තීරණය කරන්නේ මෙතැනිනි.
import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Routes, Route } from 'react-router-dom'; // අලුතින් එක් කළා

import Navbar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Certificate from './components/Certificates';
import Project from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin පිටුව (අපි ඊළඟට නිර්මාණය කරනවා)
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';

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
        ? "bg-linear-to-br from-gray-950 via-teal-950 to-emerald-900 min-h-screen text-white"
        : "bg-linear-to-br from-gray-50 via-teal-100 to-emerald-300 min-h-screen text-gray-900"
    }>
      {/* මේක හරියට මංසන්ධියක (Junction) ඉන්න රථවාහන පාලකවරයෙක් වගේ. වෙබ් අඩවියට එන කෙනා මොන පාරෙන්ද (URL එකෙන්ද) එන්නේ කියලා බලාගෙන ඉඳලා, එයාව හරියටම අදාළ තැනට යොමු කරන එකයි මේකෙන් කරන්නේ. මේ ටැගය ඇතුළේ තමයි අපි අපේ පාරවල් (Routes) ඔක්කොම ලියන්නේ. */}
      <Routes>
        {/* ප්‍රධාන වෙබ් අඩවියේ පාර
              path="/" : මේකෙන් කියන්නේ වෙබ් අඩවියේ ප්‍රධානම ලිපිනයයි (උදා: portfolio-by-chamod-nirmal.vercel.app). කවුරුහරි මේ ලින්ක් එකෙන් ආවොත් පෙන්වන්න ඕනේ මොනවද කියන එක අපි element={...} කියන එක ඇතුළේ දෙනවා.
              <> ... </> (React Fragment): මෙතැන <Navbar/> ඉඳන් <Footer/> එක දක්වා කොටස් ගොඩක් තියෙනවනේ. React වල නීතියක් තියෙනවා එක Route එකකට දෙන්න පුළුවන් එක ප්‍රධාන කොටසක් විතරයි කියලා. ඒ නිසා අපි මේ හිස් ටැග් එකක් (<> </>) පාවිච්චි කරලා අර ඔක්කොම Components ටික එකම පාර්සලයක් වගේ එකට ඔතලා (Wrap කරලා) දීලා තියෙනවා.
              ප්‍රතිඵලය: සාමාන්‍ය කෙනෙක් වෙබ් අඩවියට ආවම එයාට Navigation බාර් එකේ ඉඳන් පහළම තියෙන Footer එක වෙනකම් සම්පූර්ණ Portfolio එකම ලස්සනට පිළිවෙලට පේනවා. */}
        <Route path="/" element={
          <>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Hero />
            <About />
            <Skills />
            <Certificate />
            <Project />
            <Contact />
            <Footer />
          </>
        } />

        {/* රහසිගත Admin පාර
              path="/admin" : කවුරුහරි URL එක අගට /admin කියලා ටයිප් කළොත් හෝ අර Footer එකේ තියෙන අගුල ක්ලික් කළොත්, එයා එන්නේ මේ පාරටයි. 
              element={<AdminLogin/>} : මෙතැනදී අපි දීලා තියෙන්නේ <AdminLogin/> කියන අලුතින් හදපු Component එක විතරයි. ඔයාට පේනවා ඇති මෙතන <Navbar/> වත් <Footer/> වත් වෙන මුකුත්වත් නැහැ.
              ප්‍රතිඵලය: ඔයා Admin පිටුවට ගියාම, අර ප්‍රධාන වෙබ් අඩවියේ තිබ්බ කිසිම දෙයක් පේන්නේ නැහැ. සම්පූර්ණයෙන්ම හිස් තිරයක ඔයාගේ "Admin Portal" කියන කොටු පෙනුම (Login Form එක) විතරක් දිස්වෙනවා.*/}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
      </Routes>
      {/* සාරාංශය:
මේ කේතයෙන් වෙබ් අඩවිය ප්‍රධාන කොටස් දෙකකට වෙන් කරනවා. එකක් හැමෝටම පේන Portfolio එක, අනිත් එක ඔයාට විතරක් ලොග් වෙන්න පුළුවන් Admin ලොගින් පිටුව. මේ දෙක එකිනෙකාට බාධා කරගන්නේ නැතුව වැඩ කරන්නේ මේ කේතය නිසයි. */}
    </div>
  )
}

export default App