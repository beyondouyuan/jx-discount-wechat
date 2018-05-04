<template>
    <div class="pay-container">
        <Loading v-show="loading" />
        <header class="header">
            <h2>我的资产： {{amount}}</h2>
        </header>
        <div class="qrcode-container">
            <Refresh v-show="refresh" />
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
                <div class="pass-box">
                    <input type="password" autofocus="autofocus" maxlength="6" v-model="password"  />
                </div>
                <div class="keyboard-main" id="keyboard-main">
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
    import { Popup, Toast } from 'mint-ui'
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
                scaned: false,
                refresh: false,
                codeSatus: 'await',
                loading: true,
                popupVisible: false,
                amount: 2000,
                pmuOrderNo: '',
                merchantName: '',
                password: '',
                checkPass: false,
                status: ''
            }
        },
        watch: {
            password: function(newPass, oldPass) {
                if (newPass.length >= 6) {
                    this.checkPass = true
                    setTimeout(() => {
                        this.handleSubmitPay()
                    }, 500)
                } else {
                    this.checkPass = false
                }
            }
        },
        created() {
            setTimeout(() => {
                this.loading = false
            }, 3000)
            this.fetchCodeMsg()
        },
        mounted() {
            this.$nextTick(function () {
                setInterval(this.handlePoll, 1000 * 10);
            })
        },
        methods: {
            /**
             * 轮询刷新二维码
             */
            handlePoll() {
                this.refresh = true
                const qrDOM = document.getElementById('qrcode')
                if (qrDOM && qrDOM.childNodes.length > 0) {
                    qrDOM.childNodes[1].remove()
                    qrDOM.childNodes[0].remove()
                    setTimeout(() => {
                        this.fetchCodeMsg()
                    }, 1000)
                    setTimeout(() => {
                        this.refresh = false
                    }, 1500)
                } else {
                    this.fetchCodeMsg()
                    setTimeout(() => {
                        this.refresh = false
                    }, 1500)
                }
            },
            handlePay() {
                this.scaned = false
                setTimeout(() => {
                    this.popupVisible = true
                }, 600)
            },
            handleSelectNum(num) {
                if (!this.checkPass) {
                    this.password += ""+num
                }
            },
            handleRollback() {
                if (this.password.length >= 1) {
                    this.password = this.password.substring(0, this.password.length - 1)
                }
            },
            handleSubmitPay() {
                const condition = {
                    password: md5(this.password),
                    pmuOrderNo: this.pmuOrderNo
                }
                requestCpay(condition).then(res => {
                    if (res.code == requestCode) {
                        Toast({
                          message: '支付成功',
                          duration: 2000
                        })
                    } else {
                        Toast({
                          message: '支付失败',
                          duration: 2000
                        })
                    }
                })
            },
            fetchCodeMsg() {
                requestCodeMsg().then(res => {
                    if (res.code == requestCode) {
                        const { codemsg: paymentCode } = res.data
                        const condition = {
                            paymentCode
                        }
                        this.qrcode(paymentCode)
                        this.jsbarcode(paymentCode)
                        this.fetchPaymentCode(condition)
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
                      textAlign: 'justify',
                      marginTop: 30,
                      textMargin: 12,
                      marginBottom: 30,
                })
                .blank(30)
            },
            fetchPaymentCode(condition) {
                requestPaymentCode(condition).then(res => {
                    const {code } = res
                    switch(code) {
                        case '1600':
                            this.codeSatus = 'await'
                            this.status = res.msg
                            break;
                        case '1608':
                            this.codeSatus = 'invalid'
                            this.status = res.msg
                            break;
                        case '0000':
                            const { data } = res
                            this.codeSatus = 'scan'
                            this.scaned = true
                            this.amount = data.amount
                            this.pmuOrderNo = data.pmuOrderNo
                            this.merchantName = data.amount
                            break;
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .mint-toast {
        z-index: 3000 !important
    }
    .pay-container {
        position: relative;
        width: 100%;
        min-height: 100vh;
        height: 100%;
        display: flex;
        color:rgba(255,255,255,1);
        flex-direction: column;
        background: linear-gradient(#05102B, #0A2148); 
        .header {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            margin-top: 57px;
            // margin-top: 119px;
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
            background: url(../../assets/images/qrcode_bg@2x.png) center center no-repeat;
            background-size: 100% 100%;
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
        border-top: 1px solid #dedede;
        border-right: 1px solid #dedede;
        display: flex;
        justify-content: center;
        align-items: center;
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
            width:332px;
            height:45px; 
            font-size:60px;
            font-family:PingFangSC-Regular;
            color:rgba(102,102,128,1);
            line-height:51px;
            text-align: center
        }
    }
</style>