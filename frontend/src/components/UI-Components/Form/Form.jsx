import './Form.scss'

const Form = ({ onSubmit, children, disabled }) => {
	return (
		<div className={'input__container'}>
			<form onSubmit={onSubmit} className={'input__form'}>
				<div className={'input__form-fields'}>{children}</div>
				<button type='submit' disabled={disabled}>
					Подтвердить
				</button>
			</form>
		</div>
	)
}

export default Form
