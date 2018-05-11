<template>
    <div class="pay-container">
        <Loading v-show="loading" />
        <header class="header">
            <h2>我的资产： {{$route.params.balance}}</h2>
        </header>
        <div class="qrcode-container">
            <!-- <Refresh v-show="refresh" /> -->
            <div class="qrcode-wrapper">
                <Shadow v-show="codeSatus == 'invalid' " />
                <div class="bar-code">
                    <img ref="jsbarcode">
                </div>
                <div class="qr-code" ref="qrcode" id="qrcode"></div>
            </div>
            <div class="tips">
                <p>二维码每分钟刷新一次</p>
            </div>
            <div class="bar-status">
                <div class="un-valid" v-if="codeSatus == 'await' ">
                    <p class="item-status">{{status}}</p>
                </div>
                <div class="has-valid" v-else-if=" codeSatus == 'scan' ">
                    <p class="item-merchant">{{merchantName}}</p>
                    <p class="item-amount"><span>付款：</span>{{amount}}</p>
                </div>
            </div>
            <div class="btn-container">
                <button type="button" class="btn" @click="handlePay" v-waves :class="{active: scaned}" :disabled="!scaned">确认支付</button>
            </div>
        </div>
        <mt-popup
            v-model="popupVisible"
            position="bottom"
            style="width: 100%;"
        >
            <section class="keyboard-container">
            <div class="pawword-box">
                <label for="password">
                    <ul id="list">
                        <li v-for="num of 6"></li>
                    </ul>
                </label>
                <input type="password" ref="password" v-model="password" maxlength="6" readonly />
            </div>
            <div class="keyboard-main">
                <span v-for="num of 9"
                            class="num"
                            @click="handleSelectNum(num)"
                >{{num}}</span>
                <span class="num" @click="handleSelectNum('.')">.</span>
                <span class="num" @click="handleSelectNum(0)">0</span>
                <span class="key clear" @click="handleRollback">删除</span>
            </div>
        </section>
        </mt-popup>
    </div>
