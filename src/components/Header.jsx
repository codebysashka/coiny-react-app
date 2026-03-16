const Header = (props) => {
	const {
		balance,
	} = props

	return (
		<>
		<h1>Coiny</h1>
		<h2>Current Balance: {balance}</h2>
		</>
	)
}

export default Header