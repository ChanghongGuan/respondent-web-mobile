<template>
	<view class="card" :style="mainStyle">
		<view class="word" @click="jump()" v-html="targetContent"></view>
		<text class="mean">{{word.mean}}</text>
		<view class="notes" v-if="word.notes">备注信息:{{word.notes}}</view>

		<u-image width="100%" height="300rpx" v-if="word.image" :src="word.image"></u-image>

		<view class="date">{{word.gmtCreate | date("mm-dd hh:ss")}}</view>
		<view class="count">答题次数:{{word.count}},错题次数:{{word.ecount}}</view>
	</view>
</template>

<script>
	export default {
		name: "WordCard",
		data() {
			return {
				mainStyle: {
					backgroundColor: "#0081FF"
				}
			};
		},
		props: {
			// 接收单词数据
			word: Object,
			// 需要高亮显示的文本内容
			highContent: String
		},
		computed: {
			// 目标内容,即给需要高亮的文本加上了对应的html标签后的文本内容
			targetContent() {
				// 三相运算符 进行一个是否为空的判断

				// 使用全局匹配的方式进行替换
				return !this.highContent ? this.word.word : this.word.word.replace(new RegExp(this.highContent, "g"), `<span style="font-weight: bold;background-color:yellow;
			">${this.highContent}</span>`)
			}
		},
		methods: {
			// 单词解释地址跳转
			jump() {
				console.log("进行页面跳转")
				window.location.herf = word.link
			}
		},
		created() {
			let colors = ["#19BE6B", "#488FF9", "#FFA401", "#FB7171"]
			let index;
			if (this.word.ecount === 0) {
				index = 0
			} else if (this.word.ecount > 0 && this.word.ecount <= 2) {
				index = 1
			} else if (this.word.ecount > 2 && this.word.ecount <= 5) {
				index = 2
			} else {
				index = 3
			}
			this.mainStyle.backgroundColor = colors[index]
		}
	}
</script>

<style>
	.card {
		width: 90%;
		border-radius: 0.5rem;
		background-color: #DD6161;
		padding: 8px;
		margin: 5px 0;
	}

	.word {
		width: 100%;
		text-align: center;
		font-weight: bold;
		font-size: x-large;
	}

	.mean {
		font-size: medium;
		padding: 2px 0;
	}

	.notes {}

	.date{
		width: 100%;
		text-align: right;
	}

	.count {
		width: 100%;
		text-align: center;
	}
</style>
