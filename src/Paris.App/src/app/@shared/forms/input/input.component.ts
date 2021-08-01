import { AbstractFormControl, ControlValueAccessor } from "../abstractions";

export class InputComponent extends AbstractFormControl(HTMLInputElement) implements ControlValueAccessor {
    
    connectedCallback() { 
        this.addEventListener("keyup", () => {
            this.writeValue(this.value);
        });
    }
}

window.customElements.define('lit-input', InputComponent, { extends: 'input' });