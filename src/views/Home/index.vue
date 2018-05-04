<template>
    <div class="home-container">
        <Loading v-show="loading" />
        <section class="banner-top">
            <img :src="data.documentList | selectDocument" alt="banner">
        </section>
        <section class="home-wrapper">
            <div class="info-box">
                <div class="user-info">
                    <div class="avatar" @click="handleShowAccount">
                        <img :src="data.portraitPic" alt="头像">
                    </div>
                    <div class="info">
                        <p class="amount">{{data.balance}}</p>
                        <p class="info-type">个人账户</p>
                    </div>
                </div>
                <div class="qrcode-info" @click="handleShowQRCode">
                    <img src="../../assets/images/fkm_icon@2x.png" alt="收款码">
                    <p>付款码</p>
                </div>
            </div>
            <div class="amount-box">
                <p class="adv">选择转入金额</p>
                <div class="amount-list">
                    <div
                        v-for="(item, index) of data.rechargeList"
                        :key="index"
                        class="amount"
                        :class="{active: index == selectedIndex}"
                        @click="handleSelectAmount(index, item.id)"
                        >
                        <div class="amount-value" :ref="'AMOUNT' + index">{{item.payAmount}}</div>
                        <div class="amount-tips">{{item.gatheringText}}</div>
                    </div>
                </div>
            </div>
            <div class="transfer-box">
                <p class="adv">转入方式</p>
                <div class="transfer-main">
                    <img src="../../assets/images/weixinpay_icon@2x.png">
                    <div class="btn-box">
                        <button type="button" class="btn" @click="handleTransfer" v-waves>确认转入</button>
                    </div>
                </div>
            </div>
            <div class="banner-bottom">
                <div class="conversation-box">
                    <div class="conversation clearfix dialog-left dialog-3">
                        <img :src="data.portraitPic" alt="头像">
                        <p class="txt">链鱼多余的资产只能在这里使用吗？</p>
                    </div>
                    <div class="conversation clearfix dialog-right dialog-4">
                        <img :src="data.portraitPic" alt="头像">
                        <p class="txt">不不不，你还可以去享选商城使用哦。</p>
                    </div>
                </div>
                <div class="link-box">
                    <span class="more">享选商城 更多优惠</span>
                    <span class="circle">&gt;</span>
                </div>
                <div class="banner-box">
                    <img :src="data.documentList | selectDocument" alt="banner">
                </div>
            </div>
        </section>
        <section class="bottom-container">
            <div class="bottom-btn">
                <button type="button" class="btn">
                    <img src="../../assets/images/wddd_icon@2x.png">
                    <span><router-link :to="{ name: 'Order', params: { id: 123 }}">我的订单</router-link></span>
                </button>
            </div>
            <div class="bottom-btn">
                <button type="button" class="btn">
                    <img src="../../assets/images/zhgz_icon@2x.png">
                    <span>转换规则</span>
                </button>
            </div>
        </section>
    </div>
