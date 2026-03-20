import { useState } from "react"
import Amount from "../components/ui/Amount"
import Input from "../components/ui/Input"

const CurrencyPage = (props) => {
	const {
		rates,
		totalBalance,
	} = props

	const [converterAmount, setConverterAmount] = useState(1)
	const [targetCurrency, setTargetCurrency] = useState('USD')
	const [sourceCurrency, setSourceCurrency] = useState('RUB')
	const [viewCurrency, setViewCurrency] = useState('USD')

	const codes = Object.keys(rates)

	const rateFrom = rates[sourceCurrency] || 1
	const rateTo = rates[targetCurrency] || 1
	const convertedResult = (converterAmount / rateFrom) * rateTo

	const convertedBalance = totalBalance * (rates[viewCurrency] || 0)

	const currencyNames = new Intl.DisplayNames(['en'], { type: 'currency' })

	return (
		<div>
			<section>
				<h3>Balance Viewer</h3>
				<p>Your total balance in RUB is: <Amount value={totalBalance} showColor={false} /></p>
				<select value={viewCurrency} onChange={(e) => setViewCurrency(e.target.value)}>
					{codes.map(code => (
						<option key={code} value={code}>
							{currencyNames.of(code)} ({code})
						</option>
					))}
				</select>
				<p>In {viewCurrency} it would be: {convertedBalance.toFixed(2)} {viewCurrency}</p>
			</section>
			<hr />
			<section>
				<h3>Quick Currency Converter</h3>
				<Input
					name='value'
					type="number"
					value={converterAmount}
					onChange={(e) => setConverterAmount(e.target.value)}
				/>
				<select value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
					{codes.map(code => (
						<option key={code} value={code}>
							{currencyNames.of(code)} ({code})
						</option>
					))}
				</select>
				<span> ⇄ </span>
				<select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
					{codes.map(code => (
						<option key={code} value={code}>
							{currencyNames.of(code)} ({code})
						</option>
					))}
				</select>
				<h4>Result: {convertedResult.toFixed(4)} {targetCurrency}</h4>
			</section>
		</div>
	)
}

export default CurrencyPage