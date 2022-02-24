type InputType = {
    styles?: string;
    type?: string;
    placeholder: string;
    name: string;
}
const Input = ({ styles, placeholder, type = "text", name }: InputType) => {
    return <input
        type={type}
        placeholder={placeholder}
        name={name}
        className={`
    bg-slate-800 p-3 rounded-md mb-3 ${styles} `}
    />
}
export default Input