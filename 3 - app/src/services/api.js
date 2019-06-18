import axios from "axios";

const api =axios.create({
    //baseURL:'http://localhost:3003'
    //baseURL:'http://10.0.3.2:3003'
    //baseURL:'http://10.0.2.2:3003'
    baseURL:'http://192.168.0.3:3003'
})

export default api;