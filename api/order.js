import orderListData from '../virturalData/orderList.json'
import request from '../util/request'
export const getList = ()=>{
	return orderListData
}

export const getOrderList = (user)=>{
	let params = new URLSearchParams()
	params.append('user',user)
	return request.post('/order/findAll',params)
}

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
