import EditorJsToHtml from 'editorjs-html';

export const tableRenderer = (block: any) => {
    const {content} = block.data;
    const rows = content.map((row: any) => {
        const cells = row.map((cell: any) => `<td>${cell}</td>`).join('');
        return `<tr>${cells}</tr>`;
    }).join('');
    return `<table>${rows}</table>`;
};

export const checklistRenderer = (block: any) => {
    const {items} = block.data;
    const listItems = items.map((item: any) => {
        const checked = item.checked ? 'checked' : '';
        return `<li><input type="checkbox" ${checked} disabled> ${item.text}</li>`;
    }).join('');
    return `<ul>${listItems}</ul>`;
};

export const listRenderer = (block: any) => {
    const {style, items} = block.data;
    const listTag = style === 'ordered' ? 'ol' : 'ul';
    const listItems = items.map((item: any) => `<li>${item}</li>`).join('');
    return `<${listTag}>${listItems}</${listTag}>`;
};

// export this class raw-html to render raw html from global.css file
export const rawHtmlRenderer = (block: any) => {
    return `<pre class="raw-html">${block.data.html}</pre>`;
};


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