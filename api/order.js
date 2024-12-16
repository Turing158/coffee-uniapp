const baseurl =  'http://localhost:8080'
//获取当前用户所有订单
export const getOrderList = (user)=>{
	return uni.request({
		url: baseurl+'/order/findAll',
		method: 'POST',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data: {
			user,	
		}
	})
}
//支付订单到后台
export const payOrder = (order)=>{
	return uni.request({
		url: baseurl+'/order/payOrder',
		method: 'POST',
		header:{
			'content-type':'application/x-www-form-urlencoded'
		},
		data: {
			"goods" : order.goods,
			"user" : order.user,
			"price" : order.price,
			"date" : order.date,
			"status" : order.status,
			"useForm" : order.useForm,
			"reservation" : order.reservation,
			"note" : order.note,
		}
	})
}
