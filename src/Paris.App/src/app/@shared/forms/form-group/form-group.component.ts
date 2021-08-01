import { html, render } from "lit-html";
import { BehaviorSubject, combineLatest, map, NEVER, Observable, of, Subject, switchMap, takeUntil, tap } from "rxjs";
import { StyleInfo, styleMap } from 'lit-html/directives/style-map.js';

import "./form-group.component.scss";
// import { FormGroupRegistry, formGroupRegistry } from "../form-group-registry";
import { AbstractFormControl, ControlValueAccessor } from "../abstractions";
import { FormControl } from "../abstractions/form-control";
//https://www.robinwieruch.de/webpack-sass

let styles: StyleInfo = {

};


class FormGroupComponent extends AbstractFormControl(HTMLFormElement) implements ControlValueAccessor {
    private readonly _destroyed$ = new Subject();

    private _controls = {};

    public get controls() {
        return this._controls;
    }

    public _value$: BehaviorSubject<any> = new BehaviorSubject(null);

    public valueChanges: Observable<any> = this._value$.asObservable();

    public get value() {
        return this._value$.value;
    }

    static get observedAttributes() {
        return [
            'formGroupName'
        ];
    }

    constructor(
  
    ) {
      super();

    }

    private readonly _attributes$: BehaviorSubject<{ formGroupName?: string }> = new BehaviorSubject({  });

    connectedCallback() { 
        let controls = Array.from(this.querySelectorAll("[formControlName]"));

        for(let i = 0; i < controls.length; i++) {            
            let control = controls[i] as unknown as FormControl;
            let name = controls[i].getAttribute("formControlName");
            control.registerOnChange(x => {
                let o = {};
                o[name] =  x;
                this._value$.next({...this.value, ...o})
            })
        }
    }

    attributeChangedCallback (name:any, oldValue:any, newValue:any) {
        let props = {};
        props[name] = newValue;
        this._attributes$.next({ ...props, ...this._attributes$.value })
    }

    disconnectedCallback() {
        this._destroyed$.next(null);
        this._destroyed$.complete();
    }
}

window.customElements.define('lit-form-group', FormGroupComponent, { extends: 'form' });