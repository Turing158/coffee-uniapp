import request from '../util/request'

export const getGoods = async()=>{
	return request.get('/goods/findAll')
}