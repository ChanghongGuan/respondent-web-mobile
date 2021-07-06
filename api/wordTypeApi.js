import request from '@/api/request.js'

const BASE_URL = "/type";

export default {
	// 获取某个单词的vo类信息
	getVoById(id) {
		return request.get(`${BASE_URL}/${id}`, {})
	},
	// 获取当前登录用户的所有单词本列表
	listAll() {
		return request.get(`${BASE_URL}/list`, {})
	}
}
