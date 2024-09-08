import EditorJsToHtml from 'editorjs-html';

export const tableRenderer = (block: any) => {
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

export const checklistRenderer = (block: any) => {
    const { items } = block.data;
    const listItems = items.map((item: any) => {
        const checked = item.checked ? 'checked' : '';
        return `<li><input type="checkbox" ${checked} disabled> ${item.text}</li>`;
    }).join('');
    return `<ul>${listItems}</ul>`;
};

export const listRenderer = (block: any) => {
    const { style, items } = block.data;
    const listTag = style === 'ordered' ? 'ol' : 'ul';
    const listItems = items.map((item: any) => `<li>${item}</li>`).join('');
    return `<${listTag}>${listItems}</${listTag}>`;
};

// export this class raw-html to render raw html from global.css file
export const rawHtmlRenderer = (block: any) => {
    console.log(block.data.html);

    return `
  <pre class="raw-html">
            ${block.data.html}
            <button onclick="copyToClipboard(this)" class="copy-button">
                📋
            </button>
        </pre>
    `
};

// Define the copyToClipboard function in the global scope
function copyToClipboard(button: HTMLButtonElement) {
    const pre = button.parentElement as HTMLElement;
    const range = document.createRange();
    range.selectNodeContents(pre);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('copy');
    selection.removeAllRanges();
    alert('Copied to clipboard');
}

// Attach the function to the window object
(window as any).copyToClipboard = copyToClipboard;



const customParsers = {
    table: tableRenderer,
    checklist: checklistRenderer,
    list: listRenderer,
    raw: rawHtmlRenderer,
};


const editorJsToHtml = EditorJsToHtml(customParsers);

export const convertEditorJsToHtml = (data: any) => {
    return editorJsToHtml.parse(data).join('');
};