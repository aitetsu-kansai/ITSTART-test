const BASE_URL = 'http://localhost:3000/seminars'

export const getSeminars = async () => {
	try {
		const response = await fetch(BASE_URL)
		if (!response.ok) throw new Error('Ошибка получения данных')
		return await response.json()
	} catch (err) {
		alert(err.message)
	}
}

export const deleteSeminar = async id => {
	try {
		const response = await fetch(`${BASE_URL}/${Number(id)}`, {
			method: 'DELETE',
		})
		if (!response.ok) throw new Error('Ошибка удаления')
	} catch (error) {
		alert(`Ошибка ${error}`)
	}
}

export const updateSeminar = async (id, updatedData) => {
	try {
		const response = await fetch(`${BASE_URL}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updatedData),
		})

		if (!response.ok) throw new Error('Ошибка обновления')

		return await response.json()
	} catch (error) {
		alert(`Ошибка: ${error.message}`)
	}
}
