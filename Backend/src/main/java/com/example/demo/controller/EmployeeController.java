package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeService employeeService;

    @PostMapping("/employee")
    public Employee postEmployee(@RequestBody Employee employee){
        return employeeService.postEmployee(employee);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return employeeService.getAllEmployees();
    }

    @DeleteMapping("/employee/{id}")
    public ResponseEntity<?> deleteEmployee(@PathVariable Long id){
        try{
            employeeService.deleteEmployee(id);
            return new ResponseEntity<>("Employee with ID" + id + "deleted successfully", HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/employee/{id}")
    public ResponseEntity<?> getEmployeeById(@PathVariable Long id){
        try {
            Employee employee = employeeService.getEmployeeById(id);
            return new ResponseEntity<>(employee, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Employee with ID " + id + " not found", HttpStatus.NOT_FOUND);
        }
    }

    @PatchMapping("/employee/{id}")
    public ResponseEntity<?> updateEmployee(@PathVariable Long id, @RequestBody Employee employee){
        Employee updatedEmployee = employeeService.updateEmployee(id,employee);

        if(updatedEmployee == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        return ResponseEntity.ok(updatedEmployee);
    }
}
