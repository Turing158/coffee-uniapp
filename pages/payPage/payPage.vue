<template>
	<view>
		<div class="payPage">
			<zero-loading v-if="loading" type="bounce" mask :maskOpacity="0.4" :maskMini="true"></zero-loading>
			<div class="top">
				<div class="geroInfo">
					<p class="name">树屋咖啡TreeHouse Coffee</p>
					<span class="geroText"><uni-icons type="location" size="14"></uni-icons>珠海市香洲区</span>
				</div>
				<div class="hr"></div>
				<div class="reservation">
					<reservation :st="selectTime" :udate="selectTime"></reservation>
				</div>
				<div class="hr"></div>
				<div class="form">
					<div class="formBtn" :class="{active : selectForm === '店内享受'}" @click="selectFormFn('店内享受')">店内享受</div>
					<div class="formBtn" :class="{active : selectForm === '打包走人'}" @click="selectFormFn('打包走人')">打包走人</div>
				</div>
			</div>
			<div class="list">
				<payShoppingList :data="carList"></payShoppingList>
			</div>
			<div class="note" @click="openNote()">
				<span class="title">备注:</span><uni-icons class="icon" type="right" size="16"></uni-icons>
				<uni-popup ref="notePage" type="bottom" :is-mask-click="true" :animation="true" :safe-area="true">
					<div class="editNote">
						<p class="title">备注：</p>
						<span class="tips">tips:点击灰白部分确认关闭</span>
						<textarea class="textarea" v-model="note"></textarea>
					</div>
				</uni-popup>
			</div>
			<div class="buttom"></div>
			<div class="pay">
				<span class="price">共{{num}}件 合计:<span class="fuhao">￥</span><span class="sumPrice">{{sum}}</span></span>
				<button class="btn" @click="finalPay()">支 付</button>
			</div>
		</div>
	</view>
</template>

<script setup>
	import reservation from "../../components/reservation.vue"
	import payShoppingList from "../../components/payShoppingList.vue"
	import { onMounted, ref } from "vue"
	import { payOrder } from "../../api/order.js"
	const selectForm = ref("店内享受")
	const selectTime = ref("立即取餐")
	uni.setStorageSync('reservation',"立即取餐")
	const carList = ref([])
	const sum = ref(0)
	const num = ref(0)
	const notePage = ref(null)
	const note = ref("")
	const loading = ref(false)
	const selectFormFn = (index) => {
		selectForm.value = index
	}
	carList.value = uni.getStorageSync('shoppingCar')
	let sumTmp = 0
	let numTmp = 0
	for (var i = 0; i < carList.value.length; i++) {
		sumTmp += carList.value[i].price*carList.value[i].num
		numTmp += carList.value[i].num
	}
	sum.value = sumTmp
	num.value = numTmp
	const openNote = () => {
		notePage.value.open()
	}
	onMounted(()=>{})
	const finalPay = async()=>{
		// loading.value = true
		let date = new  Date()
		let newGoods = []
		for (var i = 0; i < carList.value.length; i++) {
			newGoods.push({
				"id":carList.value[i].id,
				"num":carList.value[i].num,
				"temperature":carList.value[i].temperature,
				"sugar":carList.value[i].sugar
			})
		}
		var order = {
			"goods":JSON.stringify(newGoods),
			"user":uni.getStorageSync('user').user,
			"price":sum.value,
			"date":date.toLocaleString(),
			"status":2,
			"useForm":selectForm.value,
			"reservation":selectTime.value,
			"note":note.value
		}
		await payOrder(order).then(res=>{
			let msg = res.data.msg;
			let status = res.data.status;
			let data = res.data.data;
			if(status == 200){
				uni.showToast({
					title:"支付订单成功",
					icon:"success"
				})
				uni.setStorageSync('shoppingCar',[])
				uni.setStorageSync('order',data)
				uni.reLaunch({
					url:"/pages/shop/shop"
				})
				uni.navigateTo({
					url:"/pages/orderPage/orderPage"
				})
			}
			else{
				uni.showToast({
					title:msg,
					icon:"none"
				})
			}
			console.log(res);
		}).catch(err=>{
			uni.showToast({
				title: "支付失败,请联系后台！",
				icon: "none"
			})
			console.log(err);
		})
	}
