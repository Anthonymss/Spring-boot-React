package com.gestion.clientes.controller;

import com.gestion.clientes.Exception.ResourceNotFoundException;
import com.gestion.clientes.model.Cliente;
import com.gestion.clientes.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("api/v1")
public class ClienteController {

    @Autowired
    private ClienteRepository clienteRepository;
    @GetMapping("/clientes")
    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }
    @PostMapping("/clientes")
    public Cliente guardar(@RequestBody Cliente cliente){
        return this.clienteRepository.save(cliente);
    }
    @GetMapping("/clientes/{id}")
    public ResponseEntity<Cliente> ClientebyId(@PathVariable Long id){
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("El cliente con ese id no se encontro: "+id));
        return ResponseEntity.ok(cliente);
    }

    @PutMapping("/clientes/{id}")
    public ResponseEntity<Cliente> actualizar(@PathVariable long id ,@RequestBody Cliente clienteRequest){
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("El cliente con ese id no se encontro: "+id));
        clienteRequest.setId(id);
        this.clienteRepository.save(clienteRequest);
        return ResponseEntity.ok(clienteRequest);
    }
    @DeleteMapping("/clientes/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminar(@PathVariable Long id){
        Cliente cliente = this.clienteRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("El cliente con ese id no se encontro: "+id));
        this.clienteRepository.delete(cliente);
        Map<String,Boolean> response = new HashMap<>();
        response.put("Eliminado", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
