<template>
	<view class="content">
		<u-form :model="user">
			<u-form-item label="昵称">
				<u-input v-model="user.name" />
			</u-form-item>
			<u-form-item label="密码">
				<u-input v-model="user.password" />
			</u-form-item>
		</u-form>
		<u-button @click="login" type="success" style="width: 180px;margin-top: 10px;">登录</u-button>
	</view>
</template>

<script>
	import userApi from '../../api/userApi.js'

	export default {
		data() {
			return {
				user: {
					name: "",
					password: ""
				}
			}
		},
		methods: {
			// 执行登录操作
			login() {
				userApi.login(this.user);
			}
		}
	}
</script>

<style scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 40rpx;
	}
</style>
