package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;


import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeService {

    private final EmployeeRepository employeeRepository;

    public Employee postEmployee(Employee employee){
        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees(){
        return employeeRepository.findAll();
    }

    public void deleteEmployee(Long id){
        if(!employeeRepository.existsById(id)){
            throw new EntityNotFoundException("Employee" + id + "not found");
        }
        employeeRepository.deleteById(id);
    }

    public Employee getEmployeeById(Long id){
        return employeeRepository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Long id, Employee employee){
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee with ID " + id + " not found"));

        existingEmployee.setEmail(employee.getEmail());
        existingEmployee.setName(employee.getName());
        existingEmployee.setPhone(employee.getPhone());
        existingEmployee.setDepartment(employee.getDepartment());

        return employeeRepository.save(existingEmployee);
    }
}
