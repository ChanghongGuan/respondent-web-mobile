<template>
	<view class="content">
		<u-form :model="user" ref="uForm">
			<u-form-item label="姓名">
				<u-input v-model="user.name" />
			</u-form-item>
			<u-form-item label="密码">
				<u-input v-model="user.password" />
			</u-form-item>
		</u-form>

		<u-button @click="login" type="success">登录</u-button>
	</view>
</template>

<script>
	import userApi from '../../api/userApi.js'

	export default {
		data() {
			return {
				title: 'Hello',
				user: {
					name: "testUser",
					password: "1"
				}
			}
		},
		onLoad() {
		},
		methods: {
			// 执行登录操作
			login() {
				userApi.login(this.user);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 100rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 28rpx;
		color: $u-content-color;
	}

	.button-demo {
		margin-top: 80rpx;
	}

	.link-demo {
		margin-top: 80rpx;
	}
</style>