</script>

<style scoped>
	.payPage{
		position: relative;
		background-color: #f1f1f1;
		height: 100vh;
		overflow-x: hidden;
	}
	.hr{
		width: 90%;
		height: 1px;
		background-color: #f1f1f1;
		margin: 0 auto;
	}
	.top{
		position: relative;
		width: 92vw;
		height: 180px;
		background-color: #fff;
		border-radius: 10px;
		top: 20px;
		left: 4vw;
	}
	.top .geroInfo{
		position: relative;
		width: 90%;
		height: 60px;
		margin: 10px auto;
		top: 10px;
	}
	.top .geroInfo .name{
		font-size: 18px;
		font-weight: bold;
	}
	.top .geroInfo .geroText{
		font-size: 14px;
		color: #666;
	}
	.top .reservation{
		position: relative;
		width: 90%;
		height: 20px;
		margin: 10px auto;
		display: flex;
		font-size: 14px;
		font-weight: bold;
	}
	.top .form{
		position: relative;
		width: 90%;
		height: 40px;
		margin: 10px auto;
		display: flex;
		font-size: 15px;
		font-weight: bold;
	}
	.top .form .formBtn{
		width: 46%;
		height: 40px;
		justify-content: center;
		align-items: center;
		display: flex;
		border: 1px solid #eee;
		border-radius: 5px;
		margin: 0 2%;
	}
	.top .form .active{
		border: 1px solid #5b4200;
	}
	.list{
		position: relative;
		width: 92vw;
		min-height: 50px;
		background-color: #fff;
		border-radius: 10px;
		top: 40px;
		left: 4vw;
	}
	.note{
		position: relative;
		top: 60px;
		left: 4vw;
		width: 92vw;
		min-height: 40px;
		background-color: #fff;
		border-radius: 10px;
	}
	.note .title{
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 14px;
		color: #666;
	}
	.note .icon{
		position: absolute;
		top: 10px;
		right: 10px;
	}
	.note .editNote{
		position: relative;
		width: 100vw;
		height: 240px;
		background-color: #fff;
		border-radius: 10px 10px 0 0;
		/* bottom: -40px; */
		bottom: 20px;
	}
	.note .editNote .title{
		position: absolute;
		top: 10px;
		left: 10px;
		font-size: 14px;
		color: #666;
	}
	.note .editNote .tips{
		position: absolute;
		top: 15px;
		right: 10px;
		font-size: 12px;
		color: #999;
	}
	.note .editNote .textarea{
		position: absolute;
		width: 90%;
		height: 100px;
		top: 40px;
		left: calc(5% - 10px);
		padding: 10px;
		border: none;
		border-radius: 10px;
		background-color: #f1f1f1;
	}
	.buttom{
		position: relative;
		width: 100vw;
		height: 70px;
		background-color: #f1f1f1;
		top: 80px;
	}
	.pay{
		position: fixed;
		bottom: 0;
		width: 100vw;
		height: 80px;
		background-color: #fff;
		box-shadow: 0 0 10px #ccc;
		border-radius: 10px 10px 0 0;
		z-index: 999;
	}
	.pay .price{
		position: absolute;
		top: 25px;
		left: 10px;
		font-size: 14px;
	}
	.pay .price .fuhao{
		color: #5b4200;
		font-size: 12px;
		font-weight: bold;
	}
	.pay .price .sumPrice{
		color: #5b4200;
		font-size: 18px;
		font-weight: bold;
	}
	.pay .btn{
		position: absolute;
		right: 10px;
		top: 10px;
		width: 100px;
		height: 40px;
		line-height: 40px;
		background-color: #5b4200;
		color: #fff;
		border-radius: 5px;
		font-size: 18px;
		font-weight: bold;
	}
</style>
