import http from "@/api/request.js"
import auth from '@/api/auth.js'

const BASE_URL = "/competition/user"

export default {
	// 用户登录   修改为同步的一种方式
	login(user) {
		// 这样的一个返回形式的话,如果说界面调用的地方,还需要处理一个错误的方式的话,后面可以使用.catch() 进行处理错误代码
		return http.post(`${BASE_URL}/login`, user).then(response => {
			console.log(response.data)
			// 将成功登录后的token信息进行一个保存
			auth.setToken(response.data)
			uni.showToast({
				icon:"none",
				duration:1000,
				title: "登录成功!"
			});
			// 登录成功后,获取用户的一个基本信息
			/* this.getUserInfo().then(response => {
				auth.setUserInfo(response.data)
			}) */
		})
	},
	// 退出登录
	logout() {
		// 如果存放有用户信息的话,则去除相关的用户信息
		// auth.removeUserInfo();
		auth.removeToken();
	}
}
