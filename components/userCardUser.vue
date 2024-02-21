<!-- 用户页面的用户信息卡片 -->
<template>
	<view>
		<div class="usercard" v-show="isLogin">
			<img src="https://www.z4a.net/images/2024/01/18/logo.md.jpg" alt="" class="head"/>
			<span class="username" >{{username}}</span>
			<br />
			<span class="info">
				<span class="subtitle">TreeHouse Coffee</span><br />
				<span class="num">共点过<span class="snum"> {{num}} </span>杯</span>
			</span>
		</div>
		<div class="usercard" v-show="!isLogin" @click="login()">
			<img src="https://www.z4a.net/images/2024/01/18/logo.md.jpg" alt="" class="head"/>
			<span class="notLogin">点击进行登录</span>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	const username = ref()
	const num = ref()
	const isLogin = ref(false)
	const props = defineProps({
		data:Object,
		isLogin:Boolean
	})
	if(props.isLogin){
		username.value = props.data.name
		num.value = props.data.num
		isLogin.value = props.isLogin
	}
	const login = ()=>{
		
	}
</script>

<style>
	.usercard{
		position: relative;
		width: 80%;
		height: 100px;
		top: 160px;
		left: 10%;
		background-color: #fff;
		border-radius: 10px;
		text-align: center;
	}
	.head{
		position: absolute;
		top: 15px;
		left: 15px;
		border-radius: 50%;
		width: 70px;
		height: 70px;
		background-color: #f1f1f1;
		border: 1px solid black;
	}
	.notLogin{
		position: relative;
		left: 30px;
		top: 35px;
		font-weight: bold;
	}
	.username{
		position: relative;
		left: 20px;
		top: 12px;
		font-size: 20px;
	}
	.info{
		position: relative;
		font-size: 13px;
		top: 18px;
		left: 25px;
		width: 150px;
		text-align: center;
		color: #646464;
	}
	.subtitle{
		color: #88521d;
		font-weight: bold;
	}
	.num{
		color: #131313;
		font-weight: bold;
	}
	.snum{
		color: #88521d;
		font-weight: bold;
	}
</style>