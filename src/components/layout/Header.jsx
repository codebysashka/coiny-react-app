import Amount from "../ui/Amount"

const Header = (props) => {
	const {
		balance,
	} = props

	return (
		<>
		<h1>Coiny</h1>
		<h2>Current Balance: <Amount value={balance} /></h2>
		</>
	)
}

export default Header