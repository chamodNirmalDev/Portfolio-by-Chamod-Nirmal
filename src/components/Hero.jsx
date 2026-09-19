import React from 'react'
import hero from '../assets/hero.png'
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa6'
import CV from '../assets/cv.pdf'
import { DownloadIcon, Mail } from 'lucide-react'
import { motion } from 'framer-motion'

const Hero = () => {
    const socialIcons = [
        { icon: FaLinkedin, alt: 'Linkdin', link: '#' },
        { icon: FaGithub, alt: 'Github', link: '#' },
        { icon: FaFacebook, alt: 'Facebook', link: '#' },
        { icon: FaYoutube, alt: 'Youtube', link: '#' },
        { icon: FaInstagram, alt: 'Instagram', link: '#' }
    ]

    // මගින් තිරයේ ටයිප් විය යුතු සම්පූර්ණ වාක්‍යය ගබඩා කර ගනී.
    const text = "< Full Stack Developer >";

    /*Framer Motion හි අතිශය වැදගත් උපක්‍රමයක් වන Orchestration (මෙහෙයවීම) සඳහා භාවිතා කරන නීති මාලාවකි (Variants). ටයිප් රයිටරයක් මෙන් අකුරෙන් අකුර දර්ශනය වීමේ මූලිකම රහස ඇත්තේ මෙතැනයි.
        const containerVariants: මෙය සම්පූර්ණ වාක්‍යයම රඳවාගෙන සිටින "ප්‍රධාන මව් රාමුවට" (Parent Container) ලබා දෙන සජීවීකරණ නීති ගබඩාවයි. අකුරු වල හැසිරීම අපි පාලනය කරන්නේ මේ හරහාය.
        hidden: { ... }: මෙය සජීවීකරණය ආරම්භ වීමට පෙර ඇති මූලික අවස්ථාවයි (Initial state).
        opacity: 1 (hidden ඇතුළත): සාමාන්‍යයෙන් යමක් සඟවන විට opacity: 0 ලබා දුන්නත්, මෙහිදී 1 ලබා දී ඇත්තේ මව් රාමුව මුල සිටම තිරයේ පවතින බැවිනි. අපිට මුලින්ම නොපෙනී සඟවා තැබීමට අවශ්‍ය වන්නේ මව් රාමුව නොව, ඒ ඇතුළත ඇති "තනි අකුරු" ය. (ඒවා ඊළඟ පියවරේදී letterVariants හරහා බිංදුවට සකසා ඇත).
        visible: { ... }: මෙය සජීවීකරණය ක්‍රියාත්මක වන අවස්ථාව සහ අවසන් අවස්ථාවයි (Animate state).
        opacity: 1 (visible ඇතුළත): සජීවීකරණය අතරතුර සහ අවසානයේදීද මව් රාමුව සම්පූර්ණයෙන්ම දෘශ්‍යමානව පවතින බව මෙයින් තහවුරු කරයි.
        transition: { ... }: hidden තත්ත්වයේ සිට visible තත්ත්වයට මාරු වන ආකාරය, වේගය සහ කාලය පාලනය කරන්නේ මෙම කොටසෙනි.
        staggerChildren: 0.08: මෙය මුළු කේතයේම ඇති "මැජික්" එකයි! staggerChildren යනු මව් රාමුව ඇතුළත ඇති ළමා කොටස් (Children - එනම් අපේ කේතයේ ඇති තනි අකුරු) එකින් එක දර්ශනය වීමේ වේගය පාලනය කරන විධානයයි. මෙයින් Framer Motion එකට කියන්නේ "පළමු අකුර පෙන්වන්න, ඉන්පසු තත්පර 0.2ක කාලයක් නතර වී (Delay), ඊළඟ අකුර පෙන්වන්න" යන්නයි.*/ 
    const containerVariants = {
        hidden: {opacity:1},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    /*ප්‍රධාන රාමුව ඇතුළේ තියෙන "එක් එක් තනි අකුරක්" (Individual letter) හැසිරිය යුතු ආකාරයයි.
        const letterVariants: මෙය එක තනි අකුරක් සඳහා ලබා දෙන සජීවීකරණ නීති ගබඩාවයි. අර කලින් කතා කළ මව් රාමුවේ staggerChildren මගින් තත්පර 0.2න් 0.2ට සිග්නල් එක දෙන්නේ මේ නීතියටයි.
        hidden: { ... }: මෙය සජීවීකරණය ආරම්භ වීමට පෙර අකුරක් තිබිය යුතු මූලික අවස්ථාවයි (Initial state).
            opacity: 0 (hidden ඇතුළත): අකුර සම්පූර්ණයෙන්ම විනිවිද පෙනෙන (Invisible) තත්ත්වයට පත් කරයි. එනම් අකුර ඇසට නොපෙනී යයි.
            display: 'none' (hidden ඇතුළත): මෙය ඉතා වැදගත් උපක්‍රමයකි. මෙයින් කරන්නේ අකුර ඇසට නොපෙනී තබා ගන්නවා පමණක් නොව, ඒ අකුරට වෙබ් පිටුවේ වෙන් වී ඇති හිස් ඉඩ පවා සම්පූර්ණයෙන්ම ඉවත් කර දැමීමයි. (මේ නිසා වාක්‍යය ටයිප් වීමට පෙර අනවශ්‍ය හිස් ඉඩක් තිරයේ වෙන් වී නොපවතී).
        visible: { ... }: මෙය staggerChildren හරහා සිග්නල් එක ලැබුණු පසු අකුර දෘශ්‍යමාන වන අවස්ථාවයි (Animate state).
            opacity: 1 (visible ඇතුළත): අකුර සම්පූර්ණයෙන්ම පැහැදිලිව දර්ශනය වීමට සලස්වයි.
            display: 'inline-block' (visible ඇතුළත): අර කලින් ඉවත් කර දමා තිබූ ඉඩ නැවත ලබා දී, අකුරු එකින් එක ළඟින් ළඟින් (පේළියකට) අලංකාරව පෙළගස්වයි.*/ 
    const letterVariants = {
        hidden: {
            opacity: 0,
            display: 'none'
        },

        visible: {
            opacity: 1,
            display: 'inline-block'
        }
    };

    return (
        // පහළින් ඇති Navbar එකට ඉඩ දීම සඳහා pb-28 (Padding Bottom) අලුතින් එකතු කර ඇත
        <section id='home' className='min-h-screen flex items-center pb-24 sm:pb-24 relative overflow-hidden'>
            <div className='container mx-auto px-4 sm:px-8 lg:px-14 py-12 lg:mt-14 relative z-10'>
                <div className='flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16'>
                    
                    {/* වම් පස පින්තූර කොටස */}
                    <div className='lg:w-2/5 w-full flex justify-center' data-aos='fade-right'>
                        <div className='relative group'>
                            <div className='absolute inset-0 bg-linear-to-r from-teal-400 to-emerald-500 rounded-full
                            filter blur-2xl opacity-0 group-hover:opacity-60 group-hover:scale-110 transition-all duration-500'/>
                            <div className='relative w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4
                                border-white/5 shadow-2xl z-10'>
                                <img src={hero}
                                    alt='profile'
                                    className='w-full h-full object-cover rounded-full transform group-hover:scale-105 transition-transform duration-500' />

                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-110
                                    group-hover:scale-120 transition-transform duration-500'></div>
                                <div className='absolute inset-0 border-2 border-teal-500/30 rounded-full scale-120
                                    group-hover:scale-140 transition-transform duration-500'></div>
                            </div>
                        </div>
                    </div>
                    
                    {/* දකුණු පස අකුරු කොටස */}
                    <div className='lg:w-3/5 w-full flex flex-col items-center lg:items-start text-center lg:text-left'
                        data-aos='fade-left'>
                        
                        <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 mb-5 '>
                            {/* රතු පාට තිත Teal වර්ණයට වෙනස් කර ඇත */}
                            <span className='w-2 h-2 rounded-full dark:bg-red-500 bg-red-800  animate-pulse'></span>
                            <span className='text-sm font-medium dark:text-teal-300 text-teal-800'>
                                Available for work
                            </span>
                        </div>

                        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 dark:text-white text-gray-800'>
                            Hello, I'm <span className='text-teal-700 dark:text-teal-400'>Chamod</span>
                        </h1>

                        {/*Typewriter Effect එක සඳහා භාවිතා කරන ප්‍රධාන මාතෘකා රාමුවයි (Main Heading Container).
                            <motion.h2>: සාමාන්‍ය HTML <h2> (Heading 2) ටැග් එකක් වෙනුවට Framer Motion හි <motion.h2> භාවිතා කර ඇත. වෙබ් අඩවියක මාතෘකාවක් සජීවීකරණය (Animate) කිරීමට ඉඩ ලැබෙන්නේ මේ නිසාවෙනි.
                            variants={containerVariants}: අපි කලින් සාකච්ඡා කළ containerVariants කියන සජීවීකරණ නීති මාලාව (staggerChildren ඇතුළත් කොටස) මේ ප්‍රධාන රාමුවට කෙලින්ම සම්බන්ධ කරන්නේ මේ හරහාය.
                            initial='hidden': වෙබ් පිටුව Load වන පළමු තත්පරයේදී, අර නීති මාලාවේ තියෙන hidden තත්ත්වයෙන් (එනම් සැඟවුණු අවස්ථාවෙන්) සජීවීකරණය ආරම්භ කරන්නැයි මින් විධාන දෙයි.
                            animate='visible': ඉන්පසුව වහාම අර නීති මාලාවේ ඇති visible තත්ත්වයට (එනම් දෘශ්‍යමාන අවස්ථාවට) රාමුව මාරු වන්න යැයි කියයි. මේ මාරුවීම අතරතුර තමයි අර අකුරෙන් අකුර ටයිප් වන සජීවීකරණය ක්‍රියාත්මක වෙන්නේ.
                            className="..." (Tailwind හැඩගැන්වීම්):
                                text-2xl sm:text-3xl: අකුරු වල ප්‍රමාණය ජංගම දුරකථන වලදී 2xl ලෙසත්, ටැබ්ලට්/පරිගණක වලදී ඊට වඩා විශාලව 3xl ලෙසත් ස්වයංක්‍රීයව වෙනස් කරයි (Responsive Text).
                                font-mono: සැබෑ මෘදුකාංග කේතයක් (Code) ආකාරයෙන් දිස්වීම සඳහා කේත ලියන මෘදුකාංග වල භාවිතා වන Monospace අකුරු විලාසයක් යොදයි.
                                mb-4: මෙම මාතෘකාවට පහළින් (Margin Bottom) පික්සල් 16ක හිස් ඉඩක් තබයි.
                                dark:text-emerald-500 text-emerald-700: සාමාන්‍ය දහවල් කාලයට තද කොළ පාටිනුත් (700), Dark Mode එකේදී කළු පසුබිමට කැපී පෙනෙන ළා කොළ (500) පාටිනුත් අකුරු වර්ණවත් කරයි.
                                flex items-center flex-wrap: ඇතුළත ඇති අකුරු සහ අවසානයට ඇති "නිවී නිවී පත්තු වන කර්සරය" (Cursor) උස් පහත් නොවී හරියටම එකම පේළියේ මැදින් තබා ගනී. flex-wrap ඇති නිසා ජංගම දුරකථන තිරය ඉතා කුඩා වුවහොත්, වාක්‍යයේ කොටස් කපා නොදමා අලංකාරව ඊළඟ පේළියට කඩා වැටීමට (Wrap වීමට) ඉඩ සලසයි.  */}
                        <motion.h2
                        variants={containerVariants}
                        initial='hidden'
                        animate='visible'
                        className='text-2xl sm:text-3xl font-mono mb-4 dark:text-emerald-500 text-emerald-700 flex items-center flex-wrap'>
                            {/*සම්පූර්ණ වාක්‍යය තනි අකුරු බවට කඩාගෙන, ඒ අකුරු එකින් එක තිරයට ගෙන එන ගමන්ම වරහන් වලට පමණක් වෙනම වර්ණයක් (Teal පාට) ලබා දෙන්නේ.
                                text.split("").map((char, index) => { ... }): අපි කලින් ලබා දුන් වාක්‍යය (< Full Stack Developer >) එකවර ටයිප් කළ නොහැකි බැවින්, .split("") භාවිතා කර එහි ඇති සෑම අකුරක්ම සහ හිස්තැනක්ම වෙන වෙනම කැබලි වලට කඩා ගනී (උදා: <,  , F, u, l, l). ඉන්පසු .map() හරහා එම සෑම අකුරක් වෙනුවෙන්ම ලූප් එකක් (Loop) ක්‍රියාත්මක කරයි. මෙහි char යනු ලූප් එක කැරකෙන මොහොතේ ඊට අසුවී ඇති අකුරයි. index යනු එම අකුර මුළු වාක්‍යයේ පවතින ස්ථානයේ අංකයයි (0, 1, 2...).
                                const isBracket = char === "<" || char === ">";: මෙය වර්ණය වෙනස් කිරීමේ තර්කනයයි (Logic). ලූප් එකෙන් පැමිණෙන අකුර (char) වම් වරහනක් ද (<), එහෙමත් නැතිනම් (||) දකුණු වරහනක් ද (>) කියා මෙතැනදී පරීක්ෂා කරයි. පැමිණියේ වරහනක් නම්, මෙම isBracket යන විචල්‍යය true (සත්‍ය) බවට පත් වේ.
                                <motion.span>: එක් එක් අකුර තිරයට මුද්‍රණය කරන්නේ මෙම ටැග් එක ඇතුළෙයි. මෙය සාමාන්‍ය HTML <span> එකක් වෙනුවට Framer Motion හි <motion.span> ලෙස ගෙන ඇත්තේ අකුරකට සජීවීකරණයක් ලබා දීමට අවශ්‍ය බැවිනි.
                                    key={index}: React හි නීතියකට අනුව ලූප් එකක් හරහා දේවල් නිර්මාණය කරන විට ඒ සෑම එකකටම කිසිදා සමාන නොවන අනන්‍ය අංකයක් (Key) ලබා දිය යුතුය. ඒ සඳහා අර මුලින් ලබා ගත් ස්ථාන අංකය (index) මෙයට ලබා දෙයි.
                                    variants={letterVariants}: අකුරක් මුලින්ම නොපෙනී සැඟවී තිබී පසුව දර්ශනය විය යුතුයි යන සජීවීකරණ නීතිය (letterVariants) මෙම අකුරට සම්බන්ධ කරන්නේ මේ හරහාය.
                                className={isBracket ? "text-teal-700 dark:text-teal-400" : ""}:මෙය Conditional Styling (කොන්දේසියක් මත පදනම්ව වර්ණ ගැන්වීම) ලෙස හඳුන්වයි. අර කලින් පරීක්ෂා කළ isBracket අගය true නම් (එනම් අකුර වරහනක් නම්), ඊට කැපී පෙනෙන Teal පැහැය ලබා දෙන මෙන් මින් විධාන දෙයි. නමුත් එය සාමාන්‍ය අකුරක් නම් (false නම්), කිසිදු අමතර Class එකක් ලබා නොදී "" (හිස්ව) තබයි. එසේ හිස්ව තැබූ විට, ඊට ඉබේම අර ප්‍රධාන <h2> රාමුවට ඔබ ලබා දී තිබූ ප්‍රධාන වර්ණය (Emerald පැහැය) ස්වයංක්‍රීයවම හිමි වේ.
                                {char === " " ? "\u00A0" : char}: සාමාන්‍යයෙන් වෙබ් බ්‍රවුසරයක තනි හිස්තැනක් (Space එකක්) තිබූ විට එය නොපෙනී කපා හැරේ (Collapse වේ). එය වැළැක්වීමට, පැමිණෙන අකුර හිස්තැනක් දැයි පරීක්ෂා කර (char === " "), එය හිස්තැනක් නම් HTML වල හිස්තැන් තැබීමට භාවිතා කරන සම්මත කේතය වන \u00A0 (Non-breaking space) යන්න මුද්‍රණය කරයි. එසේ නොමැති නම් අදාළ සාමාන්‍ය අකුරම මුද්‍රණය කරයි.*/}
                            {text.split("").map((char,index) => {
                                const isBracket = char === "<" || char === ">";

                                return(
                                    <motion.span
                                    key={index}
                                    variants={letterVariants}
                                    className={isBracket 
                                        ? "text-teal-700 dark:text-teal-400"
                                        : ""}>
                                    {char === " " ? "\u00A0" : char}
                                    </motion.span>
                                );
                            })}

                            {/*සම්පූර්ණ වාක්‍යය අවසානයේ ඇති "නිවී නිවී පත්තු වන කර්සරය" (Blinking Cursor) යි. සැබෑ මෘදුකාංගයක (Terminal එකක) කේත ටයිප් කරනවා වැනි තාත්වික හැඟීමක් ලබා දෙන්නේ මේ කුඩා ඉර මගිනි.
                                <motion.span>: සජීවීකරණයක් (Animation එකක්) ලබා දිය හැකි බැවින් සාමාන්‍ය  ටැග් එකක් වෙනුවට මෙය භාවිතා කර ඇත.
                                animate={{opacity: [1,0,1]}}:මෙයින් කර්සරයේ පෙනෙන ස්වභාවය පාලනය කරයි. 1 යනු සම්පූර්ණයෙන්ම දෘශ්‍යමාන වීමයි. 0 යනු සම්පූර්ණයෙන්ම නොපෙනී යාමයි. ඒ අනුව මෙය මුලින්ම පෙන්වා, පසුව නොපෙනී ගොස්, නැවතත් පෙන්වන ලෙස (1 ➡️ 0 ➡️ 1) විධාන දෙයි.
                                transition={{repeat : Infinity, duration: 0.8, ease: "linear"}}: 
                                    repeat: Infinity: එම ක්‍රියාවලිය කිසිදා නතර නොකර, දිගින් දිගටම (අනන්තය දක්වා) සිදු කරන ලෙසට (Loop වීමට) උපදෙස් දෙයි. කර්සරය නිවී නිවී පත්තු වෙන්නේ මේ නිසයි.
                                    duration: 0.8: එසේ එක් වරක් පෙනී-නොපෙනී-පෙනී යාමට හරියටම තත්පර 0.8ක කාලයක් ගත කරන ලෙස නියම කරයි.
                                    ease: "linear": එම පෙනී-නොපෙනී යන වේගය ගැස්සෙන්නේ නැතිව, එකම සමාන වේගයකින් (Linear) සුමටව සිදුවීමට සලස්වයි.
                                className="..." (Tailwind හැඩගැන්වීම්):
                                    inline-block: මෙම කර්සරයට අපට අවශ්‍ය උසක් සහ පළලක් ලබා දීමට හැකි වන සේ එහි හැසිරීම වෙනස් කරයි.
                                    w-0.75: කර්සරයට ඉතා කුඩා පළලක් (සිහින් ඉරක් වැනි හැඩයක්) ලබා දෙයි.
                                    h-5 sm:h-6: ජංගම දුරකථන වලදී උස පික්සල් 20ක් සහ ටැබ්ලට්/පරිගණක වලදී උස පික්සල් 24ක් ලෙස, අර ටයිප් වන අකුරු වල උසට හරියටම ගැළපෙන සේ සකසයි.
                                    bg-emerald-700 dark:bg-emerald-500: අකුරු වල වර්ණයටම ගැළපෙන සේ කර්සරයද දහවල් කාලයට තද කොළ පාටිනුත්, Dark mode එකේදී ළා කොළ පාටිනුත් පෙන්වයි.
                                    ml-2 (Margin Left 2): ටයිප් වී අවසන් වන අන්තිම අකුරේ (එනම් > ලකුණේ) කර්සරය ගෑවීම වළක්වා, ඒ දෙක අතර කුඩා හිස් ඉඩක් තබයි  */}
                            <motion.span
                            animate={{opacity: [1,0,1]}}
                            transition={{repeat : Infinity, duration: 0.8, ease: "linear"}}
                            className="inline-block w-0.75 h-5 sm:h-6 bg-emerald-700 dark:bg-emerald-500 ml-2"></motion.span>
                        </motion.h2>

                        <p className='mb-6 leading-relaxed max-w-md lg:max-w-lg dark:text-emerald-100/80 text-emerald-950'>
                            As a Full-Stack Software Engineer, I bridge the gap between design and robust engineering.
                             I specialize in developing modern web applications and mobile apps using React and Java 
                             ecosystems. I thrive on solving complex problems, writing clean code, and delivering custom
                             software solutions that help businesses and individuals achieve their digital goals.
                        </p>

                        <div className='flex gap-10 mb-7'>
                            {[
                                {number: '3+', label: "Years Experience"},
                                {number: '30+', label: "Projects Done"},
                                {number: '10+', label: "Happy Clients"}
                            ].map((stat,index) => (
                                <div key={index} className='text-center'>
                                    <div className='text-3xl font-bold dark:text-emerald-100 text-teal-900'>{stat.number}</div>
                                    <div className='text-base dark:text-emerald-100/70 text-teal-800'>{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <div className='flex flex-col sm:flex-row gap-10 w-full sm:w-auto'>
                            <a href={CV} download className='w-full sm:w-auto'>
                                {/* Shadow පන්තියේ අඩු වී තිබූ ']' වරහන එකතු කර ඇත */}
                                <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                text-white font-semibold bg-linear-to-r from-teal-500 to-emerald-600 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] 
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                                    <DownloadIcon size={18}/> Download CV
                                </button>
                            </a>
                            <a href="#contact" className='w-full sm:w-auto'>
                                {/* Shadow පන්තියේ අඩු වී තිබූ ']' වරහන එකතු කර ඇත */}
                                <button className='w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full
                                border-2 dark:border-teal-500 border-teal-600 dark:text-emerald-100 text-teal-900 
                                font-semibold dark:hover:bg-emerald-600 hover:bg-teal-600 hover:text-white hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] 
                                transition-all duration-300 transform hover:scale-105 whitespace-nowrap'>
                                    <Mail size={18}/> Hire Me
                                </button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero