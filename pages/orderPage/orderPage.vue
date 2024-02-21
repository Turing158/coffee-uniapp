<template>
	<view>
		<div class="order">
			<uni-nav-bar :statusBar="true" left-icon="left" title="订单详情" @clickLeft="backClick()" :border="false" :fixed="true" color="#f1f1f1" backgroundColor="#5b4200"/>
			<div class="orderPage">
				<div class="status">
					<statusComp :status="status" :number="number"></statusComp>
				</div>
				<div class="list">
					<div v-if="goods.length != 0">
						<payShoppingList :data="goods"></payShoppingList>
					</div>
				</div>
				<div class="info">
					<orderInfo :data="infoObject"></orderInfo>
				</div>
				<div class="bottom"></div>
			</div>
			<div class="buttom"></div>
		</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue'
	import statusComp from '../../components/status.vue'
	import payShoppingList from '../../components/payShoppingList.vue'
	import orderInfo from '../../components/orderInfo.vue'
	// 获取订单信息
	const order = uni.getStorageSync('order')
	const goods =  ref(order.goods)
	const status = ref(order.status)
	const number = ref(order.number)
	// 订单信息
	const infoObject = ref({
		id:order.id,
		useForm:order.useForm,
		reservation:order.reservation,
		date:order.date,
		note:order.note
	})
	const backClick = () => {
		uni.switchTab({
			url: '/pages/orderList/orderList'
		});
	}
</script>

<style scoped>
	.order{
		position: relative;
		background-color: #f1f1f1;
		min-height: 100vh;
		overflow-x: hidden;
	}
	.status{
		position: relative;
		width: 92vw;
		height: 180px;
		left: 4vw;
		top: 20px;
		background-color: #fff;
		border-radius: 10px;
	}
	.list{
		position: relative;
		width: 92vw;
		height: fit-content;
		left: 4vw;
		top: 40px;
		background-color: #fff;
		border-radius: 10px;
	}
	.info{
		position: relative;
		width: 92vw;
		height: fit-content;
		left: 4vw;
		top: 60px;
		background-color: #fff;
		border-radius: 10px;
	}
	.bottom{
		position: relative;
		width: 100vw;
		height: 20px;
		top: 80px;
	}
</style>
