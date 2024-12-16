<template>
	<view>
		<div class="shop">
			<div class="top"></div>
			<div class="classfications">
				<div class="title">分 类</div>
				
				<template v-for="(item,index) in classfication">
					<!-- 								当classficationActive == index，变换当前的分类颜色	 -->
					<div class="classfication" :class="{active : classficationActive === index}" @click="jumpTab(index)">
						<!-- 								到哪个分类就显示左边的竖条 -->
						<div class="classficationBar" v-show="classficationActive === index"></div>{{item}}
					</div>
					<div class="hr" v-show="index+1 != classfication.length"></div>
				</template>
			</div>
			<scroll-view class="main" :scroll-y="true" @scroll="onScroll" :scroll-top="mainTop" :scroll-with-animation="true">
				<div class="list" v-for="(item,index) in classfication">
					<div class="listTop"><span class="label">|</span> {{item}}</div>
					<goodsCard v-for="i in goodsList" v-show="i.type == item" :data="i">
						<div class="add" @click="addGoods(i)"><img src="../../static/icon/add.png" alt="" style="width: 18px; height: 18px;"/></div>
					</goodsCard>
				</div>
				<div class="bottom" v-show="carList.length != 0"></div>
			</scroll-view>
			<!-- 小购物带 -->
			<div class="car" v-show="carList.length != 0">
				<img class="img" src="../../static/icon/paperbag.png" alt="" @click="showCar()"/>
				<div class="num">{{carLength}}</div>
				<span class="price">{{carPrice}}￥</span>
				<button class="carBtn" @click="toPay()">去结算</button>
			</div>
			<!-- 饮品特殊选择 -->
			<uni-popup ref="selectGoods" :animation="true" type="bottom" :is-mask-click="true" :safe-area="true">
				<div class="selectGoods" :class="{'selectGoodsInSugar' : selectInfo.sugar != null}">
					<img class="img" :src="''+selectInfo.img" alt="" />
					<span class="title">{{selectInfo.name}}</span>
					<span class="introduce">介绍：<br/>{{selectInfo.introduce}}</span>
					<div class="temperature" v-show="selectInfo.temperature != null">
						温度:<br/>
						<uni-data-checkbox v-model="selectTemperature" :localdata="selectInfo.temperature" mode="tag" selected-color="#4D3900"></uni-data-checkbox>
					</div>
					<div class="sugar" v-show="selectInfo.sugar != null">
						糖度:<br/>
						<uni-data-checkbox v-model="selectSugar" :localdata="selectInfo.sugar" mode="tag" selected-color="#4D3900"></uni-data-checkbox>
					</div>
					<button class="addGoods" @click="confirm(selectInfo)">添 加</button>
				</div>
			</uni-popup>
			<!-- 购物袋 -->
			<uni-popup ref="carShopping" :animation="true" type="bottom" :is-mask-click="true" :safe-area="true" :mask-click="closeCar()">
				<div class="carShopping">
					<div class="title">购物袋</div>
					<div class="clear" @click="clearCar()"><uni-icons type="trash-filled" color="4D3900" size="20"></uni-icons></div>
					<div v-for="(i,d) in carList">
						<carShoppingInfo :data="i">
							<div class="operateBtn">
								<div class="delNum" @click="delGoodsNum(i)"><img class="img" src="../../static/icon/minus.png" alt="" /></div>
								{{i.num}}
								<div class="addNum" @click="addGoodsNum(i)"><img class="img" src="../../static/icon/add.png" alt="" /></div>
							</div>
						</carShoppingInfo>
						<div class="hr" v-show="d+1 != carList.length"></div>
					</div>
					<div class="buttom"></div>
				</div>
			</uni-popup>
		</div>
	</view>
</template>

