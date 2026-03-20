const Input = (props) => {
	const { 
		value, 
		onChange, 
		type = 'text', 
		placeholder, 
		name, 
		...rest 
	} = props

	return (
		<input
			type={type}
			value={value}
			name={name}
			placeholder={placeholder}
			onChange={onChange}
			{...rest} 
		/>
	)
}

export default Input