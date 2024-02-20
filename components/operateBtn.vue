<template>
	<view>
		<div class="operateBtn">
			
			<uni-popup ref="tips" :animation="true" type="message" :safe-area="true">
				<uni-popup-message type="error" message="暂不支持外卖，请前往美团" :duration="2000"></uni-popup-message>
				</uni-popup>
			<div class="order" @click="orderClick()">
				<span class="text">自助点单</span>
				<img class="img" src="../static/icon/coffeeCup.png" alt=""/>
			</div>
			<div class="hr"></div>
			<div class="takeOut" @click="takeOutClick()">
				<span class="text">&emsp;外卖</span>
				<img class="img" src="../static/icon/car.png" alt=""/>
			</div>
		</div>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue'
	const  tips = ref(null)
	const takeOutClick = ()=>{
		tips.value.open()
	}
	const orderClick = ()=>{
		uni.switchTab({
			url:'/pages/shop/shop'
		})
	}
	onMounted(()=>{
		
	})
</script>

<style>
	.operateBtn{
		position: relative;
		width: 90%;
		height: 300rpx;
		display: flex;
		margin: 20px 5%;
		overflow: hidden;
	}
	.operateBtn .order,.operateBtn .takeOut{
		display: block;
		width: 50%;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
	}
	.text{
		position: absolute;
		top: 20px;
		margin-left: -30px;
		color: #75460d;
		font-weight: bold;
		font-family: YouYuan;
	}
	.img{
		position: absolute;
		width: 140rpx;
		height: 140rpx;
		top: 100rpx;
		margin-left: -60rpx;
	}
	.hr{
		width: 0px;
		margin: 10px 0;
		border: 0;
		border-left: 3px dotted #fff;
		height: 260rpx;
	}
	
</style>