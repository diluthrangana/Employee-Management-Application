import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import './Dashboard.css';  // Add this for custom styles
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/employees');
        if (!response.ok) {
          throw new Error('Failed to fetch employees');
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees(); 
  }, []);

  const handleDelete = async (employeeId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/employee/${employeeId}`, {  // Use backticks here
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete employee');
      }
  
      // Remove the employee from the state after successful deletion
      setEmployees((prevEmployees) => prevEmployees.filter(emp => emp.id !== employeeId));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleUpdate = (employeeId) =>{
    navigate(`/update/${employeeId}`)
  }
  

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="table-heading">Employees</h1>
          <Table bordered hover responsive="md" className="styled-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Department</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.department}</td>
                  <td>
                    <Button variant="outline-primary" onClick={()=>handleUpdate(employee.id)} size="sm">Edit</Button>{' '}
                    <Button variant="outline-danger" onClick={()=>handleDelete(employee.id)} size="sm">Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
