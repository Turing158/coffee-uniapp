const baseurl =  'http://localhost:8080'
//登录api
export const login = (user,password)=>{
	return uni.request({
		url: baseurl+'/user/login',
		method: 'POST',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data: {
			user,
			password
		}
	})
}
//注册api
export const reg = (user,password,phone)=>{
	return uni.request({
		url: baseurl+'/user/reg',
		method: 'POST',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data: {
			user,
			password,
			
		}
	})
}