import axios from 'axios';

let API_URL

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    API_URL = 'http://localhost:3000/api'
} else {
    API_URL = 'https://31.220.54.89/api'
}

export class ApiService {
    login(user) {
        const url = `${API_URL}/login`;
        return axios.post(url, user);
    }

    getComputers(params) {
        return axios.get(`${API_URL}/computers`,  params)
    }
    getComputersSize(){
        return axios.get(`${API_URL}/computers/size`)
    }

    getCustomers(query) {
        return axios.get(`${API_URL}/customer/search`, { params: { query: query} })
    }

    createComputer(data){
        const url = `${API_URL}/computer/create`;
        return axios.post(url, data);
    }

    editComputer(data){
        const url = `${API_URL}/computer/edit`;
        return axios.post(url, data);
    }

    removeComputer(data){
        const url = `${API_URL}/computer/remove`;
        return axios.post(url, data);
    }

    createAttribution(data){
        const url = `${API_URL}/attribution/create`;
        return axios.post(url,data);
    }

    removeAttribution(data){
        const url = `${API_URL}/attribution/remove`;
        return axios.post(url,data);
    }
}
