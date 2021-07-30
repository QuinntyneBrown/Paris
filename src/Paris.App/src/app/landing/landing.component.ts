import { TemplateResult, html, render } from "lit-html";
import { BehaviorSubject } from "rxjs";
import { styleMap } from 'lit-html/directives/style-map.js';

export class LandingComponent extends HTMLElement {
    constructor() {
        super();
    }

    styles = {
        color: "red",
        backgroundColor: "blue",
        lineHeight: "4em",
        display: "block",
        fontFamily:"sans-serif"
      };

    public value$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public message: string;
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    public get template(): TemplateResult {
        return html`
            <h1 style=${styleMap(this.styles)}>Works?</h1>
        `;
    }

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        render(this.template, this.shadowRoot)    
    }
    
    attributeChangedCallback (name:any, oldValue:any, newValue:any) {
        switch (name) {
            case "message":
                this.message = newValue;                
                break;
        }
    }
}

window.customElements.define(`ce-landing`,LandingComponent);