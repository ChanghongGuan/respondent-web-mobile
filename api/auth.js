// 保存一些用户相关的全局字段
const userInfo = 'userInfo'
const token = 'token'

export default {

	// 设置token
	setToken(tokenInfo) {
		uni.setStorageSync(token, tokenInfo)
	},
	// 获取token信息
	getToken() {
		return uni.getStorageSync(token)
	},
	// 删除token信息
	removeToken() {
		uni.removeStorageSync(token)
	},
	// 设置用户的基本信息
	setUserInfo(userInfovo) {
		uni.setStorageSync(userInfo, userInfovo)
	},
	// 删除用户的一个基本信息
	removeUserInfo() {
		uni.removeStorageSync(userInfo)
	},
	// 获取用户的基本信息
	getUserInfo() {
		// 如果没有token信息了,则将本地存放的用户信息进行删除,然后返回null
		if (this.getToken()) {
			return uni.getStorageSync(userInfo)
		} else {
			this.removeUserInfo()
			return null
		}
	}
}
