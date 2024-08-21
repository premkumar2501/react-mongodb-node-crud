import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

function UpdateUser() {

    const { id } = useParams()

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [warning, setWarning] = useState(null)

    const FetchData = async () => {
        try {
            const responce = await axios.get('http://localhost:7000/getUser/' + id)
            const responceData = responce.data

            // responceData was contain the one object

            setName(responceData.name)
            setEmail(responceData.email)
            setAge(responceData.age)

        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        FetchData()
    }, [])

    const updateData = async (e) => {
        try {
            e.preventDefault()
            const update = await axios.put('http://localhost:7000/updateUser/'+id,{name:name,email:email,age:age})
            if((update.data).message === 'success'){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your data Update successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            }   
            if((update.data).message === 'wrong_data')  {
                setWarning('Please, Enter the valid detail.')
            }    

        } catch (error) {
            console.log(error,'Update Error.');
        }
    }

    return (
        <div className='d-flex flex-column wh-100 vh-100 justify-content-center align-items-center p-10'>
            <h1>Update Data</h1>

            {warning ? (
                <p style={{color:'red'}}>{warning}</p>
            ) : (null)}

            <Form className='w-50'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={name} placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={email} placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Age</Form.Label>
                    <Form.Control typeof='text' value={age} placeholder="Enter your phone" onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Button variant="success" onClick={updateData}>Update</Button>
            </Form>
        </div>

    )
}

export default UpdateUser