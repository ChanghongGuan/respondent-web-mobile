<template>
	<view class="container">
		<view class="card" v-for="item in types" @click="linkTo('/pages/word/word?typeId='+item.id)">
			<view class="title" >{{item.typeName}}</view>
			<view class="content">单词数:{{item.wordCount}}</view>
			<view class="content">答题记录数:{{item.recordCount}}</view>
			<view class="content">错题数:{{item.errorCount}}</view>
		</view>
	</view>
</template>

<script>
	import wordTypeApi from '../../api/wordTypeApi.js'

	export default {
		data() {
			return {
				// 已经登录用户的单词本列表
				types: [{
					"errorCount": 0,
					"gmtCreate": "",
					"gmtModified": "",
					"id": "",
					"recordCount": 0,
					"typeName": "",
					"wordCount": 0
				}]
			}
		},
		methods: {
			// 初始化单词本数据
			initTypeData() {
				wordTypeApi.listAll().then(res => {
					// 返回的数据不为空的情况下才会去设置
					if (res.data) {
						this.types = res.data
					}
				})
			},
			// 页面跳转
			linkTo(link) {
				uni.navigateTo({
					url: link
				})
			}
		},
		onLoad() {
			this.initTypeData()
		}
	}
</script>

<style scoped>
	.container {
		width: 100%;
		padding-top: 20px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.card {
		width: 80%;
		background-color: #2B85E4;
		margin: 5px 0;
		padding: 10px;
		font-size: large;
		border-radius: 8px;
	}

	.title {
		font-size: x-large;
		font-weight: bold;
		width: 100%;
		text-align: center;
		margin-bottom: 8px;
	}

	.content {
		margin-left: 3px;
	}
</style>
