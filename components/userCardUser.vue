<!-- 用户页面的用户信息卡片 -->
<template>
	<view>
		<div class="usercard" v-show="isLogin" @click="isLogout()">
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
		<uni-popup ref="logoutPage">
			<div>
				<div class="logout">
					<div class="title">退出登录</div>
					<div class="content">确定要退出登录吗？</div>
					<div class="operate">
						<div class="btn" @click="logout">确定</div>
						<div class="btn" @click="cancel">取消</div>
					</div>
				</div>
			</div>
		</uni-popup>
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
	const logoutPage = ref()
	const isLogout = ()=>{
		logoutPage.value.open()
	}
	const logout = ()=>{
		uni.removeStorageSync('isLogin')
		uni.removeStorageSync('user')
		isLogin.value = false
		logoutPage.value.close()
		uni.showToast({
			title: '退出登录成功',
			icon: 'success'
		});
		uni.reLaunch({
			url: '/pages/index/index'
		})
	}
	const cancel = ()=>{
		logoutPage.value.close()
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
	.logout{
		position: relative;
		width: 500rpx;
		height: 200rpx;
		background-color: #fff;
		border-radius: 10px;
	}
	.title{
		position: relative;
		width: 100%;
		top: 10rpx;
		text-align: center;
		font-size: 40rpx;
		font-weight: bold;
		color: #131313;
	}
	.content{
		position: relative;
		top: 20rpx;
		width: 100%;
		text-align: center;
		color: #646464;
		font-size: 30rpx;
	}
	.operate{
		position: relative;
		width: 100%;
		display: flex;
		justify-content: space-around;
	}
	.btn{
		position: relative;
		top: 40rpx;
		width: 120rpx;
		height: 50rpx;
		background-color: #4D3900;
		color: #f1f1f1;
		text-align: center;
		line-height: 50rpx;
		border-radius: 10rpx;
	}
	
</style>