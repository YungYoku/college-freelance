import axios from "axios"

class Http {

    api = import.meta.env.VITE_API
    constructor(){}
    
    
    
    get (url:string, params:{}={}) : Promise<any> {
        return axios.get(this.api + url, params)
        .then ((res) => {
            return res.data
        })
    }

    post (url:string, body:{}={}) : Promise<any> {
        return axios.post(this.api + url, body)
        .then ((res) => {
            return res.data
        })
    }
    
    
}

export default new Http()