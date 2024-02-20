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

