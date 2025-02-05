import { useCallback, useState } from 'react'
import { RiEditFill } from 'react-icons/ri'
import { updateSeminar } from '../../utils/api.js'
import Dropdown from '../UI-Components/Drowdown/Dropdown.jsx'
import Form from '../UI-Components/Form/Form.jsx'
import '../UI-Components/Form/Form.scss'
import Loader from '../UI-Components/Loader/Loader.jsx'
import Modal from '../UI-Components/Modal/Modal.jsx'
import style from './Seminar.module.scss'

function Seminar({
	title,
	id,
	date,
	time,
	photo,
	description,
	onClick,
	setSeminars,
}) {
	const [isUpdating, setIsUpdating] = useState(false)
	const [updateError, setUpdateError] = useState('')
	const [imgIsLoading, setImgIsLoading] = useState(true)

	const [formData, setFormData] = useState({
		title,
		photo,
		description,
	})

	const [modalIsActive, setModalIsActive] = useState(false)

	const handleInputChange = e => {
		const { name, value } = e.target
		setFormData(prev => ({ ...prev, [name]: value }))
	}

	const handleUpdateSeminar = useCallback(
		async (e, id) => {
			e.preventDefault()
			setUpdateError('')

			if (!formData.title.trim()) {
				setUpdateError('Название не может быть пустым!')
				return
			}

			setIsUpdating(true)
			try {
				const updatedSeminar = await updateSeminar(id, formData)

				if (!updatedSeminar)
					throw new Error('Ошибка обновления. Попробуйте позже.')

				setSeminars(prev =>
					prev.map(seminar => (seminar.id === id ? updatedSeminar : seminar))
				)
			} catch (err) {
				setUpdateError(err.message)
			} finally {
				setIsUpdating(false)
				setModalIsActive(false)
			}
		},
		[id, formData, setSeminars]
	)

	return (
		<div className={style['seminar']}>
			<div className={style['seminar__date-info']}>
				<p>{`${date} в ${time}`}</p>
				<div className={style['seminar__tools']}>
					<RiEditFill
						onClick={() => setModalIsActive(true)}
						title='Редактировать семинар'
					/>
					<Dropdown title='Подтвердите удаление'>
						<button onClick={() => onClick(id)}>Удалить</button>
					</Dropdown>
				</div>
			</div>
			<h4>{`${id}. ${title}`}</h4>
			{imgIsLoading && <Loader />}
			<img
				src={photo}
				alt=''
				onLoad={() => setImgIsLoading(false)}
				onError={e => {
					setImgIsLoading(false)
					e.target.src =
						'https://png.pngtree.com/png-vector/20190820/ourmid/pngtree-no-image-vector-illustration-isolated-png-image_1694547.jpg'
				}}
			/>

			<p>{description}</p>
			<Modal active={modalIsActive} setActive={setModalIsActive}>
				<div className={style['seminar__editor']}>
					<h5>{`Изменение семинара №${id}`}</h5>

					{updateError && <p>{updateError}</p>}
					<Form
						onSubmit={e => handleUpdateSeminar(e, id)}
						disabled={isUpdating}
					>
						<input
							name='title'
							value={formData.title}
							onChange={handleInputChange}
							// required
							maxLength={40}
						/>
						<input
							name='description'
							value={formData.description}
							onChange={handleInputChange}
							maxLength={100}
						/>
						<input
							name='photo'
							value={formData.photo}
							onChange={handleInputChange}
							type='url'
						/>
					</Form>
				</div>
			</Modal>
		</div>
	)
}

export default Seminar
