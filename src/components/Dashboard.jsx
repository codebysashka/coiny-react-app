import SavingsForm from './SavingsForm'
import SavingsList from './SavingsList'
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'
import Header from './Header'
import { useEffect, useState } from 'react'

const Dashboard = () => {
	const [transaction, setTransaction] = useState(() => {
		const savedData = localStorage.getItem('transactions')
		return savedData ? JSON.parse(savedData) : []
	})
	const [savings, setSavings] = useState([])
	const totalBalance = transaction.reduce((acc, item) => { return item.type === 'income' ? acc + item.amount : acc - item.amount; }, 0)

	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transaction))
	}, [transaction])

	const addTransaction = (newTransaction) => {
		setTransaction([...transaction, newTransaction])
	}

	const deleteTransaction = (id) => {
		setTransaction(transaction.filter(item => item.id !== id))
	}

	return (
		<>
			<Header
				balance={totalBalance}
			/>
			<TransactionForm
				onAdd={addTransaction}
			/>
			<TransactionList
				items={transaction}
				onDelete={deleteTransaction}
			/>
			<SavingsForm />
			<SavingsList />
		</>
	)
}

export default Dashboard