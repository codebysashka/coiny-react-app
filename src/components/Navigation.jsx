
const Navigation = (props) => {
	const {
		setActiveTab,
	} = props

	return (
		<>
			<button onClick={() => setActiveTab('home')}>Home</button>
			<button onClick={() => setActiveTab('transactions')}>All Transactions</button>
			<button onClick={() => setActiveTab('overview')}>Monthly overview</button>
			<button onClick={() => setActiveTab('currency')}>Exchange rate</button>
		</>
	)
}

export default Navigation