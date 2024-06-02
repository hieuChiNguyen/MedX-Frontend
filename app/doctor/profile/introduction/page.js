'use client'
import React, { useState } from 'react'
import toasts from '../../../components/common/Toast'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'
import Header from '../../../components/common/Header'
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const DoctorIntroductionPage = ({params}) => {
    const doctorId = params.doctorId;
    const router = useRouter()

    // Register plugins if required
    // MdEditor.use(YOUR_PLUGINS_HERE);

    // Initialize a markdown parser
    const mdParser = new MarkdownIt(/* Markdown-it options */);

    // Finish!
    function handleEditorChange({ html, text }) {
        console.log('handleEditorChange', html, text);
    }

    return (
        <main>
            <Header />
            <section className='bg-indigo-50/60 w-[80%] py-10 px-3 mx-auto h-screen'>
                <div className='w-full mx-auto my-10 flex flex-col'>
                    <p className='p-1 my-3 text-lg font-semibold text-gray-700'>Bác sĩ tạo và chỉnh sửa phần giới thiệu </p>
                    <MdEditor style={{ height: '500px'}} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
                    <button href={'/doctor/profile/introduction'} className='my-5 p-3 w-fit rounded-lg bg-blue-400 hover:bg-blue-300'>                                                     
                        Lưu thông tin
                    </button>
                </div>
            </section>
            <ToastContainer />
        </main>
    );
};

export default DoctorIntroductionPage;