<script setup>
	import { ref,onMounted } from 'vue';
	import goodsCard from '../../components/goodsCard.vue'
	import carShoppingInfo from '../../components/carShoppingInfo.vue'
	import {getGoods} from '../../api/shop.js'
	const classfication = ref(['咖啡','饮品','特调','酥点'])
	const classficationTop = ref([])
	// 这个变量用于控制滚动到哪个分类
	const classficationActive = ref(0)
	// 这个变量用于控制列表滚动到哪个位置
	const mainTop = ref(0)
	const goodsList = ref([])
	const finishSugarAndTemperature = (array)=>{
		let temp = []
		for (let i = 0; i < array.length; i++) {
			temp.push({
				value:array[i],
				text:array[i]
			})
		}
		return temp
	}
	// 获取商品列表
	const getGoodsList = async()=>{
		await getGoods().then(res=>{
			let data = res.data.data
			let temp = []
			for (var i = 0; i < data.length; i++) {
				if(data[i].type === '酥点'){
					temp.push({
						id:data[i].id,
						name:data[i].name,
						img:data[i].img,
						introduce:data[i].introduce,
						price:data[i].price,
						type:data[i].classname,
					})
				}
				else{
					let temperature = null
					if(data[i].temperature !== null){
						temperature = finishSugarAndTemperature(data[i].temperature.split(','))
					}
					let sugar = null
					if(data[i].sugar !== null){
						sugar = finishSugarAndTemperature(data[i].sugar.split(','))
						
					}
					temp.push({
						id:data[i].id,
						name:data[i].name,
						img:data[i].img,
						introduce:data[i].introduce,
						price:data[i].price,
						type:data[i].classname,
						temperature:temperature,
						sugar:sugar
					})
				}
			}
			goodsList.value = temp
		}).catch(err=>{
			console.log(err);
		})
		getDivPosition()
	}
	getGoodsList()
	const getDivPosition = ()=>{
		classficationTop.value = []
		const query = uni.createSelectorQuery()
		query.selectAll(".list").boundingClientRect(data =>{
			for(let i = 0;i<data.length;i++){
				classficationTop.value.push(data[i].top - 90)
			}
		}).exec()
	}
	
	// 用于控制分类的跳转
	const jumpTab = (v)=>{
		classficationActive.value = v
		mainTop.value = classficationTop.value[v]
	}
	// 滚动时触发，用于控制列表到那个分类
	const onScroll = (e)=>{
		if(e.detail.scrollTop < classficationTop.value[1]*2/3){
			classficationActive.value = 0
		}else if(e.detail.scrollTop < classficationTop.value[2]*2/3){
			classficationActive.value = 1
		}else if(e.detail.scrollTop < classficationTop.value[3]*4/5){
			classficationActive.value = 2
		}else{
			classficationActive.value = 3
		}
	}
	const addmsg = (s)=>{
		uni.showToast({
			title: s,
			icon: 'none'
		});
	}
	const carList = ref([])
	const carLength = ref(0)
	const carPrice = ref(0)
	
	if(uni.getStorageSync('shoppingCar') != null && uni.getStorageSync('shoppingCar') != ""){
		carList.value = uni.getStorageSync('shoppingCar')
	}
	const reflashCar = ()=>{
		let length = 0
		let price = 0
		let item = null
		for (let i = 0; i < carList.value.length; i++) {
			item = carList.value[i]
			length += item.num
			price += item.price * item.num
		}
		carLength.value = length
		carPrice.value = price
		uni.setStorageSync('shoppingCar',carList.value)
	}
	reflashCar()
	const selectGoods = ref()
	const selectInfo = ref({})
	const selectTemperature = ref("冰")
	const selectSugar = ref("无糖")
	const addGoods = (item)=>{
		if(item.type === '酥点'){
			let flag = false
			for (let i = 0; i < carList.value.length; i++) {
				if(carList.value[i].name == item.name){
					flag = true
					carList.value[i].num += 1
					break;
				}
			}
			if(!flag){
				carList.value.push({
					id:item.id,
					name:item.name,
					img:item.img,
					num:1,
					price:item.price
				})
			}
			addmsg('已添加 '+item.name)
			reflashCar()
		}
		else{
			if(item.temperature != undefined){
				selectTemperature.value = item.temperature[0].value
			}
			if(item.sugar != undefined){
				selectSugar.value = item.sugar[0].value
			}
			
			selectInfo.value = item
			selectGoods.value.open()
		}
		
	}
	const addGoodsNum = (i)=>{
		let item = null
		for (let index = 0; index < carList.value.length; index++) {
			item = carList.value[index]
			if(item == i){
				item.num += 1
				break;
			}
		}
	}
	const delGoodsNum = (i)=>{
		let item = null
		for (let index = 0; index < carList.value.length; index++) {
			item = carList.value[index]
			if(item == i){
				if(item.num == 1){
					carList.value.splice(index,1)
				}
				else{
					item.num -= 1
				}
				break;
			}
		}
		if(carList.value.length == 0){
			closeCar()
		}
	}
	const confirm = (item)=>{
		let flag = true
		let i = null
		for (let index = 0; index < carList.value.length; index++) {
			i = carList.value[index]
			if(i.name == item.name && i.temperature == selectTemperature.value && (i.sugar == selectSugar.value || i.sugar == null)){
				i.num += 1
				flag = false
				break;
			}
		}
		if(flag){
			if(item.sugar != null){
				carList.value.push({
					id:item.id,
					name:item.name,
					img:item.img,
					num:1,
					temperature:selectTemperature.value,
					sugar:selectSugar.value,
					price:item.price
				})
				addmsg('已添加 '+item.name+'['+selectTemperature.value+'/'+selectSugar.value+']')
			}
			else{
				carList.value.push({
					name:item.name,
					img:item.img,
					num:1,
					temperature:selectTemperature.value,
					price:item.price
				})
				addmsg('已添加 '+item.name+'['+selectTemperature.value+']')
			}
		}
		selectInfo.value = {}
		selectTemperature.value = "冰"
		selectSugar.value = "无糖"
		reflashCar()
		selectGoods.value.close()
		
	}
	const carShopping = ref()
 	const showCar = ()=>{
		carShopping.value.open()
	}
	const closeCar = ()=>{
		reflashCar()
	}
	const clearCar = ()=>{
		carList.value = []
		reflashCar()
		carShopping.value.close()
	}
	const toPay = ()=>{
		// uni.navigateTo({
		// 	url:"/pages/payPage/payPage"
		// })
		if(uni.getStorageSync('isLogin')){
			uni.navigateTo({
				url:"/pages/payPage/payPage"
			})
		}
		else{
			uni.showToast({
				title: '请先登录',
				icon: 'none'
			});
		}
	}
	onMounted(getDivPosition);
