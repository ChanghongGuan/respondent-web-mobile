import auth from '@/api/auth.js'
import request from '@/api/request'
import md5 from '@/js_sdk/js-md5/build/md5.min.js'

const BASE_URL = "/user";

export default {
	login(user) {
		// 对用户的密码进行加密
		user.password = md5(user.password)
		return request.post(`${BASE_URL}`, user).then(res => {
			// 如果登录成功,返回的这个信息不为null,则将登录的用户信息保存进cookie中
			if (res.data) {
				uni.showToast({
					title: "登录成功!"
				});
				auth.setToken(res.data)
				// 将已经登录的userInfo信息保存进cookie中
				this.getInfo().then(response => {
					auth.setUserInfo(response.data)
				})
				uni.navigateTo({
					url:'/pages/type/type'
				})
			}
		})
	},
	getInfo() {
		return request.get(`${BASE_URL}/info`)
	}
}
