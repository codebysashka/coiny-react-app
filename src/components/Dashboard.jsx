import SavingsForm from './SavingsForm'
import SavingsList from './SavingsList'
import TransactionList from './TransactionList'
import TransactionForm from './TransactionForm'
import Header from './Header'
import { useEffect, useState } from 'react'
import Navigation from './Navigation'
import TransactionsPage from './TransactionsPage'
import CurrencyPage from './CurrencyPage'
import MonthlyOverviewPage from './MonthlyOverviewPage'

const Dashboard = () => {
	const [transaction, setTransaction] = useState(() => {
		const savedData = localStorage.getItem('transactions')
		return savedData ? JSON.parse(savedData) : []
	})
	const [savings, setSavings] = useState(() => {
		const savedData = localStorage.getItem('savings')
		return savedData ? JSON.parse(savedData) : []
	})
	const totalBalance = transaction.reduce((acc, item) => {
		return item.type === 'income' ? acc + item.amount : acc - item.amount
	}, 0)
	const [activeTab, setActiveTab] = useState('home')
	const [rates, setRates] = useState({})
	const [budgets, setBudgets] = useState(() => {
		const savedData = localStorage.getItem('budgets')
		return savedData ? JSON.parse(savedData) : []
	})

	useEffect(() => {
		localStorage.setItem('budgets', JSON.stringify(budgets))
	}, [budgets])

	useEffect(() => {
		localStorage.setItem('transactions', JSON.stringify(transaction))
	}, [transaction])

	useEffect(() => {
		localStorage.setItem('savings', JSON.stringify(savings))
	}, [savings])

	useEffect(() => {
		const getRates = async () => {
			try {
				const response = await fetch('https://v6.exchangerate-api.com/v6/698f2d5d57c85a5953412859/latest/RUB')
				const data = await response.json()

				if (data.result === 'success') {
					setRates(data.conversion_rates)
					console.log("Rates updated:", data.conversion_rates)
				}
			} catch (error) {
				console.error("Error fetching rates:", error)
			}
		}
		getRates()
	}, [])

	const addTransaction = (newTransaction) => {
		setTransaction([...transaction, newTransaction])
	}

	const deleteTransaction = (id) => {
		setTransaction(transaction.filter(item => item.id !== id))
	}

	const addSavings = (newSavings) => {
		setSavings([...savings, newSavings])
	}

	const deleteSavings = (id) => {
		setSavings(savings.filter(item => item.id !== id))
	}

	const depositToSavings = (savingsId, amount) => {
		const targetGoal = savings.find(item => item.id === savingsId)
		if (!targetGoal) return

		const updatedSavings = savings.map((item) => {
			if (item.id === savingsId) {
				return { ...item, current: item.current + amount }
			}
			return item
		})
		setSavings(updatedSavings)

		const depositTransaction = {
			id: Date.now(),
			text: `Deposit to ${targetGoal.title}`,
			amount: amount,
			type: 'expense',
			category: 'savings',
			date: new Date().toISOString().split('T')[0]
		}
		addTransaction(depositTransaction)
	}

	const withdrawFromSavings = (savingsId, amount) => {
		const targetGoal = savings.find(item => item.id === savingsId)
		if (!targetGoal) return

		if (amount > targetGoal.current) {
			alert('Not enough money in this goal!')
			return
		}
		const updatedSavings = savings.map(item =>
			item.id === savingsId ? { ...item, current: item.current - amount } : item
		)
		setSavings(updatedSavings)

		const withdrawTransaction = {
			id: Date.now(),
			text: `Withdraw from ${targetGoal.title}`,
			amount: amount,
			type: 'income',
			category: 'savings',
			date: new Date().toISOString().split('T')[0]
		};
		addTransaction(withdrawTransaction)
	}

	const updateBudget = (month, category, amount) => {
		setBudgets(prev => ({
			...prev,
			[month]: {
				...(prev[month] || {}),
				[category]: amount
			}
		}))
	}

	return (
		<>
			<Navigation
				setActiveTab={setActiveTab}
				activeTab={activeTab}
			/>
			{activeTab === 'home' && (
				<main>
					<Header
						balance={totalBalance}
					/>
					<div className='home'>
						<section className='left-side'>
							<TransactionForm
								onAdd={addTransaction}
							/>
							<h3>Recent Transactions</h3>
							<TransactionList
								items={transaction}
								onDelete={deleteTransaction}
							/>
						</section>
						<section className='right-side'>
							<SavingsForm
								onAdd={addSavings}
							/>
							<SavingsList
								items={savings}
								onDelete={deleteSavings}
								onDeposit={depositToSavings}
								onWithdrow={withdrawFromSavings}
							/>
						</section>
					</div>
				</main>
			)}
			{activeTab === 'transactions' && (
				<main>
					<h2>All Transactions History</h2>
					<TransactionsPage
						items={transaction}
						setTransaction={setTransaction}
						onAdd={addTransaction}
					/>
				</main>
			)}
			{activeTab === 'overview' && (
				<main>
					<h2>Monthly Overview & Analytics</h2>
					<MonthlyOverviewPage
						transactions={transaction}
						budgets={budgets}
						onUpdate={updateBudget}
					/>
				</main>
			)}
			{activeTab === 'currency' && (
				<main>
					<h2>Currency Settings</h2>
					<CurrencyPage
						rates={rates}
						totalBalance={totalBalance}
					/>
				</main>
			)}
		</>
	)
}

export default Dashboard