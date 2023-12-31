import axios from '../setup/axios'

const register = (data) => {
    return axios.post('/register', data)
}

const login = (data) => {
    return axios.post('/login', data)
}

const getAccountToke = () => {
    return axios.get("/api/user/account")
}

const getAllUser = () => {
    return axios.get("/api/user/get-all")
}

const addnewUser = (data) => {
    return axios.post('/api/user/add', data)
}

const deleteUser = (user) => {
    return axios.delete(`/api/user/delete?id=${user.id}`, { data: { id: user.id } })
}

const updateUser = (user) => {
    return axios.put('/api/user/update', user)
}

const logout = () => {
    return axios.post('/logout')
}

export {
    register, login, getAccountToke, getAllUser, addnewUser, deleteUser, updateUser, logout
}