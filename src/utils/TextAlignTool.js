'use strict';

class TextAlignTool {
    static leftAlignedIcon = '<path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3"/>'
    static centerAlignedIcon = '<path d="M19 9.5H5M21 4.5H3M21 14.5H3M19 19.5H5"/>'
    static rightAlignedIcon = '<path d="M21 9.5H7M21 4.5H3M21 14.5H3M21 19.5H7"/>' //'<path d="M17 9.5H3M21 4.5H3M21 14.5H3M17 19.5H3"/>'
    static justifyAlignedIcon = '<path d="M21 9.5H3M21 4.5H3M21 14.5H3M21 19.5H3"/>'

    static get isInline() {
        return true;
    }
    constructor({ api }) {
        this.currenticon = '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2" stroke-linecap="square" stroke-linejoin="arcs"></svg>';
        this.aligncurrenticon = new DOMParser().parseFromString(this.currenticon,'application/xml');
        this.button = null;
        this.state = "left";
        this.api = api;
    }

    render() {
        this.button = document.createElement('button');
        this.button.classList = 'ce-inline-tool ce-inline-tool--align-text';
        this.button.appendChild(this.button.ownerDocument.importNode(this.aligncurrenticon.documentElement, true));
        this.setIcon();
        return this.button;
    }

    // surround(range) {
    //     const firstParentNode = this.getParentNode(range.commonAncestorContainer);
    //     if (this.state === "left") {
    //         firstParentNode.style.textAlign = "center";
    //         this.state = "center";
    //     }
    //     else if (this.state === "center") {
    //         firstParentNode.style.textAlign = "right";
    //         this.state = "right";
    //     }
    //     else if (this.state === "right") {
    //         firstParentNode.style.textAlign = "justify";
    //         this.state = "justify";
    //     }
    //     else if (this.state === "justify") {
    //         firstParentNode.style.textAlign = "left";
    //         this.state = "left";
    //     }
    // }

    surround(range) {
        const firstParentNode = this.getParentNode(range.commonAncestorContainer);

        // Update text alignment
        if (this.state === "left") {
            firstParentNode.style.textAlign = "center";
            this.state = "center";
        }
        else if (this.state === "center") {
            firstParentNode.style.textAlign = "right";
            this.state = "right";
        }
        else if (this.state === "right") {
            firstParentNode.style.textAlign = "justify";
            this.state = "justify";
        }
        else if (this.state === "justify") {
            firstParentNode.style.textAlign = "left";
            this.state = "left";
        }

        // Add data-alignment attribute for block data
        firstParentNode.setAttribute('data-alignment', this.state);

    }

    checkState(text){
        if (!text) {
            return;
        }
        this.setIcon();
    }

    // Find parent node until it is DIV or Paragraph
    getParentNode(node){
        if (node?.parentNode?.tagName === "DIV" || node?.parentNode?.tagName === "p") {
            return node.parentNode
        }
        else {
            return this.getParentNode(node.parentNode)
        }

    }

    setIcon(){
        if (this.state === "" || this.state === "left"){
            this.button.childNodes[0].innerHTML = TextAlignTool.leftAlignedIcon;
        }
        else if (this.state === "center"){
            this.button.childNodes[0].innerHTML = TextAlignTool.centerAlignedIcon;
        }
        else if (this.state === "right"){
            this.button.childNodes[0].innerHTML = TextAlignTool.rightAlignedIcon;
        }
        else if (this.state === "justify"){
            this.button.childNodes[0].innerHTML = TextAlignTool.justifyAlignedIcon;
        }
    }
}

module.exports = TextAlignTool;
// Outputs the current alignment state

