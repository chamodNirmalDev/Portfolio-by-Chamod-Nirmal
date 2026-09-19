/*main.jsx (හෝ index.jsx) ගොනුව මුළු React ව්‍යාපෘතියේම "එන්ජිම" හෙවත් ආරම්භක ස්ථානය ලෙස ක්‍රියා කරයි. මෙහි ප්‍රධාන පොදු කාර්යය වන්නේ ඔබ ලියන සියලුම සංකීර්ණ React කේත (App.jsx ඇතුළු සියල්ල) සාමාන්‍ය HTML වෙබ් පිටුවකට (index.html) සම්බන්ධ කර, එය බ්‍රවුසරයේ දර්ශනය වීමට අවශ්‍ය පරිසරය නිර්මාණය කිරීමයි.*/ 
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom' // මේ පේළිය අලුතින් එකතු කළා

// createRoot(document.getElementById('root')).render(...): React යෙදුම HTML ගොනුවට සම්බන්ධ කරන ප්‍රධාන පාලකය මෙයයි. යටිපෙළෙහි ක්‍රියාත්මක වන index.html ගොනුවේ ඇති <div id="root"></div> නම් හිස් කොටස සොයාගෙන, සම්පූර්ණ වෙබ් අඩවියම එම කොටස ඇතුළට ගොඩනැගීම මෙයින් සිදු කරයි.
createRoot(document.getElementById('root')).render(
  // <StrictMode>: මෙය React විසින් ලබා දෙන සංවර්ධන ආවරණයකි (Development tool). මෙයින් වෙබ් අඩවියේ පෙනුමට කිසිදු බලපෑමක් නොවන නමුත්, කේතය ක්‍රියාත්මක වීමේදී ඇතිවිය හැකි සැඟවුණු දෝෂ (Bugs) සහ යල් පැන ගිය කේත භාවිතයන් කල්තියා හඳුනාගෙන Console එක හරහා අනතුරු අඟවයි.
  <StrictMode>
    {/*<BrowserRouter>: වෙබ් අඩවියේ ලිපින (URLs) කළමනාකරණය කරන පද්ධතිය මෙයයි. මෙය <App/> එක වටා යෙදීමෙන්, වෙබ් අඩවිය Reload නොවී ක්ෂණිකව විවිධ පිටු අතර (උදාහරණයක් ලෙස ප්‍රධාන පිටුවේ සිට /admin වෙත) මාරු වීමේ හැකියාව මුළු යෙදුමටම ලබා දෙයි.*/}
    <BrowserRouter>
      {/*<App/>: මෙය ඔබගේ සම්පූර්ණ වෙබ් අඩවිය අඩංගු ප්‍රධානම Component එකයි. Navbar, Portfolio කොටස්, සහ අලුතින් හැදූ Admin පිටුව යන සියල්ල තබාගෙන සිටින්නේ මෙම කොටස ඇතුළතයි.  */}
      <App />
    </BrowserRouter>
  </StrictMode>,
)
