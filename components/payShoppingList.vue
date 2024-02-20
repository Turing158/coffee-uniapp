<template>
	<view>
		<div class="payShoppingList">
			<p class="title">购物袋</p>
			<div class="hr"></div>
			<div class="listDiv" v-for="(item,index) in data">
				<div class="list">
					<img class="img" :src="''+item.img" alt=""/>
					<div class="name">{{item.name}}<span class="special"> - {{item.temperature}} {{item.sugar}}</span></div>
					<div class="num">x{{item.num}}</div>
					<div class="price">￥{{item.price*item.num}}</div>
				</div>
			</div>
			<div class="hr"></div>
			<div class="sum">
				<div class="sumText">总计</div>
				<div class="sumPrice">￥{{sum}}</div>
			</div>
		</div>
	</view>
</template>

<script setup>
	import { ref } from 'vue';
	const props =  defineProps(['data'])
	const data = ref(props.data)
	const sum = ref(0)
	for (var i = 0; i < props.data.length; i++) {
		sum.value += props.data[i].price*props.data[i].num
	}
</script>

<style scoped>
	.hr{
		position: relative;	
		width: 90%;
		height: 1px;
		background-color: #f1f1f1;
		left: 5%;
	}
	.title{
		position: relative;
		height: 30px;
		line-height: 30px;
		font-size: 14px;						
		color: #131313;
		left: 6%;
		padding: 2px 0;
	}
	.listDiv{
		margin: 10px 0;
	}
	.list{
		position: relative;
		width: 90%;
		height: 40px;
		margin: 0 auto;
	}
	.list .img{
		position: absolute;
		left: 10px;
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}
	.list  .name{
		position: absolute;
		top: 10px;
		left: 60px;
		font-size: 16px;
		font-weight: bold;
	}
	.list .name .special{
		font-size: 13px;
		font-weight: normal;
		color: #868686;
		
	}
	.list .num{
		position: absolute;
		top: 30px;
		left: 60px;
		font-size: 12px;
		color: #868686;
	}
	.list .price{
		position: absolute;
		top: 20px;
		right: 10px;
		font-size: 16px;
		font-weight: bold;
	}
	.sum{
		position: relative;
		top: 10px;
		width: 90%;
		height: 40px;
		margin: 0 auto;
		display: flex;
		font-size: 16px;
		font-weight: bold;
		justify-content: right;
	}
	.sum  .sumText{
		height: 40px;
		color: #868686;
		font-size: 14px;
	}
</style>