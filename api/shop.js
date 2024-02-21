import request from '../util/request'
//获取所有商品信息
export const getGoods = async()=>{
	return request.get('/goods/findAll')
}