import axios from "axios";

export default {
    create() {
        let config = {
            baseURL: process.env.VUE_APP_API_BASE_URL,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        };
        
        return axios.create(config);
    },
}