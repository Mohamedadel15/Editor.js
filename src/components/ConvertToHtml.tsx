'use client';

// import {useEffect, useState} from 'react';
// import {convertEditorJsToHtml} from '@/utils/editorJsToHtml';
import editorStyles from '@/style/EditorStyle.module.css';


const ConvertToHtml = ({content} : {content : string}) => {
    // const [content, setContent] = useState<string | null>(null);

    // useEffect(() => {
    //     const savedContent = localStorage.getItem('content');
    //     if (savedContent) {
    //         const jsonData = JSON.parse(savedContent);
    //         const htmlContent = convertEditorJsToHtml(jsonData);
    //         setContent(htmlContent);
    //     }
    // }, []);
    return (
        <div className={editorStyles['editorjs-content']}  dangerouslySetInnerHTML={{__html: content || ''}}/>
    );
};

export default ConvertToHtml;