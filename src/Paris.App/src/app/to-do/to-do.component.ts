import { html, render } from "lit-html";
import { BehaviorSubject, combineLatest, map, Subject, takeUntil, tap } from "rxjs";
import { StyleInfo } from 'lit-html/directives/style-map.js';

import "./to-do.component.scss";

let styles: StyleInfo = {

};

class ToDoComponent extends HTMLElement {
    private readonly _destroyed$: Subject<void> = new Subject();

    private readonly _attributes$: BehaviorSubject<{

    }> = new BehaviorSubject({ });

    constructor(

    ) {
        super();
    }

    private readonly _vm$ = combineLatest([this._attributes$]);
    
    static get observedAttributes() {
        return [

        ];
    }

    connectedCallback() {    
        if (!this.shadowRoot) this.attachShadow({ mode: 'open' });
  
        this._vm$
        .pipe(
            takeUntil(this._destroyed$),
            map(_ => html`
                <form is="lit-form-group">
                    <input type="text" is="lit-input" formControlName="description">
                </form>
                <button>Save</button>      
            `),
            tap(
                template => render(template, this.shadowRoot) 
            ),
        ).subscribe();   
    }
    
    attributeChangedCallback (name:any, oldValue:any, newValue:any) {
        let props = {};
        props[name] = newValue;
        this._attributes$.next({ ...props, ...this._attributes$.value })
    }

    disconnectedCallback() {
        this._destroyed$.next();
        this._destroyed$.complete();
    }
}

window.customElements.define('lit-to-do', ToDoComponent);