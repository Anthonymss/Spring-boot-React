import React, { useEffect, useState } from 'react'
import ClienteService from '../services/ClienteService';
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
const AddClienteComponent = () => {
    const [nombre,setNombre]=useState("");
    const [apellido,setApellido]=useState("");
    const [email,setEmail]=useState("");
    const navigate =useNavigate();
    const {id}=useParams(); 

    const saveOrUpdateCliente=(e)=>{

        e.preventDefault(); 
        const cliente = {nombre,apellido,email}
        if(id){
            ClienteService.updateCliente(id,cliente).then((response)=>{
                console.log(response.data);
                navigate('/clientes');
            }).catch(error=>{console.log(error)})
        }else{
            ClienteService.createCliente(cliente).then((response)=>{
                console.log(response.data);
                navigate('/clientes');
            }).catch(error=>{console.log(error)})
        }
        
    } 
    
    useEffect(() => {
        if (id) {
            ClienteService.getClienteById(id).then((response) => {
                setNombre(response.data.nombre);
                setApellido(response.data.apellido);
                setEmail(response.data.email);
            }).catch(err => {
                console.log(err);
            });
        }
    }, [id]);
    
    const title = id ? 'Actualizar Cliente' : 'Registro de Cliente';
  return (
    <div>
      <h1>{title}</h1>
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3 offset-md-3'>
                    <h2 className='text-center'>
                        {
                            title
                        }
                    </h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className='form-label'>Nombre: </label>
                                <input 
                                    type="text"
                                    placeholder='digite su nombre'  
                                    className='form-control' 
                                    value={nombre} 
                                    onChange={(e)=>
                                        setNombre(e.target.value)
                                    }/>
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Apellido: </label>
                                <input 
                                    type="text"
                                    placeholder='digite su apellido'   
                                    className='form-control' 
                                    value={apellido} 
                                    onChange={(e)=>
                                        setApellido(e.target.value)
                                    }/>
                            </div>
                            <div className="form-group mb-2">
                                <label className='form-label'>Email: </label>
                                <input 
                                    type="text"
                                    placeholder='digite su email'  
                                    className='form-control' 
                                    value={email} 
                                    onChange={(e)=>
                                        setEmail(e.target.value)
                                    }/>
                            </div>
                            <button className='btn btn-success' 
                            onClick={(e)=>saveOrUpdateCliente(e)}>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to="/clientes" className="btn btn-danger"> Cancelar</Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default AddClienteComponent