</template>
<script>
    import { requestWXIndex, requestRecharge, fetchRecharge } from '@/api'
    import { WeiXinLogin, getQueryString } from '@/utils/tool'
    import { Indicator, Toast } from 'mint-ui'
    import wx from 'weixin-js-sdk'
    import {
        setToken,
        getToken,
        getOpenId
    } from '@/utils/auth'

    import waves from "@/directive/waves"
    const requestCode = '0000'
    export default {
        name: 'Home',
        directives: {
            waves
        },
        data() {
            return {
                data: '',
                loading: true,
                selectedIndex: 0,
                rechargeConfig: 1
            }
        },
        created() {
            if (WeiXinLogin() && !getToken()) {
                const openid = WeiXinLogin()
                this.$router.push({name: 'Login', params: {openid: openid}})
            } else {
                if (getToken()) {
                    this.fetchMyIndex()
                }
            }
        },
        filters: {
            selectDocument(arr) {
                if(arr) {
                     return arr[0].documentContent
                }
                // console.log(arr)
            }
        },
        mounted() {
            this.wxConfig()
            // this.fetchMyIndex()
        },
        methods: {
            wxConfig(option) {
                let setting = {
                    debug:false,
                    jsApiList: ['chooseWXPay', 'getBrandWCPayRequest']
                }
                const config = {
                    ...setting,
                    ...option
                }
                wx.ready(()=>{
                  console.log('wx.ready');
                });
            },
            handleSelectAmount(index, rechargeConfigId) {
                this.selectedIndex = index
                this.rechargeConfig = rechargeConfigId
                console.log(this.rechargeConfig)
            },
            handleTransfer() {
                Indicator.open()
                const condition = {
                    // openid: getOpenId(),
                    openId: getOpenId(),
                    rechargeConfigId: this.rechargeConfig
                }
                requestRecharge(condition).then(res => {
                    // console.log(res.data.prepay_id)
                    if (res.code == requestCode) {
                        Toast({
                          message: '下单成功',
                          duration: 2000
                        })
                        Indicator.close();
                        const { data } = res
                        const config = {
                            appId: data.appId,
                            timeStamp: data.timeStamp, 
                            nonceStr: data.nonceStr, 
                            package:  'prepay_id=' + data.prepay_id, 
                            signType: data.signType, 
                            paySign: data.paySign, 
                        }
                        this.onBridgeReady(config)
                        // wx.chooseWXPay({
                        //     ...config,
                        //     // appId: data.appId,
                        //     // timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                        //     // nonceStr: data.nonceStr, // 支付签名随机串，不长于 32 位
                        //     // package:  'prepay_id=' + data.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                        //     // signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                        //     // paySign: data.paySign, // 支付签名
                        //     success: function (res) {
                        //         alert(res)
                        //     // 支付成功后的回调函数
                        //     },
                        //     fail: function(e) {
                        //         alert(e)
                        //         console.log(e)
                        //     }
                        // });
                    } else {
                        Toast({
                          message: '下单失败',
                          duration: 2000
                        })
                        Indicator.close();
                    }
                })
                // console.log(this.rechargeConfig)
            },
            onBridgeReady(config) {
                const self = this
                WeixinJSBridge.invoke(
                'getBrandWCPayRequest', config,
                function(res) {
                    // console.log(res)
                    if (res.err_msg == "get_brand_wcpay_request:ok") {
                        alert('ok')
                        Toast({
                          message: '支付成功',
                          duration: 2000
                        })
                        const state = {
                            status: 'success',
                            merchant: '链动支付',
                            amount: '100'
                        }
                        setTimeout(() => {
                            self.$router.push({name: 'Result', params: {state: state}})
                        }, 1500)
                    } else {
                        alert('fail')
                        Toast({
                          message: '支付失败',
                          duration: 2000
                        })
                        const state = {
                            status: 'fail',
                        }
                        setTimeout(() => {
                            self.$router.push({name: 'Result', params: {state: state}})
                        }, 1500)
                        // alert(res.err_msg)
                    }
                }
            );
            },
            handleShowQRCode() {
                this.$router.push({name: 'Pay', params: {id: 1234}})
            },
            handleShowAccount() {
                const { mobile } = this.data
                this.$router.push({name: 'User', params: {mobile: mobile}})
            },
            fetchMyIndex() {
                const startTime = Date.now() // 请求开始
                requestWXIndex().then(res => {
                    const endTime = Date.now() // 请求结束
                    if (res.code == requestCode) {
                        const { data } = res
                        this.data = data
                        if (endTime - startTime >= 1000) {
                            this.loading = false
                        } else {
                            setTimeout(() => {
                                this.loading = false
                            }, 1000)
                        }
                    } else if (res.code == '1001') {
                        const openid = WeiXinLogin()
                        this.$router.push({name: 'Login', params: {openid: openid}})
                    }
                })
            }
        }
    }
