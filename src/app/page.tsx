'use client';

import TextEditor from "@/components/reactTipTap/TextEditor";

export default function HomePage() {
    const handleContentChange = (value: string) => {
        console.log(value);
    }
    return (
        <TextEditor onChangeContent={handleContentChange} />
    );
}
