import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function PostUser() {

    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState('')
    const [warning,setWarning] = useState(null)

    const handleSubmit = async () => {      //192.168.60.127

        if (name && email && age) {
            const submit = await axios.post('http://localhost:7000/createUser', { name: name, email: email, age: age })
            if ((submit.data).message === 'success') {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Your data add successfully.",
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate('/')
            }else{
                setWarning(<p style={{color:'red'}}>Please enter the valid details</p>)               
            }
        }else{
            setWarning(<p style={{color:'red'}}>Please fill all details</p>)
        }

    }
    return (
        <div className='d-flex flex-column wh-100 vh-100 justify-content-center align-items-center p-10'>
            <h1>Add Data</h1>
            {warning}
            <Form className='w-50'>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your name" onChange={e => setName(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Age</Form.Label>
                    <Form.Control typeof='text' placeholder="Enter your phone" onChange={e => setAge(e.target.value)} />
                </Form.Group>
                <Button variant="success" onClick={handleSubmit}>Add</Button>
            </Form>
        </div>

    )
}

export default PostUser