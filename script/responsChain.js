export default class responsabilityChainAppendChild {
    constructor(element) {
        this.element = element;
    }

    appendChildElement(child) {
        this.element.appendChild(child);
        return this;
    }  
}
