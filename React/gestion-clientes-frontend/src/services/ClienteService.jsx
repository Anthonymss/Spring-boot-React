import axios from "axios";

const CLIENTE_BASE_REST_API="http://localhost:8080/api/v1/clientes";
class ClienteService{
    getAllClientes(){
        return axios.get(CLIENTE_BASE_REST_API);
    }
    createCliente(cliente){
        return axios.post(CLIENTE_BASE_REST_API,cliente);
    }
    getClienteById(id){
        return axios.get(`${CLIENTE_BASE_REST_API}/${id}`);
    }
    updateCliente(clienteid,cliente){
        return axios.put(CLIENTE_BASE_REST_API+"/"+clienteid,cliente);
    }
    deleteCliente(clienteid){
        return axios.delete(CLIENTE_BASE_REST_API+"/"+clienteid);
    }
}   
export default new ClienteService();