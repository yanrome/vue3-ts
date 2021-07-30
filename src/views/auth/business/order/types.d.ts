/**
 *  @types   send-coupons  | '发送优惠券' |
 *  @types   'room-rate-discount' | '房费优惠' |
 *  @types    'check-out' |  '退房'
 *  @types    'check-in' |  '办理入住'
 *  @types   'exchange'  | 换房
 *  @types    'resend-password' | 重发密码
 *  @types     ‘resend-code’   | 重发短信
 *  @types     'cancel'    |  取消
 * */
/**
 * @types  author   |   能够显示的权限status
 * @types  table    |   有table  则可以在table 上展示
 * @types  fun      |   按钮是否显示的fun
 * */


export declare interface buttonType extends Types {
    title:string,
    type?:string
    name: 'send-coupons' | 'room-rate-discount' | 'check-out' | 'check-in' | 'exchange' | 'resend-password' | 'resend-code' | 'cancel',
    author?:string,
    table?:string,
    fun:(order:any)=>any,
    callBackFun?:(order:any)=>any
}
