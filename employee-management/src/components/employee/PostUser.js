import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './PostUser.css';

export default function PostUser() {
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
    });
    
    const navigate = useNavigate(); 
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formdata);

        const response = await fetch("http://localhost:8080/api/employee", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formdata),
        });
        
        if (response.ok) { 
            const data = await response.json();
            console.log(data);

           
            navigate('/'); 
        } else {
            console.error("Failed to post employee");
        }
    };

    return (
        <div className='form-container'>
            <h1 className='form-title'>Add Employee</h1>
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <input
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={formdata.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter Email"
                        value={formdata.email}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="tel"
                        name="phone"
                        placeholder="Enter Phone"
                        value={formdata.phone}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className='form-group'>
                    <input
                        type="text"
                        name="department"
                        placeholder="Enter Department"
                        value={formdata.department}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit" className='submit-button'>
                    Post Employee
                </button>
            </form>
        </div>
    );
}
