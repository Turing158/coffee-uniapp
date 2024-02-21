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
	import {getOrderList} from '../../api/order.js'
	import {getGoods} from '../../api/shop.js'
	const goodsList = ref([])
	const listData = ref([])
	const status =  ref('more')
	const loadMore = ()=>{
		status.value = 'loading'
		getUserOrderList()
	}
	// 获取用户订单列表
	const getUserOrderList = async ()=>{
		if(uni.getStorageSync('isLogin')){
			let userObj = uni.getStorageSync('user')
			let userId = userObj.user
			// 获取订单列表
			await getGoods().then(res=>{
				goodsList.value = res.data.data
			}).catch(err=>{
				console.log(err);
				uni.showToast({
					title: '获取商品信息失败',
					icon: 'none'
				});
			})
			await getOrderList(userId).then(res=>{
				let data = res.data.data
				if(data.length == 0){
					uni.showToast({
						title: '没任何订单，不点一杯？',
						icon: 'none'
					})
				}
				listData.value = data
				uni.setStorageSync('orderList',data)
			}).catch(err=>{
				console.log(err);
			})
		}
		else{
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
		}
		
		status.value = 'more'
	}
	getUserOrderList()
	listData.value = uni.getStorageSync('orderList')
	if(!uni.getStorageSync('isLogin')){
		uni.showToast({
			title: '请先登录',
			icon: 'none'
		});
	}
	// 查看订单详情
	const checkOrder = (item)=>{
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
