import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { Link } from 'react-router-dom';
const ListClientesComponent = () => {
    const [clientes,setClientes]=useState([]);
    useEffect(() => {
        listarClientes();
    },[]);

    const deleteCliente = (id) => {
        ClienteService.deleteCliente(id).then(response=>{
            listarClientes();
        })
       .catch(error=>{console.log("Error: ", error)})
    }
    const listarClientes = () => {
        ClienteService.getAllClientes().then(response=>{
            setClientes(response.data);
            console.log(response.data);
        })
        .catch(error =>{
            console.log("Error: ", error);
        })
    }
    return (
    <div className='container'>
      <h2 className='text-center'>Lista de Empleados</h2>
      <Link to="/add-cliente" className="btn btn-primary mb-2">Agregar Cliente</Link>
      <table className='table  table-bordered table-striped'>
        <thead>
            <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Email</th>
                <th>Accciones</th>
            </tr>
        </thead>
        <tbody>
            {
                clientes.map((e) => (
                    <tr key={e.id}>
                        <td>{e.id}</td>
                        <td>{e.nombre}</td>
                        <td>{e.apellido}</td>
                        <td>{e.email}</td>
                        <td>
                            <Link className='btn btn-info' to={`/edit-cliente/${e.id}`}>Actualizar</Link>
                            <button className='btn btn-danger' onClick={()=>{deleteCliente(e.id)}}  style={{marginLeft:"10px"}}>Eliminar</button>
                        </td>
                    </tr>
                ))
            }
        </tbody>
      </table>
    </div>
)
}

export default ListClientesComponent
