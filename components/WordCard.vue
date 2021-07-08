<template>
	<view class="card" :style="mainStyle">

		<view class="header">
			<view></view>
			<view class="word" @click="jump()" v-html="targetContent"></view>
			<view  @click="playAudio()">
				<u-image width="50rpx" height="50rpx" mode="aspectFit"
					src="/static/voice.png">
				</u-image>
			</view>
		</view>

		<text class="mean">{{word.mean}}</text>
		<view class="notes" v-if="word.notes">备注信息:{{word.notes}}</view>
		<u-image width="100%" height="300rpx" v-if="word.image" :src="word.image"></u-image>
		<view class="date">{{word.gmtCreate | date("mm-dd hh:ss")}}</view>
		<view class="count">答题次数:{{word.count}},错题次数:{{word.ecount}}</view>
		<!-- 音频播放audio -->
		<audio ref="audio" src="http://dict.youdao.com/dictvoice?audio=explore">
			<!--              <source :src="scope.row.voicePath" type="audio/mpeg">-->
			您的浏览器不支持 audio 元素。
		</audio>

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
			//目标内容,即给需要高亮的文本加上了对应的html标签后的文本内容
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
				location.href = "https://m.youdao.com/dict?le=eng&q=" + this.word.word
			},
			// 音频播放
			playAudio() {
				const innerAudioContext = uni.createInnerAudioContext();
				innerAudioContext.autoplay = true;
				innerAudioContext.src = this.word.voicePath;
				innerAudioContext.onPlay(() => {
					// console.log('开始播放');
				});
			}
		},
		created() {
			// 根据不同的错误记录数设置不同的背景颜色
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
		padding: 8px;
		margin: 5px 0;
	}
	
	.header{
		width: 100%;
		display: flex;
		justify-content: space-between;
	}

	.word {
		font-weight: bold;
		font-size: x-large;
	}

	.mean {
		font-size: medium;
		padding: 2px 0;
	}

	.date {
		width: 100%;
		text-align: right;
	}

	.count {
		width: 100%;
		text-align: center;
	}

</style>
