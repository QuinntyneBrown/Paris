import { BehaviorSubject, Subject } from "rxjs";
import { Constructor } from "src/app/@core/abstractions/constructor";
import { ControlValueAccessor } from "./control-value-accessor";
import { ValidationErrors } from "./validation-errors";

export function AbstractFormControl<TBase extends Constructor>(Base: TBase) {
    return class extends Base implements ControlValueAccessor{

        public _value$: BehaviorSubject<any> = new BehaviorSubject(null);

        writeValue(obj: any): void {
            this._value$.next(obj);
        }

        registerOnChange(fn: any): void {
            this._value$
            .pipe(

            ).subscribe(fn);
        }

        registerOnTouched(fn: any): void {

        }
        
        setDisabledState(isDisabled: boolean): void {

        }

        validate(control: any): ValidationErrors {
            return null;
        }
    };
  }