</template>
<script>
    import md5 from 'js-md5'
    import { Indicator, Popup, Toast } from 'mint-ui'
    import waves from "@/directive/waves"
    import QRCode from 'qrcodejs2' 
    import JsBarcode from 'jsbarcode'
    import { requestCodeMsg, requestPaymentCode, requestCpay } from '@/api'
    import {
        getOpenId
    } from '@/utils/auth'
    import Shadow from '@/components/Shadow'
    import Refresh from '@/components/Refresh'
    const requestCode = '0000'
    export default {
        name: 'Pay',
        directives: {
            waves
        },
        components: {
            Shadow,
            Refresh
        },
        data() {
            return {
                lockPass: false,
                scaned: false,
                refresh: false,
                codeSatus: 'await',
                loading: true,
                popupVisible: false,
                amount: 0,
                pmuOrderNo: '',
                merchantName: '',
                password: '',
                checkPass: false,
                status: '待商家扫二维码收款',
                paymentCode:'',
                lock: true,
            }
        },
        watch: {
            password: function(newPass, oldPass) {
                if (newPass.length == 6) {
                    this.lockPass = true
                    // 发起请求
                    setTimeout(() => {
                        this.handleSubmitPay()
                    }, 600)
                } else {
                    this.lockPass = false
                }
                const pass = this.password
                const len = 6
                const list = document.getElementById('list').getElementsByTagName('li');
                for (let i = 0; i < len; i++) {
                    if (pass[i]) {
                        list[i].innerHTML = '*'
                    } else {
                        list[i].innerHTML = ''
                    }
                }
            }
        },
        created() {
            this.fetchCodeMsg()
            this.fetchPaymentCode()
            setTimeout(() => {
                this.loading = false
            }, 800)
        },
        mounted() {
            this.$nextTick(function () {
                setInterval(this.handleCodeMsgPoll, 1000 * 2)
                this.lock && setInterval(this.handlePoll, 1000 * 60)
            })
        },
        methods: {
            handleCodeMsgPoll() {
                this.fetchPaymentCode()
            },
            /**
             * 轮询刷新二维码
             */
            handlePoll() {
                try {
                    this.refresh = true
                    const qrDOM = document.getElementById('qrcode')
                    if (qrDOM) {
                        qrDOM.innerHTML  = ''
                        this.fetchCodeMsg()
                        this.refresh = false
                    } else {
                        setTimeout(() => {
                            this.fetchCodeMsg()
                            this.refresh = false
                        }, 1000)
                    }
                } catch (e) {
                    console.log(e)
                }                
            },
            handlePay() {
                this.scaned = false
                setTimeout(() => {
                    this.popupVisible = true
                }, 300)
            },
            handleSelectNum(num) {
                if (!this.lockPass) {
                    this.password += ""+num
                } else {
                    return;
                }
            },
            handleRollback() {
                if (this.password.length >= 1) {
                    this.password = this.password.substring(0, this.password.length - 1)
                }
            },
            handleSubmitPay() {
                Indicator.open({
                  text: '正在支付...',
                  spinnerType: 'fading-circle'
                })
                const startTime = Date.now() // 请求开始
                const condition = {
                    ps : md5.hex(this.password).toUpperCase(),
                    pmuOrderNo: this.pmuOrderNo
                }
                requestCpay(condition).then(res => {
                    const endTime = Date.now()
                    if (res.code == requestCode) {
                        Toast({
                          message: '支付成功',
                          duration: 1000
                        })
                        const state = {
                                status: 'success',
                                merchant: this.merchantName,
                                amount: this.amount
                        }
                        const requestTime = endTime - startTime
                        if (requestTime <= 300) {
                            setTimeout(() => {
                            Indicator.close()
                            this.popupVisible = false
                            this.password = ''
                            this.$router.push({name: 'Result', params: {state: state}})
                            }, 300 - requestTime)
                          } else {
                              Indicator.close()
                              this.popupVisible = false
                              this.password = ''
                              this.$router.push({name: 'Result', params: {state: state}})
                          }
                    } else {
                        Toast({
                          message: res.msg,
                          duration: 1000
                        })
                        setTimeout(() => {
                            Indicator.close()
                            this.popupVisible = false
                            this.password = ''
                            this.scaned = true
                        }, 300)
                    }
                }).catch(e => {
                    setTimeout(() => {
                        Indicator.close()
                            this.popupVisible = false
                            this.password = ''
                        }, 300)
                })
            },
            fetchCodeMsg() {
                requestCodeMsg().then(res => {
                    if (res.code == requestCode) {
                        const { codemsg: paymentCode } = res.data
                        this.paymentCode = paymentCode
                        const condition = {
                            paymentCode
                        }
                        this.qrcode(paymentCode)
                        this.jsbarcode(paymentCode)
                    }
                })
            },
            qrcode(text) {
              let qrcode = new QRCode(this.$refs.qrcode, {  
                width: 356,  
                height: 356, // 高度  
                text: text, // 二维码内容  
                render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
              })  
            },
            jsbarcode(text) {
                let jsbarcode = new JsBarcode(this.$refs.jsbarcode, text, {
                      textPosition: "top",
                      fontSize: 28,
                      textAlign: 'center',
                      textMargin: 10
                })
                .blank(30)
            },
            fetchPaymentCode() {
                const condition = {
                        paymentCode: this.paymentCode
                }
                requestPaymentCode(condition).then(res => {
                    const {code } = res
                    switch(code) {
                        case '1600':
                            this.codeSatus = 'await'
                            this.scaned = false
                            // this.status = res.msg
                            break;
                        case '1608':
                            this.codeSatus = 'invalid'
                            this.scaned = false
                            // this.status = res.msg
                            break;
                        case '0000':
                            const { data } = res
                            this.codeSatus = 'scan'
                            this.scaned = true
                            this.lock = false
                            this.amount = data.amount
                            this.pmuOrderNo = data.pmuOrderNo
                            this.merchantName = data.merchantName
                            break;
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scaned>
    .mint-toast {
        z-index: 3000 !important
    }
    .mint-indicator-wrapper {
            top: 20% !important;
    }
    .pay-container {
        position: relative;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        display: flex;
        color:rgba(255,255,255,1);
        flex-direction: column;
        overflow-y: auto;
        padding-bottom: 60px;
        background: linear-gradient(#05102B, #0A2148); 
        .header {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            margin-top: 57px;
            h2 {
                font-size:30px;
                font-family:PingFangSC-Regular;
                color:rgba(255,255,255,1);
            }
        }
        .qrcode-container {
            position: relative;
            width: 701px;
            height: 100%;
            margin: 0 auto;
            margin-top: 21px;
            padding-bottom: 50px;
            background:rgba(255,255,255,1);
            box-shadow:2px 0px 8px rgba(44,42,45,0.2);
            .qrcode-wrapper {
                width: 100%;
                position: relative;
            }
        }
        .bar-code {
            width:520px;
            height:234px;
            margin: 43px auto 34px auto;
            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
            }
            canvas {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
            }
        }
        .qr-code {
            width:356px;
            height:355px;
            margin: 0 auto;
            img {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
            }
            canvas {
                width: 100%;
                height: 100%;
                max-width: 100%;
                max-height: 100%;
            }
        }
        .tips,
        .bar-status {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            font-size:28px;
            font-family:PingFangSC-Regular;
            .item-status {
                color:rgba(52,52,52,1);
                line-height:51px;
            }
            .item-merchan {
                color:rgba(52,52,52,1);
                line-height:51px;
            }
            .item-amount {
                color:rgba(52,52,52,1);
                line-height:51px;
                span {
                    color:rgba(153,153,153,1);
                }
            }
        }
        .tips {
            margin-top: 50px;
            margin-bottom: 60px;
            color:rgba(153,153,153,1);
        }
        .bar-status {
            color:rgba(52,52,52,1);
        }
        .btn-container {
            width: 100%;
            margin: 0 auto;
            margin-top: 80px;
            text-align: center;
            .btn {
                width:620px;
                height:80px; 
                font-size:30px;
                font-family:PingFangSC-Medium;
                color:rgba(255,255,255,1);
                background:rgba(170,176,178,1);
            }
            .btn.active {
                    background: linear-gradient(#05102B, #0A2148); /* 标准的语法 */
            }
        }
    }
    .keyboard-main {
        width: 100%;
        display: flex;
        box-sizing: border-box;
        justify-content: space-between;
        flex-wrap: wrap;
        background-color: #ffffff
    }
    .keyboard-main .num,
    .keyboard-main .key {
        box-sizing: border-box;
        width:250px;
        height:150px; 
        font-size:72px;
        font-family:PingFangSC-Regular;
        color:rgba(102,102,128,1);
        border-top: 2px solid #dedede;
        border-right: 2px solid #dedede;
        display: flex;
        cursor: pointer;
        justify-content: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 1)
    }
    .keyboard-main .clear {
        font-size:48px;
        color:rgba(102,102,128,1);
    }
    .pass-box {
        width:100%;
        height:180px; 
        display: flex;
        justify-content: center;
        align-items: center;
        input {
            width:80%;
            height: 100%; 
            line-height: 100%; 
            font-size: 54px;
            font-family:PingFangSC-Regular;
            color:rgba(102,102,128,1);
            line-height:51px;
            text-align: center
        }
    }
    .pawword-box {
        margin: 20px;
        padding: 20px;
        background: #fff;
        text-align: center;

         input {
            margin: 0;
            padding: 0;
            width: 1px;
            opacity: 0;
            height: 1px;
            border: none;
        }

        label {
            display: block;
        }

        ul {
            border: 2px solid #c8c8c8;
            font-size: 0;
            display: inline-block;
            position: relative;
            font-size: 0;
        }

        ul li {
            display: inline-block;
            width: 80px;
            height: 80px;
            font-size: 48px;
            color: #000000;
            font-weight: 700;
            text-align: center;
            line-height: 80px;
            border-left: 2px solid #e6e6e6;
            vertical-align: middle;
            overflow: hidden;
        }

        ul li:first-child {
            border-left: none;
        }
    }
</style>