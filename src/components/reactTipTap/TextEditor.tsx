'use client';

import { useState } from 'react';
import RichTextEditor, { BaseKit, Bold, Color, Blockquote, BulletList, Code, CodeBlock, Clear, FontSize, Heading, Highlight, History, HorizontalRule, Image, Iframe, Italic, LineHeight, Link, MoreMark, ColumnActionButton, SlashCommand, Strike, Table, TaskList, TextAlign, Underline, Video, SearchAndReplace, Emoji, TextDirection, Mention } from 'reactjs-tiptap-editor';

// Import CSS
import 'reactjs-tiptap-editor/style.css';


const extensions = [
    BaseKit.configure({
        // Show placeholder
        placeholder: {
            showOnlyCurrent: true,
        },

        // Character count
        characterCount: {
            limit: 50_000,
        },
    }),
    // Import Extensions Here
    Bold,
    Color,
    Blockquote,
    BulletList,
    Code,
    CodeBlock.configure({ defaultTheme: 'dracula' }),
    Clear,
    FontSize,
    Image.configure({
        upload: (files: File) => {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve(URL.createObjectURL(files))
                }, 500)
            })
        },
    }),
    Heading,
    Highlight,
    History,
    HorizontalRule,
    Iframe,
    Italic,
    LineHeight,
    Link,
    MoreMark,
    ColumnActionButton,

    SlashCommand,
    Strike,
    Table,
    TaskList,
    TextAlign,
    Underline,
    Video,
    SearchAndReplace,
    Emoji,
    TextDirection,
    Mention,

];

const DEFAULT = '';

interface TextEditorProps {
    onChangeContent: (value: string) => void;
}

const TextEditor = ({ onChangeContent }: TextEditorProps) => {
    const [content, setContent] = useState(DEFAULT);

    const handleChangeContent = (value: string) => {
        setContent(value);
        onChangeContent(value);
    };
    return (
        <RichTextEditor
            output='html'
            content={content}
            onChangeContent={handleChangeContent}
            extensions={extensions}
        />
    );
};

export default TextEditor;
