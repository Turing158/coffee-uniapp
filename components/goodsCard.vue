<!-- 商品信息组件 -->
<template>
	<view>
		<div class="card">
			<img class="img" :src="''+img" alt="" />
			<div class="info">
				<p class="title">{{name}}</p>
				<span class="introduce">{{introduce}}</span>
				<span class="price"><span class="fuhao">￥</span>{{price}}<span class="text"> 起</span></span>
				<slot></slot>
			</div>
		</div>
		<div class="bottom"></div>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	// 从父组件获取数据
	const props = defineProps({
		data:Object
	})
	// 将数据转换成响应式数据
	const name = ref(props.data.name)
	const img = ref(props.data.img)
	const introduce = ref(props.data.introduce)
	const price = ref(props.data.price)
</script>

<style scoped>
	.card{
		position: relative;
		top: 20px;
		width: calc(100vw - 80px - 20px);
		height: 100px;
		background-color: #fff;
		left: 10px;
		border-radius: 10px;
	}
	.img{
		width: 80px;
		height: 80px;
		margin: 10px;
		border-radius: 10px;
	}
	.info{
		position: absolute;
		top: 10px;
		z-index: 1;
		width: calc(100vw - 80px - 20px - 80px - 20px);
		height: 80px;
		right: 5px;
	}
	.info .title{
		font-weight: bold;
		font-size: 15px;
	}
	.info .introduce{
		position: relative;
		top: -5px;
		font-size: 12px;
		color: #868686;
		line-height: 0;
	}
	.info .price{
		position: absolute;
		bottom: 0;
		left: 0;
		font-weight: bold;
		
	}
	.info .price .fuhao{
		font-size: 12px;
	}
	.info .price .text{
		font-size: 10px;
		color: #868686;
	}
	.bottom{
		width: 1px;
		height: 10px;
	}

</style>