interface IInputProps {
    id: string;
    labelValue: string;
    inputValue: string;
    inputOnChangeFunc: (v: string) => void;
}

export default function Fieldset({ id, labelValue, inputValue, inputOnChangeFunc }: IInputProps) {
    return (
        <fieldset>
            <label htmlFor={id}>{labelValue}</label>
            <input type="text" id={id} value={inputValue} onChange={(ev) => inputOnChangeFunc(ev.target.value)} required />
        </fieldset>
    )
}