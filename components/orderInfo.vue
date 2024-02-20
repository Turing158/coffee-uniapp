<template>
	<view>
		<div class="info">
			<p class="title">订单信息</p>
			<div class="hr"></div>
			<div class="infoList">
				<div class="infoItem">
					<div class="infoTitle">订单编号</div>
					<div class="infoContent">{{props.data.id}}</div>
				</div>
				<div class="infoItem">
					<div class="infoTitle">用餐方式</div>
					<div class="infoContent">{{props.data.useForm}}</div>
				</div>
				<div class="infoItem">
					<div class="infoTitle">预定时间</div>
					<div class="infoContent">{{props.data.reservation}}</div>
				</div>
				<div class="infoItem">
					<div class="infoTitle">支付方式</div>
					<div class="infoContent">微信支付</div>
				</div>
				<div class="infoItem">
					<div class="infoTitle">下单时间</div>
					<div class="infoContent">{{props.data.date}}</div>
				</div>
				<div class="infoItem">
					<div class="infoTitle">备注</div>
					<div class="infoContent">{{props.data.note}}</div>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>
	const props = defineProps({
		data:Object
	})
	
</script>

<style scoped>
	.hr{
		position: relative;	
		width: 92%;
		height: 1px;
		background-color: #f1f1f1;
		left: 4%;
	}
	.title{
		position: relative;
		height: 30px;
		line-height: 40px;
		font-size: 14px;
		font-weight: bold;
		color: #131313;
		left: 5%;
		padding-bottom: 10px;
	}
	.infoList{
		position: relative;
		width: 90%;
		margin: 0 auto;
	}
	.infoItem{
		position: relative;
		width: 100%;
		height: 40px;
		font-weight: bold;
		line-height: 40px;
	}
	.infoTitle{
		position: absolute;
		left: 0;
		top: 0;
		font-size: 14px;
		color: #6b6b6b;
	}
	.infoContent{
		position: absolute;
		right: 0;
		top: 0;
		font-size: 14px;
		color: #5b4200;
	}
</style>