//import Editorjs component as a dynamic import where ssr is false
'use client';

import {useEffect, useState} from "react";

import dynamic from "next/dynamic";
import ConvertToHtml from "@/components/ConvertToHtml";

const Editor = dynamic(() => import("@/components/EditorJs"), {
    ssr: false,
});


const CreateNewBlog = () => {
    const [content, setContent] = useState(null);
    useEffect(() => {
        if (content) {
            localStorage.setItem("content", JSON.stringify(content));
        }
    }, [content]);

    return (
        <>
            <Editor
                data={content}
                onChange={(e) => setContent(e)}
                holder="editor_create"
            />
            <ConvertToHtml/>
        </>
    )
};

export default CreateNewBlog;