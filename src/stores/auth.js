import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

const USER_KEY="OA_USER_KEY"
const TOKEN_KEY="OA_TOKEN_KEY"

export const useAuthStore = defineStore('auth', () => {
  let _user =ref({})
  let _token=ref("")

  function setUserToken(user,token){
    _user.value=user;
    _token.value=token;

    localStorage.setItem(USER_KEY,JSON.stringify(user))
    localStorage.setItem(TOKEN_KEY,token)
  }

  function clearUserToken(){
    _user.value={}
    _token.value=""
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  let user=computed(()=>{

    if (Object.keys(_user.value),length==0){
        let user_str=localStorage.getItem(USER_KEY)
        if (user_str){
        _user.value=JSON.parse(user_str)
        }
        
    }
    return _user.value;
  })


let token=computed(()=>{
    if (!_token.value){
      let token_str=localStorage.getItem(TOKEN_KEY)
      if(token_str){
        _token.value=token_str
      }
        
    }
    return _token.value;
})

let is_logined=computed(()=>{
  console.log('user.value:', user.value)
  console.log('token.value:', token.value)
  if (Object.keys(user.value).length>0 && token.value){
    return true;
  }
  return false;
})


  return { setUserToken, user, token,is_logined,clearUserToken}
})
