import request from '@/api/request.js'

const BASE_URL = "/word";

export default {
	add(word) {
		return request.post(BASE_URL, word)
	},
	// 查询符合条件的单词列表信息
	list(query, current, size) {
		return request.post(`${BASE_URL}/list/${current}/${size}`, query)
	}
}
