import Button from "../ui/Button"

const Navigation = (props) => {
	const {
		activeTab,
		setActiveTab,
	} = props

	return (
		<>
			<Button onClick={() => setActiveTab('home')} variant={activeTab === 'home' ? 'active' : 'primary'} >Home</Button>
			<Button onClick={() => setActiveTab('transactions')} variant={activeTab === 'home' ? 'active' : 'primary'} >All Transactions</Button>
			<Button onClick={() => setActiveTab('overview')} variant={activeTab === 'home' ? 'active' : 'primary'} >Monthly overview</Button>
			<Button onClick={() => setActiveTab('currency')} variant={activeTab === 'home' ? 'active' : 'primary'} >Exchange rate</Button>
		</>
	)
}

export default Navigation