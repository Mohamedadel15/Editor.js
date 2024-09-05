'use client';

import Output from 'editorjs-react-renderer';

export default function App({content}: { content: object }) {
    return (
        <>
            <Output
                data={content}
            />
        </>
    )
}