</script>
<style lang="scss">

    .home-container {
        width: 100%;
        height: 100%;
        position: relative;
        display: flex;
        flex-direction: column
    }
    .banner-top {
        width: 100%;
        height: 380px;
        // background: url(../../assets/images/bg01@2x.png) center center no-repeat;
        // background-size: 100% 100%;
        img {
            width: 100%;
            height: 100%;
            max-width: 100%;
            max-height: 100%;
        }
    }
    .home-wrapper {
        width: 100%;
        flex: 1;
        position: relative;
        box-sizing: border-box;
        .info-box {
            box-sizing: border-box;
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width:686px;
            height:200px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: transparent;
            .user-info {
                width:503px;
                height:200px; 
                display: flex;
                align-items: center;
                padding: 30px;
                background:rgba(255,255,255,1);
                box-shadow:2px 0px 8px rgba(44,42,45,0.2);
                .avatar {
                    img {
                        width: 120px;
                        height: 120px;
                    }
                }
                .info {
                    margin-left: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    .amount {
                        font-size:48px;
                    }
                    .info-type {
                        font-size:28px;
                        margin-top: 20px;
                    }
                    p {
                        font-family:PingFang-SC-Bold;
                        color:rgba(52,52,52,1);
                    }
                }
            }
            .qrcode-info {
                width:168px;
                height:200px; 
                padding: 30px;
                background:rgba(255,255,255,1);
                box-shadow:2px 0px 8px rgba(44,42,45,0.2);
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                img {
                    width: 79px;
                    height: 77px;
                }
                p {
                    margin-top: 22px;
                    font-size:28px;
                    font-family:PingFang-SC-Medium;
                    color:rgba(52,52,52,1);
                }
            }
        }
        .amount-box {
            width:686px;
            margin: 0 auto;
            margin-top: 130px;
            margin-bottom: 81px;
            background-color:rgba(255,255,255,1);
            .adv {
                width:100%;
                height:30px; 
                line-height:30px; 
                font-size:30px;
                font-family:PingFangSC-Medium;
                color:#343434;

            }
            .amount-list {
                display: flex;
                flex-wrap: wrap;
            }
            .amount {
                margin-top: 40px;
                width: 200px;
                height: 100px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: url(../../assets/images/quan_bg@2x.png) center center no-repeat;
                background-size: 100% 100%;
                &:not(:nth-child(3n)) { // 3 6 9 除最右侧边缘设置编剧
                    margin-right: 43px;
                }
                &.active {
                    background: url(../../assets/images/quan_bg_select@2x.png) center center no-repeat;
                    background-size: 100% 100%;
                }
            }
            .amount-value  {
                font-size:36px;
                font-family:PingFangSC-Medium;
                color:rgba(255,212,127,1);
            }
            .amount-tips {
                font-size:24px;
                font-family:PingFangSC-Regular;
                color:rgba(153,153,153,1);
            }
        }
    }
    .transfer-box {
        padding: 30px;
        padding-top: 0;
        .adv {
            margin-bottom: 40px;
            font-size:30px;
            font-family:PingFangSC-Medium;
            color:rgba(52,52,52,1);
        }
        .transfer-main {
            display: flex;
            align-items: center;
            justify-content: space-between;
            img {
                width: 260px;
                height: 80px;
            }
            .btn-box {
                width:338px;
                height:80px; 
                .btn {
                    box-sizing: border-box;
                    width: 100%;
                    height: 100%;
                    font-size:30px;
                    font-family:PingFangSC-Medium;
                    color:rgba(255,212,127,1);
                    line-height:0px;
                    background: linear-gradient(#05102B, #0A2148); 
                }
            }
        }
    }
    .banner-bottom {
        position: relative;
        width: 686px;
        height: 390px;
        margin: 0 auto;
        margin-top: 40px;
        // left: 50%;
        // transform: translateX(-50%);
        z-index: 0;
        .conversation-box {
            position: absolute;
            z-index: 1000;
        }
        .banner-box {
            width: 100%;
            height: 100%;
            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
            }
        }
    }
    .conversation {
        background-color: #FFFFFF;
        position: relative;
        text-align: center;
        img {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 92px;
            height: 92px;
            border-radius: 50%;
        }
        .txt {
            width: 100%;
            height: 64px; 
            line-height:64px;
            font-size:28px;
            font-family:PingFang-SC-Medium;
            color:rgba(52,52,52,1);
        }
    }
    .dialog-left {
        float: left;
        padding-left: 71px;
        padding-right: 25px;
        img {
            left: 0;
            transform: translate(-50%, -50%)
        }
    }
    .dialog-right {
        float: right;
        padding-left: 25px;
        padding-right: 46px;
        img {
            right: 0;
            transform: translate(50%,-50%)
        }
    }
    .dialog-3 {
        border-radius: 0 32px 32px 0;
        margin-top: 53px;
        margin-left: 70px;
    }
    .dialog-4 {
        border-radius: 32px 0 0 32px;
        margin-top: 73px;
        margin-right: 70px;
    }
    .bottom-container {
        height: 109px;
        display: flex;
        flex-wrap: nowrap;
        align-items: center;
        justify-content: center;
        .bottom-btn {
            width: 50%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .btn {
                box-sizing: border-box;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size:30px;
                font-family:PingFangSC-Medium;
                color:rgba(31,29,32,1);
                line-height:0px;
                background: transparent; 
            }
            img {
                width:24px;
                height:28px; 
            }
            span {
                margin-left: 13px;
            }
        }
    }
    .link-box {
        display: flex;
        align-items: center;
        position: absolute;
        left: 50%;
        bottom: 33px;
        transform: translateX(-50%);
        .more,
        .circle {
            font-size:24px;
            font-family:PingFang-SC-Medium;
            color:rgba(255,212,127,1);
        }
        .circle {
            width: 24px;
            height: 24px;
            margin-left: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid rgba(255,212,127,1);
            border-radius: 100%;
        }
    }
</style>