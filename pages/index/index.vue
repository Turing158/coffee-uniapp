<template>
	<view>
		<div class="home">
			<loginReg ref="loginRegPage"></loginReg>
			<zero-loading v-if="loading" type="bounce" mask :maskOpacity="0.4" :maskMini="true" position="fixed"></zero-loading>
			<swiper :indicator-dots="false" :autoplay="true" :interval="10000" class="ppt" :circular="true" easing-function="easeInOutCubic">
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt0.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt1.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt2.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt3.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt4.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
				<swiper-item>
					<img src="https://www.z4a.net/images/2024/01/18/ppt5.md.jpg" style="width: 100%;height: 100%;object-fit: cover;">
				</swiper-item>
			</swiper>
			<div @click="userCardClick()"><userCard :data="getUserData" :isLogin="isLogin"></userCard></div>
			<operateBtn></operateBtn>
			
		</div>
	</view>
</template>

<script setup>
	import userCard from '../../components/userCardIndex.vue'
	import operateBtn from '../../components/operateBtn.vue'
	import loginReg from '../../components/loginReg.vue'
	import {getUser} from '../../api/user.js'
	import { ref,onMounted } from 'vue'
	const tips = ref()
	const isLogin = ref(false)
	const getUserData = uni.getStorageSync('user')
	const info = ref("")
	const loading = ref(false)
	const loginRegPage = ref()
	const userCardClick = ()=>{
		if(!loading.value){
			if(!isLogin.value){
				loginRegPage.value.toLogin()
			}
		}
	}
	if(uni.getStorageSync('isLogin')){
		isLogin.value = true
	}
	const show = ref(true)
	const change = ()=>{
		show.value = !show.value
	}
	onMounted(()=>{
	
	})
	
</script>

<style>
	.home{
		background-color: #f1f1f1;
		height: 100vh;
	}
	.ppt{
		height: 450px;
		overflow: hidden;
	}
	
</style>
