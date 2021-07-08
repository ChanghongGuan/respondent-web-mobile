<template>
	<view>
		<!-- 排序条 一次只可以排序一个字段 -->
		<view class="sort">
			<view v-for="(item,index) in currentSortParams" :key="index" @click="sorta(item)">{{item.label}}
				<!-- 排序箭头图标的显示 -->
				<view v-show="item.order" style="display: inline">
					<u-icon v-show="item.order === 'asc'" name="arrow-up-fill"></u-icon>
					<u-icon v-show="item.order === 'desc'" name="arrow-down-fill"></u-icon>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "sortBar",
		data() {
			return {
				// 组件里面存放的相关数据
				currentSortParams: []
			};
		},
		props: {
			// 接收数组 [{label::"",value:""}]
			sortParams: Array,
			// 当排序参数被点击事件  形参传递 {order:"",value:""}   value:是父组件传递过来的数组中的value的值,order是排序状态的值有三个状态("asc","desc",null)
			onChange: Function
		},
		created() {
			this.sortParams.forEach(item => {
				// 添加上一个order属性
				let temp = {
					...item,
					order: null
				}
				this.currentSortParams.push(temp)
			})
		},
		methods: {
			// 排序方法
			sorta(obj) {
				// 进行三种排序状态的切换
				if (obj.order) {
					obj.order = obj.order === 'asc' ? "desc" : null
				} else {
					obj.order = 'asc'
				}
				
				// 将其他字段的排序给置空
				for (var i = 0; i < this.currentSortParams.length; i++) {
					let item = this.currentSortParams[i]
					if(item.value !== obj.value){
						item.order = null
					}
				}
				// 调用父组件传递过来的方法
				if (this.onChange) {
					this.onChange(obj)
				}
			}
		}
	}
</script>

<style scoped="scoped">
	.sort {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 2px 0;
	}
</style>
