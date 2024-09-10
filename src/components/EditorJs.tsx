'use client';

import React, {useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import CheckList from "@editorjs/checklist";
import Code from "@editorjs/code";
import Delimiter from "@editorjs/delimiter";
import Embed from "@editorjs/embed";
import InlineCode from "@editorjs/inline-code";
import List from "@editorjs/list";
import Quote from "@editorjs/quote";
import Table from "@editorjs/table";
import Paragraph from "@editorjs/paragraph";
import Header from "@editorjs/header";
import Raw from "@editorjs/raw";
// import TextAlign from "@canburaks/text-align-editorjs"
import TextAlignTool from "@/utils/TextAlignTool";

const EDITOR_TOOLS = {
    code: Code,
    header: {
        class: Header,
        shortcut: "CMD+H",
        inlineToolbar: true,
        config: {
            placeholder: "Enter a Header",
            levels: [1,2, 3, 4,5,6],
            defaultLevel: 1,
        },
    },
    paragraph: {
        class: Paragraph,
        // shortcut: 'CMD+P',
        inlineToolbar: true,
    },
    checklist: CheckList,
    inlineCode: InlineCode,
    table: Table,
    list: List,
    quote: Quote,
    delimiter: Delimiter,
    raw: {
        class: Raw,
        inlineToolbar: true,
    },
    embed: Embed,
    textAlign: {
        class: TextAlignTool,
        inlineToolbar: true,
    },
};

function Editor({data, onChange, holder}: {
    data: object | null,
    onChange: (data: any) => void,
    holder: string
}) {
    //add a reference to editor
    const ref = useRef();
    //initialize editorjs
    useEffect(() => {
        //initialize editor if we don't have a reference
        if (!ref.current) {
            const editor = new EditorJS({
                holder: holder,
                placeholder: "Start writting here..",
                tools: EDITOR_TOOLS,
                data,
                async onChange(api, event) {
                    const content = await api.saver.save();
                    onChange(content);
                    editor.save().then((outputData) => {
                        console.log(outputData)
                        outputData.blocks.forEach(block => {
                            if (block.type === 'paragraph') {
                                block.data.alignment = block.data.alignment || 'left'; // Add default alignment if missing
                            }
                        });
                    });

                },
            });

            ref.current = editor;
        }

        //add a return function handle cleanup
        return () => {
            if (ref.current && ref.current.destroy) {
                ref.current.destroy();
            }
        };
    }, []);

    return (
        <>
            <div
                id={holder}
                style={{
                    width: "100%",
                    minHeight: 500,
                    borderRadius: " 7px",
                    background: "fff",
                }}
            />
        </>
    );
}

export default Editor;