import Request from '../plugins/request/js/index';

export default {
    // 获取token
    getToken(code,requestParams) {
        let r = Request(); //初始化请求
		// 获取Promise对象返回给调用者.
		let instance = r.request({
			servicecode: code,
			data: {
				requestParams
			},
			method: 'post',
		});
		
		// 超时 6s 就中断请求
		setTimeout(() => {
			r.abort(instance);
		}, 10000);
		
		return instance;
    },
};