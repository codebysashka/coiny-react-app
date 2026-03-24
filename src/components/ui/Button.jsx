import '../../styles/Button.css'

const Button = (props) => {
	const {
		onClick,
		type = 'button',
		variant = 'primary', //close, delete
		children,
		disabled,
	} = props

	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled}
			className={`btn btn-${variant}`} >
			{children}
		</button>
	)
}

export default Button