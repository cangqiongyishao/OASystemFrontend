import axios from "axios";

class Http{
    constructor(){
        this.instance = axios.create({
            baseURL:import.meta.env.VITE_BASE_URL,
            timeout: 6000
          });
    }

    post(path,data){
        // return this.instance.post(path,data)
        return new Promise(async(resolve,reject)=>{
            try{
              let result=await this.instance.post(path,data)  
              resolve(result.data)
            }catch(err){
                let detail=err.response.data.detail
                reject(detail)
            }
            
        })
    }

    get(path,params){
        return this.instance.get(path,params)
    }
}


export default new Http()