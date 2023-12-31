import axios from '../setup/axios'

const getAllRole = () => {
    return axios.get("/api/role/get-all")

}

const addnewRole = (data) => {
    return axios.post("/api/role/create", data)
}

const deleteRole = (role) => {
    return axios.delete(`/api/role/delete?id=${role.id}`, { data: { id: role.id } })
}

export {
    getAllRole, addnewRole, deleteRole
}