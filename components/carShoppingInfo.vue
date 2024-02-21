<!-- 购物车商品信息组件 -->
<template>
	<view>
		<div class="carShopping">
			<img class="img" :src="''+img" alt="" />
			<p class="name">{{name}}</p>
			<span class="select">{{special}}</span>
				<div>
					<slot></slot>
				</div>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	//从父组件中获取数据
	const props = defineProps({
		data:Object
	})
	//将数据转换成响应式数据
	const name = ref(props.data.name)
	const img = ref(props.data.img)
	const temperature = ref(props.data.temperature)
	const sugar = ref(props.data.sugar)
	const special = ref("")
	// 处理有无特殊项[温度和糖量]
	if(temperature.value == null){
		special.value = ""
	}
	if(sugar.value == null){
		special.value = temperature.value
	}
	else{
		special.value = temperature.value + " / " + sugar.value
	}
</script>

<style scoped>
	.carShopping{
		position: relative;
		width: calc(100vw - 20px);
		height: 40px;
		margin: 10px 0;
		margin-left: 20px;
		font-weight: bold;
	}
	.img{
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}
	.name{
		position: absolute;
		top: 0;
		left: 45px;
		font-size: 15px;
	}
	.select{
		position: absolute;
		top: 23px;
		left: 45px;
		font-size: 12px;
		color: #666;
	}
</style>