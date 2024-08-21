import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import './dashboard.css'

function DashBoard() {

	const navigate = useNavigate()

	const [values, setValues] = useState([])
	const getValues = async () => {
		const responce = await axios.get('http://localhost:7000/getUser')
		setValues(responce.data)
	}

	useEffect(() => {
		getValues()
	}, [])

	const updateData = (value) => {
		navigate(`/post/${value._id}`)
	}

	const deleteData = async (id) => {
		try {
			const remove = await axios.delete('http://localhost:7000/deleteUser/' + id)
					
			if ((remove.data).message === 'success') {
				alert('Deleted successfully.')
				window.location.reload()
			}else{
				alert('Something went wrong.')
			}
			
		} catch (error) {
			console.log('Data cannot deleted.', error);
		}
	}

	return (
		<div className='data-container'>
			<div style={{ width: '80%' }}>
				{values.length > 0 ? (
					<Table responsive striped bordered hover size="lg" >
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Email</th>
								<th>Age</th>
								<th colSpan={2}>Options</th>
							</tr>
						</thead>
						<tbody>

							{values.map((value, index) => (
								<tr key={index}>
									<td>{index + 1}</td>
									<td>{value.name}</td>
									<td>{value.email}</td>
									<td>{value.age}</td>
									<td >
										<Button variant="info" onClick={() => updateData(value, index)}>Edit</Button>
									</td>
									<td>
										<Button variant="danger" onClick={() => deleteData(value._id)}>Delete</Button>
									</td>
								</tr>
							))
							}
						</tbody>
					</Table>) : (
					<h1 >No data</h1>
				)}
				<Button variant="outline-secondary" onClick={() => navigate('/post')}>Add Data</Button>
			</div>
		</div>
	)
}

export default DashBoard