</script>

<style scoped lang="scss">
	.shop{
		width: 100vw;
	}
	.top{
		position: fixed;
		height: 90px;
		width: 100vw;
		background-color: #4D3900;
		z-index: 999;
	}
	.main{
		position: relative;
		top: 90px;
		left: 80px;
		height: calc(100vh - 90px);
		width: calc(100vw - 80px);
		background-color: #f1f1f1;
	}
	.main .bottom{
		position: relative;
		width: 1px;
		height: 70px;
	}
	.listTop{
		position: relative;
		top: 15px;
		left: 10px;
		width: calc(100vw - 80px - 40px);
		height: 20px;
		font-size: 14px;
	}
	.listTop .label{
		color: #4D3900;
		font-size: 16px;
		font-weight: bold;
	}
	.add{
		position: absolute;
		text-align: center;
		width: 18px;
		height: 18px;
		border-radius: 50%;
		right: 5px;
		bottom: 0;
	}
	.classfications{
		position: fixed;
		top: 90px;
		height: calc(100vh - 90px - 60px);
		width: 80px;
		background-color: #fff;
		z-index: 5;
	}
	.title{
		position: relative;
		margin: 10px 0;
		display: flex;
		justify-content: center;
		align-items: center;
		font-weight: bold;
		height: 60px;
	}
	.classfication{
		display: flex;
		justify-content: center;
		align-items: center;
		height: 60px;
		color: #131313;
		font-weight: bold;
	}
	.classficationBar{
		position: absolute;
		left: 0;
		height: 60px;
		width: 4px;
		background-color: #4D3900;
	}
	.active{
		background-color: #f1f1f1;
	}
	.hr{
		position: relative;
		width: 90%;
		height: 1px;
		background-color: #f1f1f1;
		margin: 0 5%;
	}
	/* 购物车 */
	.car{
		position: fixed;
		width: 90vw;
		height: 50px;
		left: 5vw;
		background-color: #ffffff;
		z-index: 10;
		border-radius: 10px;
		
		bottom: 5px;
		// 下面这条注释用h5看效果时用
		// bottom: 70px;
	}
	.car .img{
		width: 35px;
		height: 35px;
		margin: 8px;
	}
	.car .num{
		position: absolute;
		top: 5px;
		left: 35px;
		width: 18px;
		min-height: 18px;
		background-color: #4D3900;
		border-radius: 50%;
		text-align: center;
		font-size: 12px;
		color: #f1f1f1;
	}
	.car .price{
		position: absolute;
		top: 25px;
		right: 140px;
		font-size: 15px;
		font-weight: bold;
	}
	.car .carBtn{
		position: absolute;
		width: 100px;
		height: 30px;
		background-color: #4D3900;
		top: 12px;
		right: 30px;
		text-align: center;
		line-height: 30px;
		font-size: 15px;
		font-weight: bold;
		color: #f1f1f1;
	}
	/* 特殊选择 */
	.selectGoods{
		position: relative;
		height: 250px;
		width: 100vw;
		background-color: #fafafa;
		border-radius: 10px 10px 0 0;
		bottom: -80rpx;
		// 下面这条注释用h5看效果时用
		// bottom: 110rpx;
	}
	.selectGoodsInSugar{
		height: 320px;
	}
	.selectGoods .img{
		position: relative;
		width: 100px;
		height: 100px;
		top: 20px;
		left: 20px;
		border-radius: 10px;
	}
	.selectGoods .title{
		position: absolute;
		top: 0px;
		left: 140px;
		font-size: 15px;
		font-weight: bold;
	}
	.selectGoods .introduce{
		position: absolute;
		top: 60px;
		left: 140px;
		font-size: 12px;
		color: #888888;
	}
	.selectGoods .temperature{
		position: relative;
		top: 30px;
		left: 20px;
		font-size: 14px;
		color: #888888;
	}
	.selectGoods .sugar{
		position: relative;
		top: 40px;
		left: 20px;
		font-size: 14px;
		color: #888888;
	}
	.selectGoods .addGoods{
		position: absolute;
		width: 80px;
		height: 30px;
		bottom: 20px;
		right: 20px;
		background-color: #4D3900;
		text-align: center;
		line-height: 30px;
		font-size: 15px;
		font-weight: bold;
		color: #f1f1f1;
	}
	/* 购物袋 */
	.carShopping{
		position: relative;
		min-height: 50px;
		width: 100vw;
		background-color: #fff;
		z-index: 12;
		border-radius: 10px 10px 0 0;
		bottom: -80rpx;
		// 下面这条注释用h5看效果时用
		// bottom: 120rpx;
	}
	.carShopping .buttom{
		position: relative;
		height: 5px;
	}
	.carShopping .title{
		position: relative;
		height: 30px;
		display: block;
		width: 80vw;
		top: 15px;
		left: 20px;
		font-size: 12px;
		font-weight: 100;
	}
	.carShopping .clear{
		position: absolute;
		top: 10px;
		right: 20px;
	}
	.operateBtn{
		position: absolute;
		width: 100px;
		height: 30px;
		top: 5px;
		right: 0px;
		z-index: 11;
		display: flex;
		justify-content: center;
		align-items: center;
		line-height: 0px;
		font-size: 15px;
	}
	.operateBtn .img{
		width: 18px;
		height: 18px;
	}
	.addNum,.delNum{
		width: 18px;
		height: 18px;
		margin: 0 10px;
	}
</style>
