import request from '../util/request'
//登录api
export const login = (user,password)=>{
	let params = new URLSearchParams()
	params.append('user',user)
	params.append('password',password)
	return request.post('/user/login',params)
}
//注册api
export const reg = (user,password,phone)=>{
	let params = new URLSearchParams()
	params.append('user',user)
	params.append('password',password)
	params.append('phone',phone)
	return request.post('/user/reg',params)
}