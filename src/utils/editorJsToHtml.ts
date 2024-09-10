import EditorJsToHtml from 'editorjs-html';

interface IEditorJsData {
    time: number;
    version: string;
    blocks: any[];
}

interface IBlock {
    type: string;
    data: {
        content: any[];
        withHeadings: boolean;
        items: any[];
        style: string;
        html: string;
        level: number;
        text: string;
    };
    id: string;
}

// Define the copyToClipboard function in the global scope
function copyToClipboard() {
    const pre = document.getElementById("aa") as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection?.removeAllRanges();
    selection?.addRange(range);
    document.execCommand('copy');
    selection?.removeAllRanges();
    alert('Copied to clipboard');
}

// Attach the function to the window object
if (typeof window !== 'undefined') {
    (window as any).copyToClipboard = copyToClipboard;
}

export const tableRenderer = (block: IBlock) => {
    const { content, withHeadings } = block.data;
    let rows = '';

    if (withHeadings && content.length > 0) {
        const headerCells = content[0].map((cell: any) => `<th>${cell}</th>`).join('');
        rows += `<tr>${headerCells}</tr>`;
        content.shift(); // Remove the first row as it is now used as headers
    }

    rows += content.map((row: any) => {
        const cells = row.map((cell: any) => `<td>${cell}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');

    return `<table>${rows}</table>`;
};

export const checklistRenderer = (block: IBlock) => {
    const { items } = block.data;
    const listItems = items.map((item: any) => {
        const checked = item.checked ? 'checked' : '';
        return `<li><input type="checkbox" ${checked} disabled> ${item.text}</li>`;
    }).join('');
    return `<ul>${listItems}</ul>`;
};

export const listRenderer = (block: IBlock) => {
    const { style, items } = block.data;
    const listTag = style === 'ordered' ? 'ol' : 'ul';
    const listItems = items.map((item: any) => `<li>${item}</li>`).join('');
    return `<${listTag}>${listItems}</${listTag}>`;
};

// export this class raw-html to render raw html from global.css file
export const rawHtmlRenderer = (block: IBlock) => {
    return `<div class="raw-html">
            <pre id="aa">${block.data?.html}</pre>
            <button onclick="copyToClipboard(this)" class="copy-button">
                📋
            </button>
        </div>
    `
};

export const headerRenderer = (block: IBlock) => {
    const { level, text } = block.data;
    return `<h${level}>${text}</h${level}>`;
}

const customParsers = {
    table: tableRenderer,
    checklist: checklistRenderer,
    list: listRenderer,
    raw: rawHtmlRenderer,
    header: headerRenderer,
};

const editorJsToHtml = EditorJsToHtml(customParsers);

export const convertEditorJsToHtml = (data: IEditorJsData) => {
    return editorJsToHtml.parse(data).join('');
};