<!-- 订单列表的一个卡片 -->
<template>
	<view>
		<div class="card">
			<div class="title">树屋咖啡 TreeHouse Coffee</div>
			<div class="status" v-show="status == 2">制作中</div>
			<div class="status cancel" v-show="status == 0">已取消</div>
			<div class="status success" v-show="status == 1">已完成</div>
			<div class="imgDiv">
				<img v-for="i in goods.slice(0,imgnum)" :src="''+i.img" alt="" class="img"/>
				<div class="more" v-if="goods.length > imgnum">. . .</div>
			</div>
			<div class="date">{{date}}</div>
			<div class="bottom"><span class="sum">共{{num}}件</span> ￥{{price}}</div>
		</div>
		<div class="cardNull"></div>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue';
	// 获取数据
	const props = defineProps({
		data:Object
	})
	// 数据转为响应式数据
	const status = ref(props.data.status)
	const goods = ref(props.data.goods)
	const date = ref(props.data.date)
	const price = ref(props.data.price)
	const num = ref(0)
	const imgnum = ref(4)
	// 计算所有商品数量
	for (var i = 0; i < goods.value.length; i++) {
		num.value += goods.value[i].num
	}
	
</script>

<style scoped>
	.card{
		position: relative;
		width: 90vw;
		height: 150px;
		background-color: #fafafa;
		margin: 0 5vw;
		top: 20px;
		border-radius: 10px;
	}
	.cardNull{
		width: 100vw;
		height: 20px;
	}
	.title{
		position: relative;
		top: 15px;
		left: 15px;
		font-size: 14px;
	}
	.status{
		position: absolute;
		right: 15px;
		top: 15px;
		font-size: 14px;
		color: #714a0f;
		font-weight: bold;
	}
	.cancel{
		color: #868686;
	}
	.success{
		color: #004b00;
	}
	.imgDiv{
		position: relative;
		width: 100%;
		height: 50px;
		top: 25px;
		display: flex;
		flex-wrap: nowrap;
		overflow: hidden;
	}
	.img{
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 10px;
		margin-left: 15px;
	}
	.more{
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 10px;
		background-color: #eee;
		text-align: center;
		margin-left: 15px;
		line-height: 40px;
	}
	.date{
		position: relative;
		font-size: 11px;
		top: 35px;
		left: 15px;
		color: #868686;
		font-weight: bold;
		font-family: Helvetica;
	}
	.bottom{
		position: absolute;
		bottom: 15px;
		right: 15px;
		color: #131313;
		font-weight: bold;
	}
	.sum{
		font-size: 12px;
		color: #868686;
	}
</style>