<template>
	<view>
		<div class="user">
			<loginReg ref="loginRegPage"></loginReg>
			<div class="cardBg">
				<image src="https://www.z4a.net/images/2024/01/23/logoIcon.png" style="position: relative;top:50px;width: 262px;height: 110px;"></image>
			</div>
			<div @click="toLogin()">
				<userCard :data="getUserData" :isLogin="isLogin"></userCard>
			</div>
			<div class="main">
				<div class="status">
					<div @click="toOrder()" v-if="made != 0">
						<div class="statusTop">
							<div>
								<div class="top"></div>
								<p class="text">正在制作</p>
								<p class="num">{{made}}</p>
							</div>
							<div>
								<div class="top"></div>
								<p class="text">已完成</p>
								<p class="num">{{complete}}</p>
							</div>
						</div>
						<div class="hr"></div>
						<div class="statusButtom">
							<div class="top"></div>
							<p class="text">稍安勿躁</p>
						</div>
					</div>
					<div class="noMade" @click="toShop()" v-if="made == 0">
						<div class="top"></div>
						<p class="num">真不去点一杯吗</p>
						<div class="hr"></div>
						<p class="text">点我去点单</p>
					</div>
				</div>
				<div class="func">
					<div class="title">功能</div>
					<div class="hr"></div>
					<div class="grid">
						<uni-grid :column="4" :showBorder="false" @change="funcClick" :highlight="false">
							<uni-grid-item :index="0">
								<div class="text"><uni-icons type="cart-filled" color="#4D3900" size="40"></uni-icons></div><text class="text">点单</text>
							</uni-grid-item>
							<uni-grid-item :index="1">
								<div class="text"><uni-icons type="list" color="#4D3900" size="40"></uni-icons></div><text class="text">订单</text>
							</uni-grid-item>
							<uni-grid-item :index="2">
								<div class="text"><uni-icons type="gear-filled" color="#4D3900" size="40"></uni-icons></div><text class="text">设置</text>
							</uni-grid-item>
							<uni-grid-item :index="3">
								<div class="text"><uni-icons type="more-filled" color="#4D3900" size="40"></uni-icons></div><text class="text">关于我们</text>
							</uni-grid-item>
						</uni-grid>
					</div>
					<div class="buttom"></div>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>
	import loginReg from '../../components/loginReg.vue'
	import userCard from '../../components/userCardUser.vue'
	import {getUser} from '../../api/user.js'
	import { ref } from 'vue';
	const getUserData = uni.getStorageSync('user')
	const isLogin = ref(false)
	const loginRegPage = ref()
	const toLogin = ()=>{
		loginRegPage.value.toLogin()
	}
	if(uni.getStorageSync('isLogin')){
		isLogin.value = true
	}
	const made = ref(0)
	const complete = ref(0)
	const orderList = ref([])
	if(uni.getStorageSync('orderList')){
		orderList.value = uni.getStorageSync('orderList')
	}
	const start = ()=>{
		let madeTmp = 0
		let completeTmp = 0
		let orderObj = {}
		for (let i = 0; i < orderList.value.length; i++) {
			orderObj = orderList.value[i]
			if(orderObj.status == 2){
				madeTmp++
			}
			if(orderObj.status == 1){
				completeTmp++
			}
		}
		made.value = madeTmp
		complete.value = completeTmp
	}
	start()
	
	const toOrder = ()=>{
		uni.switchTab({
			url:'/pages/orderList/orderList'
		})
	}
	const toShop = ()=>{
		uni.switchTab({
			url:'/pages/shop/shop'
		})
	}
	const funcClick = (e)=>{
		let index = e.detail.index
		switch(index){
			case 0:
				toShop()
				break; 
			case 1:
				toOrder()
				break;
			case 2:
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				});
				break;
			case 3:
				uni.showToast({
					title: '功能开发中',
					icon: 'none'
				});
				break;
		}
	}
</script>

<style>
	.user{
		background-color: #f1f1f1;
		height: 100vh;
		overflow-x: hidden;
	}
	.cardBg{
		position: absolute;
		width: 100vw;
		height: 220px;
		background-color: #4D3900;
		text-align: center;
		
	}
	.main{
		position: relative;
		top: 200px;
	}
	.status{
		position: relative;
		background-color: #fff;
		border-radius: 10px;
		width: 92vw;
		height: 120px;
		left: 4vw;
	}
	.status .noMade{
		position: relative;
		width: 100%;
		height: 100%;
		text-align: center;
	}
	.status .noMade .top{
		position: relative;
		width: 100%;
		height: 30px;
	}
	.status .statusTop{
		position: relative;
		width: 100%;
		height: 70px;
		display: flex;
		justify-content: space-around;
		align-items: center;
		text-align: center;
	}
	.status .statusButtom{
		position: relative;
		width: 88%;
		left: 6%;
		text-align: center;
	}
	.status .statusButtom .text{
		color: #4D3900;
		font-size: 20px;
		font-weight: bold;
	}
	.status .top{
		position: relative;
		width: 100%;
		height: 5px;
	}
	.status .text{
		position: relative;
		font-size: 15px;
		color: #747474;
	}
	.status .num{
		position: relative;
		font-size: 25px;
		color: #4D3900;
		font-weight: bold;
	}
	.hr{
		position: relative;
		border: 1px solid #f1f1f1;
		width: 90%;
		left: 5%;
	}
	.func{
		position: relative;
		background-color: #fff;
		border-radius: 10px;
		width: 92vw;
		min-height: 10px;
		left: 4vw;
		margin-top: 20px;
	}
	.func .title{
		position: relative;
		width: 92vw;
		height: 45px;
		display: flex;
		align-items: center;
		padding-left: 20px;
		color: #747474;
	}
	.func .grid{
		position: relative;
		width: 90%;
		left: 5%;
		top: 10px;
	}
	.func .grid .text{
		position: relative;
		font-size: 12px;
		color: #747474;
		text-align: center;
	}
	.buttom{
		position: relative;
		width: 92vw;
		height: 10px;
	}
</style>
