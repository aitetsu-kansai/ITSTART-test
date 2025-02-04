import React, { useEffect, useState } from 'react'
import { deleteSeminar, getSeminars } from '../../utils/api'
import Seminar from '../Seminar/Seminar'
import style from './SeminarsList.module.scss'

function SeminarsList() {
	const [seminars, setSeminars] = useState([])

	const handleDeleteSeminar = async id => {
		try {
			await deleteSeminar(id)
			setSeminars(prev => prev.filter(seminar => seminar.id !== id))
		} catch (error) {
			alert(`Ошибка: ${error}`)
		}
	}

	useEffect(() => {
		const fetchData = async () => {
			try {
				const data = await getSeminars()

				setSeminars(data)
			} catch (err) {
				alert(err.message)
			}
		}
		fetchData()
	}, [])
	return (
		<div>
			<h2>Список семинаров:</h2>
			<div className={style['seminars']}>
				{seminars.map(seminar => {
					return (
						<Seminar
							key={seminar.id}
							title={seminar.title}
							id={seminar.id}
							description={seminar.description}
							date={seminar.date}
							time={seminar.time}
							photo={seminar.photo}
							onClick={() => handleDeleteSeminar(seminar.id)}
							setSeminars={setSeminars}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default SeminarsList
