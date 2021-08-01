import { ControlValueAccessor } from "./control-value-accessor";

export interface FormControl extends ControlValueAccessor {
    value:any;
}