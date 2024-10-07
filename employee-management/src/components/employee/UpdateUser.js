import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; 
import './UpdateUser.css';
import { useNavigate } from 'react-router-dom'; 

export default function UpdateUser() {
    const { id } = useParams(); 
    const [formdata, setFormdata] = useState({
        name: "",
        email: "",
        phone: "",
        department: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/employee/${id}`);
                if (!response.ok) {
                    throw new Error('Employee not found');
                }
                const data = await response.json();
                setFormdata(data);
                setLoading(false);
            } catch (err) {
                setError('Error fetching employee data');
                setLoading(false);
            }
        };

        fetchEmployee();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormdata({
            ...formdata,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/employee/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });

            if (!response.ok) {
                throw new Error('Error updating employee');
            }

            const data = await response.json();
            console.log('Employee updated:', data);
            alert('Employee updated successfully!');
            navigate('/'); 
        } catch (err) {
            console.error(err);
            alert('Failed to update employee');
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='form-container'>
            <h1 className='form-title'>Update Employee</h1>
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
                    Update Employee
                </button>
            </form>
        </div>
    );
}
