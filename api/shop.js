import goodsList from '../virturalData/goodsList.json'
import request from '../util/request'
export const getGoodsList = ()=>{
	return goodsList
}

export const getGoods = async()=>{
	return request.get('/goods/findAll')
}