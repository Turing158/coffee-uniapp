<!-- 订单页面的顶部状态 -->
<template>
	<view>
		<div class="status">
			<p class="statusText" v-show="props.status == 1">已完成</p>
			<p class="statusText made" v-show="props.status == 2">制作中</p>
			<p class="statusText" v-show="props.status == 0">已取消</p>
			<p class="text">取餐号</p>
			<p class="number">{{props.number}}</p>
		</div>
	</view>
</template>

<script setup>
	const props = defineProps({
		status: {
			type: Number,
			default: 0
		},
		number: {
			type: Number,
			default: 0
		}
	})
</script>

<style scoped>
	.status{
		position: relative;
		width: 100%;
		height: 180px;
		top: 10px;
	}
	.statusText{
		position: relative;
		width: 100%;
		height: fit-content;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		color: #131313;
		padding: 20px 0;
	}
	.made{
		color: #5b4200;
	}
	.text{
		position: relative;
		width: 100%;
		height: fit-content;
		text-align: center;
		font-size: 14px;
		font-weight: bold;
		color: #131313;
	}
	.number{
		position: relative;
		width: 100%;
		height: fit-content;
		text-align: center;
		font-size: 30px;
		font-weight: bold;
		color: #5b4200;
	}
</style>