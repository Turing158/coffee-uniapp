<template>
	<view>
		<div>
			<uni-popup ref="loginPage" :animation="true" type="bottom" :is-mask-click="true" :safe-area="false">
				<div class="loginPage">
					<div class="title">登录</div>
					<div class="lg">
						<span class="label">账号:</span>
						<input type="text" class="input" v-model="accountLogin"/>
					</div>
					<div class="lg">
						<span class="label">密码:</span>
						<input type="password" class="input" v-model="passwordLogin"/>
					</div>
					<div class="operate">
						<button class="btn" @click="toReg()">注册</button>
						<button class="btn" @click="confirmLogin()">登录</button>
					</div>
				</div>
			</uni-popup>
			<uni-popup ref="regPage" :animation="true" type="bottom" :is-mask-click="true" :safe-area="false">
				<div class="loginPage regPage">
					<div class="title">注册</div>
					<div class="lg">
						<span class="label">账号:</span>
						<input type="text" class="input" v-model="accountReg"/>
					</div>
					<div class="lg">
						<span class="label">密码:</span>
						<input type="password" class="input" v-model="passwordReg"/>
					</div>
					<div class="lg">
						<span class="label">电话:</span>
						<input type="number" class="input" v-model="phoneReg"/>
					</div>
					<div class="operate">
						<button class="btn" @click="toLogin()">登录</button>
						<button class="btn" @click="confirmReg()">注册</button>
					</div>
				</div>
			</uni-popup>
		</div>
	</view>
</template>

<script setup>
	import {login,reg} from '../api/login.js'
	import {ref,defineExpose} from 'vue'
	const loginPage = ref()
	const regPage = ref()
	const accountLogin = ref()
	const passwordLogin = ref()
	const accountReg = ref()
	const passwordReg = ref()
	const phoneReg = ref()
	const toLogin = ()=>{
		loginPage.value.open()
		regPage.value.close()
		accountLogin.value = null
		passwordLogin.value = null
		accountReg.value = null
		passwordReg.value = null
		phoneReg.value = null
	}
	const toReg = ()=>{
		loginPage.value.close()
		regPage.value.open()
		accountLogin.value = null
		passwordLogin.value = null
		accountReg.value = null
		passwordReg.value = null
		phoneReg.value = null
	}
	const confirmLogin = ()=>{
		if(accountLogin.value == null || accountLogin.value.length == 0){
			showtips("请输入账号")
		}
		else if(passwordLogin.value == null){
			showtips("请输入密码")
		}
		else{
			showtips("登录中...")
			login(accountLogin.value,passwordLogin.value).then(res=>{
				let data = res.data.data
				let status = res.data.status
				let msg = res.data.msg
				if(status == 200){
					console.log(data);
					showtips("登录成功")
					uni.setStorageSync('isLogin',true)
					uni.setStorageSync('user',data)
					uni.reLaunch({
						url: '/pages/index/index'
					})
				}
				else{
					showtips(msg)
				}
			}).catch(err=>{
				showtips("服务器错误")
				console.log(err);
			})
		}
	}
	const confirmReg = async()=>{
		if(accountReg.value == null || accountReg.value.length == 0){
			showtips("请输入账号")
		}
		else if(passwordReg.value == null){
			showtips("请输入密码")
		}
		else if(passwordReg.value.length < 6){
			showtips("密码不得少于6位")
		}
		else if(phoneReg.value == null){
			showtips("请输入手机号")
		}
		else if(phoneReg.value.length < 11){
			showtips("手机号不得少于11位")
		}
		else{
			showtips("注册中...")
			await reg(accountReg.value,passwordReg.value,phoneReg.value).then(res=>{
				let data = res.data.data
				let status = res.data.status
				let msg = res.data.msg
				if(status == 200){
					showtips("注册成功")
					toLogin()
				}
				else{
					showtips(msg)
				}
				console.log(res);
			}).catch(err=>{
				showtips("服务器错误")
				console.log(err);
			})
		}
	}
	const showtips = (str)=>{
		uni.showToast({
			title: str,
			icon: 'none'
		})
	}
	defineExpose({
		toLogin
	})
</script>

<style>
	.loginPage{
		position: relative;
		width: 100vw;
		height: 350px;
		background-color: #f1f1f1;
		border-radius: 10px 10px 0 0;
	}
	.loginPage .title{
		position: relative;
		text-align: center;
		font-size: 25px;
		height: 50px;
		line-height: 50px;
		font-weight: bold;
		width: 100%;
	}
	.loginPage .lg{
		position: relative;
		width: 80vw;
		height: 50px;
		left: 4vw;
	}
	
	.loginPage .lg .label{
		position: absolute;
		top: 25px;
		left: 0;
	}
	.loginPage .lg .input{
		position: relative;
		top: 20px;
		left: 40px;
		height: 30px;
		border-bottom: 1px solid #131313;
		padding: 0 10px;
	}
	.loginPage .operate{
		position: relative;
		top: 50px;
		width: 100%;
		text-align: center;
	}
	.loginPage .btn{
		position: relative;
		display:inline-block;
		width: 100px;
		height: 40px;
		background-color: #4D3900;
		color: #f1f1f1;
		margin: 0 20px;
		box-sizing: none;
	}
	.regPage{
		height: 400px;
	}
</style>