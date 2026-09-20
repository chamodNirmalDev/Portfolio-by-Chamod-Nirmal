// මෙය React හි ප්‍රධාන "එන්ජිම" හෙවත් මූලික පුස්තකාලය ගෙන්වා ගැනීමයි.කේතය React Component එකක් ලෙස බ්‍රවුසරයට හඳුනා ගැනීමට සහ ක්‍රියාත්මක වීමට මෙම මූලික ගොනුව අත්‍යවශ්‍ය වේ.
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
/*මෙහිදී වෙබ් අඩවියේ පිටු අතර මාරු වීම පාලනය කරන react-router-dom නම් පැකේජයෙන් විශේෂිත මෙවලම් දෙකක් පමණක් වෙන් කර ගෙන්වා ගනී
    Link: මෙය සාමාන්‍ය වෙබ් අඩවියක ඇති <a> (anchor) ලින්ක් එකට සමාන වේ. නමුත් මෙහි ඇති ප්‍රධානතම විශේෂත්වය වන්නේ, මෙය හරහා වෙනත් පිටුවකට (උදා: "Back to Portfolio" ලින්ක් එක හරහා) යාමේදී මුළු වෙබ් පිටුවම Refresh නොවීමයි.
    useNavigate: මෙය React වල ඇති විශේෂිත Hook එකකි (ක්‍රියාකාරකමකි). යම් යෙදවුමක් වූ වහාම පරිශීලකයාව වෙනත් පිටුවකට ස්වයංක්‍රීයව යැවීමට (Redirect කිරීමට) මෙය භාවිතා කරයි. ඔබගේ කේතයේදී ෆෝම් එක Submit කළ වහාම (ලොගින් බොත්තම එබූ වහාම) Dashboard එකට යැවීම සඳහා පාවිච්චි කර ඇත්තේ මෙම මෙවලමයි.*/
import { Link, useNavigate } from 'react-router-dom';

