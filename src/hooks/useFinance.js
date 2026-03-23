import { useState, useEffect } from "react"

export const useFinance = () => {
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

	const [editingTransaction, setEditingTransaction] = useState(null)
	const [editingSaving, setEditingSaving] = useState(null)

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

	const updateTransaction = (updatedItem) => {
		const newItems = transaction.map((item) => {
			if (item.id === updatedItem.id) {
				return updatedItem
			}
			return item
		})
		setTransaction(newItems)
		setEditingTransaction(null)
	}

	const updateSaving = (updatedSaving) => {
		const newSavings = savings.map((item) => {
			if (item.id === updatedSaving.id) {
				return updatedSaving
			}
			return item
		})
		setSavings(newSavings)
		setEditingSaving(null)
	}

	return {
		transaction, setTransaction,
		savings, setSavings,
		totalBalance,
		rates,
		budgets,
		activeTab, setActiveTab,
		editingTransaction, setEditingTransaction,
		editingSaving, setEditingSaving,
		addTransaction, deleteTransaction, updateTransaction,
		addSavings, deleteSavings, updateSaving,
		depositToSavings, withdrawFromSavings, updateBudget
	}

}