import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const Projects = () => {

    /*"Popup එක (Modal එක) දැනට පෙන්වනවාද? නැද්ද?" කියන එක මතක තියාගන්න සහ ඒක පාලනය කරන්න අවශ්‍ය ස්විච් එකක් (Switch) හදාගන්න එකයි.
        මෙහි වරහන් ඇතුළේ ඇති false යන්නෙන් කියන්නේ ආරම්භක අගයයි. වෙබ් පිටුව මුලින්ම ලෝඩ් වෙද්දී අර "Add New Project" ෆෝම් එක (Popup එක) තිරයේ පෙන්වන්න අවශ්‍ය නැහැනේ. ඒක හැංගිලා තියෙන්න ඕනේ. ඒ නිසා අපි මුලින්ම අගය 'වැරදියි' හෙවත් false කියලා දෙනවා.
        isModalOpen (දත්තය මතක තබා ගන්නා පෙට්ටිය): මේක තමයි අර false කියන අගය දාගෙන ඉන්න විචල්‍යය (Variable එක).මේකේ අගය false වෙලා තියෙනකම් අර Popup ෆෝම් එක හැංගිලා තියෙනවා.මේකේ අගය true වුණොත්, කේතයෙන් ස්වයංක්‍රීයවම අර Popup ෆෝම් එක තිරය මතුපිටින් පෙන්වනවා.
        setModalOpen (අගය වෙනස් කරන රිමෝට් එක): මේක තමයි අර isModalOpen කියන පෙට්ටියේ තියෙන අගය වෙනස් කරන්න React වලින් අපිට දෙන ෆන්ක්ෂන් එක (Function). හරියට ටීවී එකේ චැනල් මාරු කරන රිමෝට් එක වගේ. */ 
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className='flex-1 p-6 overflow-y-auto relative'>
            <div>
                <div>
                    <h2 className='text-2xl font-bold text-gray-800 dark:text-white'>Projects Management</h2>
                    <p className='text-sm text-gray-500d'>Manage your portfolio projects and case studies</p>
                </div>
            </div>
        </div>
    );
};

export default Projects;
