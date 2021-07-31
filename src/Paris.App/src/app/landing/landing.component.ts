import { TemplateResult, html, render } from "lit-html";
import { BehaviorSubject } from "rxjs";
import { StyleInfo, styleMap } from 'lit-html/directives/style-map.js';
import { toDoService } from "../@api";

//import {combineReducers} from 'redux';
//import { baseUrl } from "@api/services/to-do.service";

let styles: StyleInfo = {
    color: "black",
    backgroundColor:"red",
    lineHeight: "4em",
    display: "block",
    fontFamily:"sans-serif",
    boxSizing: "border-box",
    margin: "0",
    padding:"0"
  };

export class LandingComponent extends HTMLElement {
    constructor(
        private readonly _toDoService = toDoService
    ) {
        super();

    }

    

    public value$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public message: string;
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    public get template(): TemplateResult {
        return html`
            <h1 class="hello" style=${styleMap(styles)}>Works?</h1>            
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