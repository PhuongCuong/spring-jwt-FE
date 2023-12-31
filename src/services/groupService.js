import axios from '../setup/axios'

const getAllGroup = () => {
    return axios.get("/api/group/get-all")

}

const addnewGroup = (data) => {
    return axios.post("/api/group/create", data)
}

const deleteGroup = (group) => {
    return axios.delete(`/api/group/delete?id=${group.id}`, { data: { id: group.id } })
}

const getGroupRolebyId = (id) => {
    return axios.get(`/api/group-role/get-by-id?groupId=${id}`)
}

const addnewGroupRole = (data) => {
    return axios.post('/api/group-role/create', data)
}

export {
    getAllGroup, addnewGroup, deleteGroup, getGroupRolebyId, addnewGroupRole
}