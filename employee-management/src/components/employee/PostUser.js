import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

export default function PostUser() {
    const [formdata,setFormdata]=useState({
        name:"",
        email:"",
        phone:"",
        department:"",
    })
     
    const handleInputChange = (event) =>{
      const {name,value}=event.target;
      setFormdata({
        ...formdata,
        [name]:value,
      })
    }

    const handleSubmit = async (e) =>{
      e.preventDefault();
      console.log(formdata)

      const response = await fetch("http://localhost:8080/api/employee",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formdata),
      })
      const data = await response.json()
    }

  return (
  <div>
    <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicName">
            <Form.Control
            type="text"
            name='name'
            placeholder='Enter Name'
            value={formdata.name}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Control
            type="text"
            name='email'
            placeholder='Enter Email'
            value={formdata.email}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Control
            type="text"
            name='phone'
            placeholder='Enter Phone'
            value={formdata.phone}
            onChange={handleInputChange}
            />
        </Form.Group>
        <Form.Group controlId="formBasicName">
            <Form.Control
            type="text"
            name='department'
            placeholder='Enter Department'
            value={formdata.department}
            onChange={handleInputChange}
            />
        </Form.Group>

        <Button type='submit'>
          Post Employee
        </Button>
    </Form>
    </div>
  )
}
