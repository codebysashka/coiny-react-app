import '../../styles/Input.css'

const Input = (props) => {
	const {
		label,
		value,
		onChange,
		type = 'text',
		placeholder,
		name,
		...rest
	} = props

	return (
		<div className="input-field-group">
			{label && <label className="field-label">{label}</label>}
			<input
				type={type}
				value={value}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				{...rest}
			/>
		</div>
	)
}

export default Input