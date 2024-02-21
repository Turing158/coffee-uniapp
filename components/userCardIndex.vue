<!-- 主页的用户信息卡片 -->
<template>
	<view>
		<div class="card" v-show="isLogin">
			<img src="https://www.z4a.net/images/2024/01/18/logo.md.jpg" class="header"/>
			<span class="username">Hi, {{username}}</span>
			<span class="info">共点过 <span class="num">{{num}}</span> 杯</span>
			<!-- <span class="info num">TreeHouse Coffee</span> -->
		</div>
		<div class="card" v-show="!isLogin">
			<img src="https://www.z4a.net/images/2024/01/18/logo.md.jpg" class="header"/>
			<span class="notLogin">未登录,点击登录</span>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	const username = ref()
	const num = ref()
	const isLogin = ref()
	const props = defineProps({
		data:Object,
		isLogin:{
			type:Boolean,
			default:false
		}
	})
	if(props.isLogin){
		username.value = props.data.name
		num.value = props.data.num
		isLogin.value = props.isLogin
	}
</script>

<style scoped>
	.card{
		position: relative;
		background-color: #fefefe;
		width: 80%;
		height: 70px;
		top: -50px;
		margin: 0 10%;
		border-radius: 10px;
	}
	.header{
		position: relative;
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 1px solid #131313;
		top: 10px;
		left: 10px;
	}
	.notLogin{
		position: relative;
		left: 30px;
		top: -10px;
		font-weight: bold;
	}
	.username{
		position: absolute;
		top: 8px;
		margin-left: 55px;
		letter-spacing: 1px;
		font-size: 18px;
	}
	.info{
		position: absolute;
		font-size: 14px;
		margin-left: 80px;
		bottom: 10px;
	}
	.num{
		font-weight: bold;
		color: #88521d;
	}
</style>