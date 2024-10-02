import http from "./http"

const getAbsentTypes =() =>{
    const path='/absent/type'
    return http.get(path)
}


const getResponder=() =>{
    const path='/absent/responder'
    return http.get(path)
}
export default{
    getAbsentTypes,
    getResponder
}