import Button from "../ui/Button"
import '../../styles/ModalWindow.css'
import '../../styles/Button.css'
import '../../styles/Input.css'
import ReactDOM from "react-dom"


const ModalWindow = (props) => {
	const {
		isOpen,
		onClose,
		title,
		children
	} = props

	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className="modal-overlay">
			<div className="modal-content">
				<div className="modal-header">
					<h3 className="modal-title">{title}</h3>
					<Button
						onClick={onClose}
						variant='close'>
						X
					</Button>
				</div>
				<div className="modal-body">
					{children}
				</div>
			</div>
		</div>,
		document.body
	)
}

export default ModalWindow