const baseurl =  'http://localhost:8080'
//获取所有商品信息
export const getGoods = async()=>{
	return uni.request({
		url: baseurl+'/goods/findAll',
		method: 'GET'
	})
}