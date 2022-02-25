type InputType = {
    styles?: string;
    type?: string;
    placeholder: string;
    value?: string;
    name: string;
    onChange: (e: any) => void
}
const Input = ({ styles, placeholder, type = "text", value, name, onChange }: InputType) => {
    return <input
        value={value}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`
    bg-slate-800 p-3 rounded-md mb-3 ${styles} `}
        onChange={onChange}
    />
}
export default Input