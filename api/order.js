import request from '../util/request'
//获取当前用户所有订单
export const getOrderList = (user)=>{
	let params = new URLSearchParams()
	params.append('user',user)
	return request.post('/order/findAll',params)
}
//支付订单到后台
export const payOrder = (order)=>{
	let params = new URLSearchParams()
	params.append('goods',order.goods);
	params.append('user',order.user);
	params.append('price',order.price);
	params.append('date',order.date);
	params.append('status',order.status);
	params.append('useForm',order.useForm);
	params.append('reservation',order.reservation);
	params.append('note',order.note);
	return request.post('/order/payOrder',params)
}
