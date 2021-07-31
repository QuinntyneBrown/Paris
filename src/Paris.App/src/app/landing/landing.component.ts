import { TemplateResult, html, render } from "lit-html";
import { BehaviorSubject, map, of, Subject, tap } from "rxjs";
import { StyleInfo, styleMap } from 'lit-html/directives/style-map.js';
import { toDoService } from "../@api";

import "./landing.component.scss";

//https://www.robinwieruch.de/webpack-sass

let styles: StyleInfo = {
    fontFamily: "var(--font-family)",
  };

export class LandingComponent extends HTMLElement {
    private readonly _destroyed$: Subject<void> = new Subject();

    constructor(
        private readonly _toDoService = toDoService
    ) {
        super();

    }

    private readonly _vm$ = of(true);

    public value$: BehaviorSubject<boolean> = new BehaviorSubject(true);

    public message: string;
    
    static get observedAttributes() {
        return [
            "message"
        ];
    }

    connectedCallback() {    

        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        this._vm$
        .pipe(
            map(x => {
                return html`
                <h1 style=${styleMap(styles)}>Works?</h1>            
                `;
            }),
            tap(
                template => render(template, this.shadowRoot) 
            )
        ).subscribe();   
    }
    
    attributeChangedCallback (name:any, oldValue:any, newValue:any) {
        switch (name) {
            case "message":
                this.message = newValue;                
                break;
        }
    }

    disconnectCallback() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}

window.customElements.define(`ce-landing`,LandingComponent);