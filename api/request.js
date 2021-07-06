import Request from '../js_sdk/luch-request/luch-request/index.js'
// 服务器后端的一个接口地址
const BASE_API = "http://online.respondent.top:9001/respondent2"
// 本地后端接口的一个地址
// const BASE_API = "http://localhost:8081"


// 创建一个统一的请求实例对象
const http = new Request({
	baseURL: BASE_API, //设置请求的base url
	timeout: 5000, //超时时长 
})

//请求拦截器
http.interceptors.request.use((config) => {
	const token = uni.getStorageSync('token');
	// 如果说本地存放有token数据的话,则携带token进行一个请求操作
	if (token) {
		// 请求头增加token参数
		config.header = {
			token: token
		}
	}

	//如果为post请求,则将请求参数json话
	if (config.method === 'POST') {
		config.data = JSON.stringify(config.data);
	}
	return config
}, error => {
	return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response) => {
	const data = response.data

	//如果响应返回的状态码不等于200,则将错误参数信息进行反馈出去
	if (data.code !== 200) {
		// 统一将错误信息反馈给用户
		uni.showToast({
			title: data.msg,
			icon: "none",
			duration: 1500
		});
		// 调用这个错误的方法 让页面接口调用可以感知到
		return Promise.reject('error')
	}

	// 将响应体的内容进行返回
	return data
}, (error) => {
	//未登录时清空缓存跳转
	if (error.statusCode == 500 || error.statusCode == 450) {
		uni.clearStorageSync();
		uni.switchTab({
			url: "/pages/index/index"
		})
	}
	return Promise.resolve(error)
})
// 将这个请求对象进行导出去
export default http;
