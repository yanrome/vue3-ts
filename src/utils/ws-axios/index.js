import { WsAxios } from './WsAxios'

/**
 * @description 主要用于客服一问一答
 * @type {WsAxios}
 */
const wsAxios = new WsAxios({
  url: process.env.VUE_APP_WEBSOCKET_API,
  time: 60000,
  ping: () => ({
    source: 'h5',
    userid: sessionStorage.getItem('yzkf_userid'),
    ts: new Date().getTime(),
    data: { upcmd: 'ping' },
  }),
})
// websocket请求拦截
wsAxios.intercepts.request((params) => {
  console.log(params, '请求拦截：params')
  return params
})
// websocket响应拦截
wsAxios.intercepts.response((response) => {
  console.log('响应拦截：', response)
  return response
})

export default wsAxios
