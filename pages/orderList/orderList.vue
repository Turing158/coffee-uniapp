<template>
	<view>
		<div class="top"></div>
		<div class="main">
			<div v-if="listData.length != 0">
				<div  v-for="i in listData" @click="checkOrder(i)">
					<listCard class="cardOut" :data="i"></listCard>
				</div>
				
			</div>
			<div class="buttom"></div>
			<uni-load-more :status="status" iconType="circle" @clickLoadMore="loadMore()"></uni-load-more>
			<div class="bottom"></div>
		</div>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue'
	import listCard from '../../components/listCard.vue'
	import {getList,getOrderList} from '../../api/orderList.js'
	import {getGoods} from '../../api/shop.js'
	const goodsList = ref([])
	const listData = ref([])
	const status =  ref('more')
	const loadMore = ()=>{
		status.value = 'loading'
		getUserOrderList()
	}
	const getGoodsInf = (id)=>{
		for (var i = 0; i < goodsList.value.length; i++) {
			if(id === goodsList.value[i].id){
				return goodsList.value[i]
			}
		}
	}
	const getUserOrderList = async ()=>{
		// if(uni.getStorageSync('isLogin')){
		// 	let userObj = uni.getStorageSync('user')
		// 	let userId = userObj.user
		// 	// 获取订单列表
			
		// }
		// else{
		// 	uni.showToast({
		// 		title: '请先登录',
		// 		icon: 'none'
		// 	});
		// }
		await getGoods().then(res=>{
			goodsList.value = res.data.data
		}).catch(err=>{
			console.log(err);
			uni.showToast({
				title: '获取商品信息失败',
				icon: 'none'
			});
		})
		await getOrderList('admin').then(res=>{
			let list = []
			let data = res.data.data
			for (var i = 0; i < data.length; i++) {
				let goodsData = JSON.parse(data[i].goods)
				let goods = []
				for (var j = 0; j < goodsData.length; j++) {
					let goodInf = getGoodsInf(goodsData[j].id)
					goods.push({
						id:goodsData[j].id,
						name:goodInf.name,
						num:goodsData[j].num,
						img:goodInf.img,
						price:goodInf.price,
						temperature:goodsData[j].temperature,
						sugar:goodsData[j].sugar
					})
				}
				list.push({
					id:data[i].id,
					goods:goods,
					user:data[i].user,
					date:data[i].date,
					price:data[i].price,
					status:data[i].status,
					number:data[i].number
				})
			}
			listData.value = list
			console.log(listData.value);
		}).catch(err=>{
			console.log(err);
		})
		status.value = 'more'
	}
	getUserOrderList()
	// listData.value = uni.getStorageSync('orderList')
	if(!uni.getStorageSync('isLogin')){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
	}
	const checkOrder = (item)=>{
		console.log(item);
		uni.setStorageSync('order',item)
		uni.navigateTo({
			url:'/pages/orderPage/orderPage'
		})
	}
</script>

<style scoped>
	.top{
		position: fixed;
		height: 90px;
		width: 100vw;
		background-color: #4D3900;
		z-index: 100;
	}
	.main{
		position: relative;
		top: 90px;
		min-height: calc(100vh - 100px);
		background-color: #f1f1f1;
		overflow-y: auto;
	}
	.buttom{
		position: relative;
		height: 20px;
		width: 100vw;
		background-color: #f1f1f1;
	}
	.bottom{
		position: relative;
		height: 70px;
		width: 100vw;
		background-color: #f1f1f1;
	}
</style>