const AdminLogin = () => {

  /*"කේතය (Code) හරහා වෙනත් පිටුවකට යාමේ බලය" ලබා ගැනීමයි.
      <Link> එකක් පාවිච්චි කිරීම (බස් එකක යනවා වගේ):ඔයාගේ කේතයේ පහළම තියෙන "Back to Portfolio" යන්න හදලා තියෙන්නේ <Link> එකක් හරහායි. ඒක හරියට බස් එකක යනවා වගේ වැඩක්. කවුරුහරි ඒක ක්ලික් කළොත්, වෙන මුකුත් බලන්නේ නැහැ කෙලින්ම අදාළ තැනට (Portfolio එකට) අරගෙන යනවා.
      useNavigate() පාවිච්චි කිරීම (ටැක්සි එකක් වගේ):ලොගින් වෙන කොටසට අපිට එහෙම නිකන්ම ලින්ක් එකක් දීලා හරියන්නේ නැහැනේ. අපි බලන්න ඕනේ කෙනා ගහපු Username එකයි Password එකයි හරිද කියලා. අන්න ඒ වෙලාවට මේ navigate එක හරියට ටැක්සි එකක් වගේ වැඩ කරනවා.ඔයාට පුළුවන් කේතය ඇතුළේ කොන්දේසියක් දාන්න: "පාස්වර්ඩ් එක හරි නම් විතරක් මාව /admin/dashboard එකට අරන් යන්න ( navigate('/admin/dashboard') )" කියලා.
    මේ පේළිය හරහා අර ටැක්සිය (navigate) Component එක ඇතුළට ගෙන්වාගෙන තියෙනවා. ඊට පස්සේ ලොගින් බොත්තම එබුවම ක්‍රියාත්මක වෙන handleLogin ෆන්ක්ෂන් එක ඇතුළේදී, ඒ ටැක්සියට කතා කරලා කෙලින්ම Dashboard එකට යන්න කියලා උපදෙස් දීලා තියෙනවා.*/
  const navigate = useNavigate();

  /*Component එක ඇතුළේ යම්කිසි දත්තයක් තාවකාලිකව මතක තියාගන්න එකයි.
      useState(false): මේක React වලින් දෙන විශේෂ මෙවලමක් (Hook එකක්). මෙතන වරහන් ඇතුළේ තියෙන false කියන්නේ ආරම්භක අගයයි (Initial value). එනම් වෙබ් පිටුව ලෝඩ් වෙද්දී පාස්වර්ඩ් එක මුලින්ම පෙන්වන්නේ නැත (false) කියන එකයි.
      showPassword: මේක තමයි අර දත්තය ගබඩා කරගෙන ඉන්න පෙට්ටිය (Variable). දැනට මේක ඇතුළේ තියෙන්නේ false කියන අගයයි. අපි Password Input කොටුවේ type එක (text ද, password ද යන්න) තීරණය කරන්න පාවිච්චි කරන්නේ මේ පෙට්ටිය ඇතුළේ තියෙන අගයයි.
      setShowPassword: මේක තමයි අර showPassword පෙට්ටියේ තියෙන අගය වෙනස් කරන්න අපිට දීලා තියෙන රිමෝට් කන්ට්‍රෝල් එක (Function එක). අපිට පාස්වර්ඩ් එක පෙන්වන්න ඕනේ වුණාම setShowPassword(true) කියලා දුන්නම, අර පෙට්ටියේ අගය ස්වයංක්‍රීයවම true වෙනවා.*/ 
  const [showPassword, setShowPassword] = useState(false);

  /*පරිශීලකයා "Login to Dashboard" බොත්තම එබූ විට (නැතහොත් ෆෝම් එක Submit කළ විට) ක්‍රියාත්මක වන ප්‍රධාන ක්‍රියාවලිය.
      const handleLogin = (e) => { ... } : මෙය 'Arrow Function' එකකි. මෙහි ඇති e අකුරෙන් නියෝජනය කරන්නේ Event (සිදුවීම) යන්නයි. එනම් යමෙකු ෆෝම් එක Submit කිරීම නැමැති සිදුවීමයි. ඒ සිදුවීමට අදාළ සියලුම විස්තර මේ e අකුර හරහා අල්ලා ගනී.
      e.preventDefault(); : මෙය මෙහි ඇති ඉතාමත් වැදගත් පේළියකි. සාමාන්‍යයෙන් අන්තර්ජාලයේ ඇති HTML form එකක් Submit කළාම මුළු වෙබ් පිටුවම සම්පූර්ණයෙන්ම Refresh (Reload) වෙනවා. නමුත් React කියන්නේ Single Page Application එකක් නිසා අපි පිටුව Refresh වෙනවට කොහෙත්ම කැමති නැහැ. මේ පේළියෙන් කරන්නේ අන්න ඒ සාමාන්‍ය විදිහට පිටුව Refresh වෙන (Default behavior) එක බලහත්කාරයෙන්ම නතර කරන එකයි.
      navigate('/admin/dashboard'); : පිටුව Refresh වීම නැවැත්වූවාට පසුව, කිසිම ප්‍රමාදයකින් තොරව ක්ෂණිකවම පරිශීලකයාව අපි කලින් ලබාගත් navigate නැමැති ටැක්සිය හරහා /admin/dashboard කියන අලුත් පිටුවට (Admin Dashboard එකට) රැගෙන යනවා.*/
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/admin/dashboard');
  }

  return (

    /*Admin Login ෆෝම් එක තිරයේ (Screen එකේ) හරි මැදට ගෙන ඒම සඳහා ප්‍රධාන රාමුව (Container එක) සැකසීමයි.
        flex items-center justify-center: මේ වචන 3 එකතු වෙලා තමයි ඇතුළේ තියෙන ලොගින් ෆෝම් එක තිරයේ ඉහළ-පහළ අතිනුත්, වම්-දකුණු අතිනුත් හරියටම මධ්‍යගත (Center) කරන්නේ.
        min-h-screen: මේකෙන් කියන්නේ මේ ප්‍රධාන රාමුවේ අවම උස (Minimum Height) පරිශීලකයා බලන තිරයේ සම්පූර්ණ උසට (100vh) සමාන කරන්න කියන එකයි. මේක නැත්නම් ලොගින් ෆෝම් එක තිරයේ උඩටම ගිහින් ඇලෙනවා.
        px-4: මෙහි තේරුම Padding-X (වම් සහ දකුණු පසින්) සුළු ඉඩක් තැබීමයි. මේ නිසා ජංගම දුරකථනයකින් (Mobile phone) මේ වෙබ් අඩවිය බැලුවත්, ලොගින් ෆෝම් එක තිරයේ දෙපැත්තේ ගෑවෙන්නේ නැතිව ලස්සනට මැදින් තියෙනවා.*/
    <div className="flex items-center justify-center min-h-screen px-4">

      {/* "Glassmorphism" (වීදුරුවක් වැනි) අලංකාර පෙනුම තියෙන ලොගින් කාඩ් එක (Login Card) නිර්මාණය කරයි
          පසුබිම සහ වීදුරු පෙනුම (Glass Effect):
            bg-white/10 dark:bg-black/40: Light mode එකේදී සුදු පාටින් 10% ක විනිවිද පෙනෙන (Transparent) ස්වභාවයකුත්, Dark mode එකේදී කළු පාටින් 40% ක විනිවිද පෙනෙන ස්වභාවයකුත් ලබා දෙනවා. 
            backdrop-blur-md: මේකෙන් තමයි අර කාඩ් එකට පිටුපසින් තියෙන දේවල් බොඳ කරලා (Blur), නියම වීදුරුවක පෙනුම ලබා දෙන්නේ.
          හැඩය සහ ඉඩකඩ:
            p-8: කාඩ් එක ඇතුළේ තියෙන අකුරු සහ කොටු වලට වටෙන්ම හොඳ ඉඩක් (Padding - 32px) ලබා දෙනවා.
            rounded-2xl: කාඩ් එකේ මුළු හතර (Corners) ඉතා අලංකාරව රවුම් කරනවා.
          ත්‍රිමාණ (3D) පෙනුම:
            shadow-2xl: කාඩ් එකට යටින් ලොකු සෙවනැල්ලක් දාලා, ඒක තිරයෙන් ඉස්සිලා තියෙනවා වගේ පෙන්වනවා.
            border border-teal-500/20: කාඩ් එක වටේට 20% කින් පේන ළා Teal (කොළ) පාට බෝඩරයක් දාලා, ලස්සන නිමාවක් දෙනවා.
          ප්‍රමාණය පාලනය කිරීම (Size):
            w-full max-w-md: මේ කාඩ් එක තිරය කුඩා වෙද්දී සම්පූර්ණ පළලම (w-full) ගන්නවා. හැබැයි තිරය ලොකු වෙද්දී මේකට යන්න පුළුවන් උපරිම පළල (Maximum width) මධ්‍යම ප්‍රමාණයකට (max-w-md) සීමා කරනවා. මේ නිසා ලොකු පරිගණක තිරයකදී කාඩ් එක අනවශ්‍ය විදිහට ඇදෙන්නේ නැතිව ලස්සන කොටුවක් විදිහට මැදින් තියෙනවා.*/}
      <div className="bg-white/10 dark:bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-md">

        {/* ලොගින් කාඩ්පතේ ඉහළින්ම දිස්වන "Admin Portal" නැමැති ප්‍රධාන මාතෘකාව අලංකාර කිරීම සිදු කරයි
              text-3xl font-bold: අකුරු වල ප්‍රමාණය ත්‍රිගුණයකින් පමණ විශාල කර, ඒවා ඝන (Bold) කර කැපී පෙනෙන සේ සකසයි.
              text-center: මාතෘකාව කොටුවේ වම් හෝ දකුණු පසට බර නොවී, හරියටම මැදට (Center) සමබර කරයි.
              mb-8: මෙයින් Margin-Bottom 8ක් යොදයි. එනම්, මාතෘකාවට පහළින් ඇති Username කොටුව සහ මාතෘකාව අතර ප්‍රමාණවත් හිස් අවකාශයක් (පරතරයක්) තබයි.
              text-teal-600 dark:text-emerald-400: මෙය වර්ණ පාලනයයි. සාමාන්‍ය (Light) තත්ත්වයේදී තද Teal වර්ණයද, වෙබ් අඩවිය Dark Mode හි ඇති විට වඩාත් දීප්තිමත් Emerald වර්ණයද මාතෘකාවට ලබා දෙයි. මේ නිසා තේමාවන් දෙකේදීම අකුරු පැහැදිලිව කියවිය හැක. */}
        <h2 className="text-3xl font-bold text-center mb-8 text-teal-600 dark:text-emerald-400">
          Admin Portal
        </h2>

        {/* දත්ත ලබා ගන්නා ෆෝම් එක (Form) ආරම්භ වන්නේ සහ එහි මූලික හැසිරීම තීරණය කරන්නේ.
              onSubmit={handleLogin}: සාමාන්‍යයෙන් කෙනෙක් Username, Password ගහලා "Login" බොත්තම එබුවම හරි, කීබෝඩ් එකේ 'Enter' එබුවම හරි මේ ෆෝම් එක Submit වෙනවා. මේ කේතයෙන් කියන්නේ, "ෆෝම් එක Submit වුණ ගමන් අපි කලින් හදපු handleLogin කියන ෆන්ක්ෂන් එක ක්‍රියාත්මක කරන්න" කියන එකයි. ඒ නිසා තමයි ලොගින් බොත්තම එබූ විගස කිසිම රිෆ්‍රෙෂ් වීමක් නැතුව ඔයාව Dashboard එකට අරගෙන යන්නේ.
              className="space-y-6": ෆෝම් එක ඇතුළේ තියෙන ප්‍රධාන කොටස් (එනම් Username කොටුව, Password කොටුව සහ Login බොත්තම) අතර සිරස් අතට (ඉහළ සිට පහළට) සමාන හිස් පරතරයක් තැබීමයි. මේ නිසා ඔබ අමුතුවෙන් එකින් එකට Margin ලබා දිය යුතු නැහැ, මේ එක වචනයෙන් ඒ ඔක්කොම ටික එකිනෙක ගෑවෙන්නේ නැතිව ලස්සනට පෙළගස්වනවා. */}
        <form onSubmit={handleLogin} className="space-y-6">

          {/* පරිශීලකයාගේ Username (පරිශීලක නාමය) ඇතුළත් කරන කොටුව සහ ඊට අදාළ මාතෘකාව නිර්මාණය කර
                Username එක සඳහා type="text" (අකුරු සාමාන්‍ය පරිදි පෙනේ) සහ Password එක සඳහා type="password" (අකුරු වෙනුවට තිත් පෙන්වයි) ලෙස යොදා තිබීම පමණි.
                මාතෘකා කොටස (<label>)
                  block: "Username" කියන මාතෘකාව වෙනම පේළියක (තනි කොටසක් ලෙස) තබයි. මේ නිසා Input කොටුව ස්වයංක්‍රීයවම ඊළඟ පේළියට වැටෙනවා.
                  text-sm font-medium: අකුරු වල ප්‍රමාණය කුඩා කර (small) සහ මඳක් ඝන (medium bold) කර පැහැදිලිව පෙන්වයි.
                  mb-2: Margin-Bottom හරහා මාතෘකාව සහ යටින් ඇති ටයිප් කරන කොටුව අතර කුඩා පරතරයක් නිර්මාණය කරයි.
                දත්ත ලබාගන්නා කොටුව (<input>)
                  type="text": මෙය සාමාන්‍ය අකුරු ලබාදෙන කොටුවක් බව බ්‍රවුසරයට දන්වයි (Password වගේ තිත් පෙන්වන්නේ නැතිව සාමාන්‍ය අකුරු පෙන්වයි).
                  w-full px-4 py-3: කොටුවට තිබෙන සම්පූර්ණ පළලම (w-full) ලබා ගන්නා අතර, කොටුව ඇතුළේ වටෙන්ම හොඳ ඉඩක් (Padding - px සහ py) ලබා දෙයි. මේ නිසා ටයිප් කරන අකුරු කොටුවේ බෝඩරයේ ගෑවෙන්නේ නැහැ.
                  rounded-lg: කොටුවේ මුළු හතර අලංකාරව රවුම් කරයි (Large border-radius).
                වර්ණ සැකැස්ම: bg-gray-50 dark:bg-gray-900/50 සහ border border-teal-200 dark:border-emerald-800 මඟින් Light mode සහ Dark mode දෙකටම ගැළපෙන පසුබිම් වර්ණයක් සහ ළා කොළ පැහැති බෝඩරයක් ලබා දෙයි.
                Focus Effects (focus:outline-none focus:ring-2 focus:ring-teal-500): මෙය ඉතා වැදගත් UI අංගයකි. ඔබ ටයිප් කිරීමට කොටුව මත ක්ලික් කළ වහාම, බ්‍රවුසරයෙන් ලබාදෙන අවලස්සන කළු outline එක ඉවත් කර, ඒ වෙනුවට අලංකාර Teal වර්ණයේ දිලිසෙන වළල්ලක් (ring) කොටුව වටා නිර්මාණය කරයි.
                placeholder="Enter username": කොටුව හිස්ව ඇති විට පරිශීලකයාට උපදෙසක් ලෙස ළා පැහැයෙන් පෙන්වන ඉඟි පාඨයයි.
                required: මෙම කොටුව හිස්ව තබා ෆෝම් එක Submit කළ නොහැකි බවට පනවන අනිවාර්ය නීතියයි.  */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>
            <input
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-teal-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter username"
              required
            />
          </div>

          {/* අයිකනය කොටුව ඇතුළට ගැනීමේ උපක්‍රමය
                <div className='relative'>: මෙය ඉතා වැදගත්! සාමාන්‍යයෙන් HTML වල input කොටුවක් ඇතුළට තව බොත්තමක් දාන්න බැහැ. ඒ නිසා අපි input එකයි, අයිකන් බොත්තමයි දෙකම එකට ඔතලා (wrap කරලා) මේ ප්‍රධාන div එකට relative පන්තිය දෙනවා. මේකෙන් අර අයිකනයට කොටුවෙන් පිට පැනලා යන්න බැරි වෙන්න "රාමුවක්" සකසනවා.
              Password කොටුව (<input>)
                type={showPassword ? "text" : "password"}: මෙතන තමයි ප්‍රධාන මැජික් එක තියෙන්නේ! අපි කලින් හදපු showPassword කියන State එකේ අගය true නම්, මේ කොටුව ක්ෂණිකවම සාමාන්‍ය අකුරු පෙනෙන (text) එකක් බවට පත්වෙනවා. අගය false නම්, අකුරු හැංගිලා තිත් පෙනෙන (password) එකක් වෙනවා.
              ඇසේ අයිකනය සහිත බොත්තම (<button>)
                type='button': ෆෝම් එකක් ඇතුළේ තියෙන ඕනෑම බොත්තමක් එබුවම සාමාන්‍යයෙන් ෆෝම් එක Submit වෙනවා. අපි මේක type="button" කියලා දුන්නේ නැත්නම්, ඔයා ඇසේ අයිකනය ඔබපු ගමන් මුළු ෆෝම් එකම Submit වෙලා ඔයාව Dashboard එකට යවන්න උත්සාහ කරනවා. ඒක වළක්වන්නේ මේ පේළියෙනි.
                onClick={() => setShowPassword(!showPassword)}: ඇසේ අයිකනය එබූ වහාම, දැනට showPassword එකේ තියෙන අගය අනිත් පැත්තට හරවනවා (! ලකුණෙන් කරන්නේ එයයි). එනම් true නම් false කරනවා, false නම් true කරනවා.
                absolute inset-y-0 right-0: මේ Tailwind පන්ති වලින් තමයි අර ඇසේ අයිකනය හරියටම Input කොටුවේ දකුණු කෙළවරටම (right-0) අරගෙන ගිහින්, ඉහළ-පහළ අතට හරියටම මැදින් (inset-y-0) තියන්නේ.
                pr-4: Padding-Right හරහා අයිකනය කොටුවේ දකුණු කෙළවරේ ගෑවෙන්නේ නැති වෙන්න පොඩි පරතරයක් තබනවා. 
              අයිකනය මාරු වීම
                {showPassword ? <FaEyeSlash size="{20}"/> : <FaEye size="{20}"/>}: පාස්වර්ඩ් එක පේන්න තියෙන වෙලාවට ඇහැ හරහා ඉරක් ගිය අයිකනයත් (FaEyeSlash), පාස්වර්ඩ් එක හැංගිලා තියෙන වෙලාවට සාමාන්‍ය ඇසේ අයිකනයත් (FaEye) මාරුවෙන් මාරුවට පෙන්වන්නේ මේ පේළියෙනි.*/}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className='relative'>
              <input
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-teal-200 dark:border-emerald-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter password"
                required
              />

              <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-teal-500 transition-colors'>
                {showPassword ? <FaEyeSlash size={20}/> : <FaEye size={20} />}
              </button>
            </div>
          </div>

          {/* ප්‍රධාන ක්‍රියාකාරීත්වය:
                type="submit": මේක තමයි බොත්තමේ ප්‍රධානම රාජකාරිය. මේක එබුවම තමයි අපි ෆෝම් එකට මුලින් දීපු onSubmit={handleLogin} එක ක්‍රියාත්මක වෙලා, ඔයාව Dashboard එකට අරගෙන යන්නේ
              හැඩය සහ ප්‍රමාණය:
                w-full: බොත්තම ෆෝම් එකේ තියෙන සම්පූර්ණ පළලටම (100% width) දිග හරිනවා.
                py-3: උඩින් සහ පහළින් (Padding-Y) හොඳ ඉඩක් ලබා දීලා බොත්තම මහතට, පැහැදිලිව පෙනෙන සේ සකසනවා.
                rounded-lg: බොත්තමේ මුළු හතර අලංකාරව රවුම් කරනවා.
                text-white font-bold: බොත්තම ඇතුළේ තියෙන අකුරු සුදු පාටින් සහ ඝනව (Bold) පෙන්වනවා. 
              වර්ණ සංක්‍රමණය (Gradient Background):
                bg-linear-to-r from-teal-500 to-emerald-600: බොත්තමට තනි පාටක් දෙනවා වෙනුවට, වම් පැත්තේ ඉඳන් දකුණු පැත්තට (to-r) Teal පාටින් පටන් අරන් අලංකාර Emerald පාටින් අවසන් වන Gradient (වර්ණ සංක්‍රමණයක්) පසුබිමක් මේකෙන් ලබා දෙනවා. Portfolio එකේ තේමාවට මේක ඉතාමත් හොඳින් ගැළපෙනවා.
              සජීවීකරණය සහ Hover Effects (Animations):
                hover:from-teal-600 hover:to-emerald-700: ඔයා මවුස් එක බොත්තම උඩට ගෙනිච්චම (Hover කළාම) අර පාට දෙකම ස්වයංක්‍රීයවම ටිකක් තද පැහැයකට හැරෙනවා.
                transition-all duration-300 transform hover:scale-[1.02]: මේක ඉතාමත් ආකර්ෂණීය UI අංගයක්. මවුස් එක බොත්තම උඩට ගෙනිච්චම බොත්තම මිලි තත්පර 300ක කාලයක් (duration-300) ඇතුළත ඉතා මෘදු විදිහට 2% කින් ලොකු වෙනවා (scale-[1.02]). මේකෙන් බොත්තමට නියම 3D / Interactive (ක්ලික් කරන්න හිතෙන) පෙනුමක් ලැබෙනවා.*/}
          <button
            type="submit"
            className="w-full py-3 bg-linear-to-r from-teal-500 to-emerald-600 hover:from-teal-600 hover:to-emerald-700 text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-[1.02]">
            Login to Dashboard
          </button>
        </form>

        {/* පිටු අතර මාරු වීම (<Link to="/">)
              සාමාන්‍ය HTML වල වෙබ් පිටුවකට යන්න පාවිච්චි කරන්නේ <a> (Anchor) ටැග් එකක්. හැබැයි අපි මෙතන පාවිච්චි කරලා තියෙන්නේ react-router-dom වලින් දෙන විශේෂ <Link> එකක්.
              to="/" කියන්නේ අපේ ප්‍රධාන වෙබ් අඩවියට (Portfolio එකේ මුල් පිටුවට) යන්න කියන එකයි. මෙහි ඇති විශේෂත්වය තමයි, මේක ක්ලික් කළාම මුළු වෙබ් පිටුවම Refresh වෙන්නේ නැතිව ඉතා වේගයෙන් මුල් පිටුවට ඔයාව අරගෙන යන එක.
            හැඩගැන්වීම් සහ අලංකරණය (Tailwind Classes)
              mt-6 text-center: ප්‍රධාන ඩිව් (div) එකට Margin-Top 6ක් දීලා උඩින් තියෙන ලොගින් ෆෝම් එකයි මේ ලින්ක් එකයි අතර හොඳ පරතරයක් හදලා, ලින්ක් එක තිරයේ හරියටම මැදට (center) අරගෙන එනවා.
              text-sm text-gray-500: අකුරු වල ප්‍රමාණය කුඩා කරලා (small), සාමාන්‍ය වෙලාවට ඇසට බාධාවක් නොවෙන විදිහේ ළා අළු පාටකින් මේ ලින්ක් එක පෙන්වනවා. 
              text-sm text-gray-500: අකුරු වල ප්‍රමාණය කුඩා කරලා (small), සාමාන්‍ය වෙලාවට ඇසට බාධාවක් නොවෙන විදිහේ ළා අළු පාටකින් මේ ලින්ක් එක පෙන්වනවා.
            වම්පස ඊතලය (&larr;)
              මේක HTML වල විශේෂ කේතයක් (HTML Entity). මේකෙන් වම් පැත්තට හැරුණු ඊතලයක් (←) අකුරුවලට මුලින් එකතු කරනවා. අයිකන් එකක් වෙනම දානවට වඩා මේක ගොඩක් ලේසියි.*/}
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