<template>
	<view>
		<div class="reservation">
			<p class="text">预约时间</p>
			<div class="selectTime" @click="selectTimePageFn()">{{selectTime}}<uni-icons type="right" size="14" color="#5b4200"></uni-icons></div>
			<uni-popup ref="selectTimePage" type="bottom" :animation="true" :is-mask-click="true" :safe-area="true">
				<div class="selectTimePage">
					<p class="title">请选择预约时间</p>
					<div class="day">今天(周{{getWeek()}})</div>
					<div class="time">
						<div class="times" :class="{active : selectTime == i}" v-for="i in time" @click="selectTimeFn(i)">
						&nbsp;&nbsp;&nbsp;&nbsp;{{i}}<uni-icons type="checkbox-filled" size="20" v-show="selectTime === i" style="position: absolute;right: 10px;"></uni-icons>
						<div class="hr"></div>
						</div>
					</div>
				</div>
			</uni-popup>
		</div>
	</view>
</template>

<script setup>
	import { ref,onMounted } from "vue"
	const props = defineProps(['st'])
	const emit = defineEmits(['udate'])
	const selectTimePage = ref()
	const selectTime = ref(props.st)
	const date = new Date()
	// const date = new Date("2024/1/11 17:11:00")
	const time = ref([])
	const selectTimePageFn = ()=>{
		selectTimePage.value.open()
	}
	
	const selectTimeFn = (i)=>{
		selectTime.value = i
		uni.setStorageSync('reservation',i)
	}
	
	time.value.push("立即取餐")
	let tmpMin = parseInt(date.getMinutes()/10)*10
	let tmpMinArr = [0,10,20,30,40,50]
	for(let i = 0;i<24-date.getHours()-5;i++){
		if(i != 0){
			for(let j = 0;j<tmpMinArr.length;j++){
				let temp = tmpMinArr[j]
				if(temp<10){
					temp = "0"+temp
				}
				time.value.push(date.getHours()+i+":"+temp)
			}
		}
		else{
			for(let j = 0;j<tmpMinArr.length;j++){
				if(tmpMinArr[j] > tmpMin+1){
					time.value.push(date.getHours()+i+":"+tmpMinArr[j])
				}
			}
		}
	}
	const getWeek = ()=>{
		let week = date.getDay()
		let weekArr = ["日","一","二","三","四","五","六"]
		return weekArr[week]
	}
	onMounted(()=>{})
</script>

<style>
	.reservation .selectTime{
		position: absolute;
		text-align: right;
		right: 0;
		top: 0;
		color: #5b4200;
	}
	.reservation .selectTimePage{
		position: relative;
		width: 100vw;
		height: 400px;
		border-radius: 10px;
		background-color: #f1f1f1;
		bottom: -60px;
		
	}
	.reservation .selectTimePage .title{
		position: absolute;
		width: 100%;
		height: 50px;
		top: 0;
		line-height: 50px;
		font-size: 18px;
		font-weight: bold;
		text-align: center;
		color: #5b4200;
	}
	.reservation .selectTimePage .day{
		position: absolute;
		width: 40%;
		height: 50px;
		top: 16%;
		left: 0;
		line-height: 50px;
		font-size: 16px;
		font-weight: bold;
		text-align: center;
		background-color: #fff;
		color: #5b4200;
	}
	.reservation .selectTimePage .time{
		position: absolute;
		width: 60%;
		height: 70%;
		right: 0;
		top: 16%;
		overflow-y: auto;
		background-color: #fff;
	}
	.reservation .selectTimePage .time .times{
		width: 100%;
		height: 45px;
		line-height: 40px;
		font-size: 16px;
	}
	.reservation .selectTimePage .time .active{
		color: #6f4f00;
	}
</style>