<template>
	<view>
		<view class="header">
			<u-search placeholder="请输入英文单词" v-model="query.word" @search="search"></u-search>
		</view>

		<view class="sort">
			<view @click="serviceSort({order:'ascending',prop:'count'})">答题次数</view>
			<view @click="serviceSort({order:'ascending',prop:'ecount'})">错误次数</view>
			<view @click="serviceSort({order:'ascending',prop:'gmtCreate'})">创建日期</view>
		</view>

		<view class="content">
			<word-card v-for="item in records" :word="item" :highContent="query.word"></word-card>
		</view>
		<u-loadmore style="margin-bottom: 50px;" :status="status" :load-text="loadText" @loadmore="listLoadmore" />

		<u-back-top :scroll-top="4000" icon="arrow-up" tips="返回"></u-back-top>

	</view>
</template>

<script>
	import wordApi from '../../api/wordApi.js'
	import WordCard from '@/components/WordCard.vue'

	export default {
		components: {
			WordCard: WordCard
		},
		data() {
			return {
				// 上拉加载列表的相关选项
				status: 'loadmore', //  其他状态:   loading / nomore
				loadText: {
					loadmore: '点击加载更多',
					loading: '努力加载中',
					nomore: '实在没有了'
				},
				current: 1,
				size: 20,
				records: [{
					"count": 0,
					"deleted": 0,
					"ecount": 0,
					"gmtCreate": "",
					"gmtModified": "",
					"id": "",
					"mean": "",
					"version": 0,
					"voicePath": "",
					"word": "",
					"wordTypeId": ""
				}],
				// 单词列表的条件查询封装类
				query: {
					"countSort": undefined,
					// 默认以这个日期的降序排序
					"dateSort": false,
					"endDate": "",
					"errorCountSort": undefined,
					"mean": "",
					"notes": "",
					"startDate": "",
					"word": "",
					"wordTypeId": ""
				},
				// 是否正在向后端请求数据中
				loading: false,
				// 判断是否已经加载到了最后一页了
				isEnd: false,
				// 提示用户 "没有更多数据了",这段话的展示,加个锁
				// 这个只是用来保存上一次加载的时间戳,然后以用时间戳之间的距离的方式来加锁
				loadLock: 0,
				// 最近查询的一个分页对象
				page: {},
			}
		},
		onLoad(option) {
			if (option.typeId) {
				console.log("接收到的参数id为:" + option.typeId)

				// 进行数据的初始化加载
				this.query.wordTypeId = option.typeId

				this.records = []
				this.getData()
			}
		},
		methods: {
			// 依据相关的条件 加载获取这个单词本的单词信息
			getData() {
				if (this.isEnd && this.current > 1) {
					// 如果已经加载到了最后一页,则不继续向下加载了
					// 之所以要判断current>1 是为了防止条件搜索失效

					// 加个3s中的锁,防止疯狂弹出
					if (new Date().getTime() - this.loadLock > 3000) {
						this.$message("没有更多数据了!")
						this.loadLock = new Date().getTime()
					}
					return
				}
				this.loading = true
				wordApi.list(this.query, this.current, this.size).then(res => {
					//将查询结果push进去
					this.records.push(...res.data.records)

					// 以此判断是否已经到了最后一页
					this.isEnd = res.data.current >= res.data.pages

					this.page = res.data

					this.loading = false
				})
			},
			// 向后端服务器查询符合条件的数据集合
			search() {
				this.records = []
				// 将当前页面重置回到第一页
				this.current = 1
				this.getData()
			},
			// 加载更多组件  执行加载下一页数据的方法
			listLoadmore() {
				// 将页数进行+1 然后请求下一页的数据
				this.current++
				this.getData()
			},
			// 当点击了table中的排序字段后,调用该方法,进行一个后端服务器的排序调用
			// 被问我为什么要取obj这么个名字,要问就问element-ui的官方人员
			serviceSort(obj) {
				// 对这三个参数进行后端请求排序

				// 将el-table中的排序字符转化为后端所识别的排序字符
				let sortSymbol = obj.order ? obj.order === 'ascending' : undefined

				console.log("排列顺序为:" + sortSymbol)

				// 为了增加用户的一个体验,排序时只允许同时一个参数进行排序 这里就先进行所有排序参数的清空
				this.query.countSort = undefined
				this.query.errorCountSort = undefined
				this.query.dateSort = undefined

				console.log("进行排序的参数为:"+obj.prop)

				// 对这三个参数进行数据处理
				switch (obj.prop) {
					case 'count':
						this.query.countSort = sortSymbol
						break
					case 'gmtCreate':
						this.query.dateSort = sortSymbol
						break
					case 'ecount':
						this.query.errorCountSort = sortSymbol
						break
				}
				this.search()
			}
		},
		//自动加载下一页数据
		onReachBottom() {
			this.listLoadmore()
		}
	}
</script>

<style>
	.content {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.sort {
		width: 100%;
		display: flex;
		justify-content: space-around;
		margin: 2px 0;
	}
</style>
