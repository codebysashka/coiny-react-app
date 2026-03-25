import { useState } from "react"
import Amount from "../components/ui/Amount"
import Input from "../components/ui/Input"
import '../styles/CurrencyPage.css'

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
	const currencyNames = new Intl.DisplayNames(['en'], { type: 'currency' })

	const rateFrom = rates[sourceCurrency] || 1
	const rateTo = rates[targetCurrency] || 1
	const convertedResult = (converterAmount / rateFrom) * rateTo
	const convertedBalance = totalBalance * (rates[viewCurrency] || 0)

	return (
		<div className="currency-page-container">
			<h2 className="page-title">Exchange Hub</h2>

			<div className="currency-grid">
				<section className="currency-card balance-viewer">
					<div className="card-header">
						<h3>Balance Viewer</h3>
					</div>
					<div className="balance-info">
						<p className="label">Current balance</p>
						<div className="main-amount">
							<Amount value={totalBalance} showColor={false} />
						</div>
					</div>
					<div className="conversion-controls">
						<p className="label">View in different currency:</p>
						<select
							className="input-simple"
							value={viewCurrency}
							onChange={(e) => setViewCurrency(e.target.value)}
						>
							{codes.map(code => (
								<option key={code} value={code}>{currencyNames.of(code)} ({code})</option>
							))}
						</select>
					</div>
					<div className="result-display">
						<span className="converted-label">Converted Balance:</span>
						<div className="converted-value">
							{convertedBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
							<span className="currency-code">{viewCurrency}</span>
						</div>
					</div>
				</section>

				<section className="currency-card quick-converter">
					<div className="card-header">
						<h3>Quick Converter</h3>
					</div>
					<div className="converter-inputs">
						<div className="input-group">
							<label className="label">Amount</label>
							<Input
								className="input-simple"
								type="number"
								value={converterAmount}
								onChange={(e) => setConverterAmount(e.target.value)}
							/>
						</div>
						<div className="selectors-row" style={{ marginTop: '18px'}}>
							<select className="input-simple" value={sourceCurrency} onChange={(e) => setSourceCurrency(e.target.value)}>
								{codes.map(code => <option key={code} value={code}>{currencyNames.of(code)} ({code})</option>)}
							</select>
							<span className="swap-icon">⇄</span>
							<select className="input-simple" value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
								{codes.map(code => <option key={code} value={code}>{currencyNames.of(code)} ({code})</option>)}
							</select>
						</div>
					</div>
					<div className="converter-result">
						<div>
							<div className="res-val">{convertedResult.toFixed(4)}</div>
							<div className="res-name">{currencyNames.of(targetCurrency)}</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	)
}

export default CurrencyPage