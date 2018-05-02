<template>
    <div class="pay-container">
        <Loading v-show="loading" />
        <header class="header">
            <h2>我的资产： {{amount}}</h2>
        </header>
        <div class="qrcode-container">
            <div class="bar-code">
                <img ref="jsbarcode">
            </div>
            <div class="qr-code" ref="qrcode"></div>
            <div class="tips">
                <p>二维码每分钟刷新一次</p>
            </div>
            <div class="bar-status">
                <p>{{status}}</p>
            </div>
            <div class="btn-container">
                <button type="button" class="btn" @click="handlePay" v-waves>确认支付</button>
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
    import { requestCodeMsg, requestPaymentCode } from '@/api'
    export default {
        name: 'Pay',
        directives: {
            waves
        },
        data() {
            return {
                loading: true,
                popupVisible: false,
                amount: 2000,
                password: '',
                checkPass: false,
                status: '待商家扫码收款...'
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
        methods: {
            handlePay() {
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
                    password: md5(this.password)
                }
                console.log(condition)
            },
            fetchCodeMsg() {
                requestCodeMsg().then(res => {
                    if (res.code == '0000') {
                        const { codemsg: paymentCode } = res.data
                        console.log(paymentCode)
                        const condition = {
                            paymentCode
                        }
                        this.qrcode(paymentCode)
                        this.jsbarcode(paymentCode)
                        // this.fetchPaymentCode(condition)
                    }
                })
            },
            qrcode(text) {  
              let qrcode = new QRCode(this.$refs.qrcode, {  
                width: 356,  
                height: 356, // 高度  
                text: text, // 二维码内容  
                render: 'canvas' // 设置渲染方式（有两种方式 table和canvas，默认是canvas）  
                // background: '#f0f'  
                // foreground: '#ff0'  
              })  
            },
            jsbarcode(text) {
                let jsbarcode = new JsBarcode(this.$refs.jsbarcode, text, {
                      // lineColor: "#0aa",
                      textPosition: "top",
                      fontSize: 28,
                      textAlign: 'justify',
                      marginTop: 30,
                      textMargin: 12,
                      marginBottom: 30,
                })
                .blank(30)
                // let jsbarcode = new JsBarcode(this.$refs.jsbarcode)
                // .EAN5(text, { textPosition: "top", fontSize: 16, marginTop: 15})
            },
            fetchPaymentCode(condition) {
                requestPaymentCode(condition).then(res => {
                    console.log(res)
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
            width: 701px;
            height: 1052px;
            margin: 0 auto;
            margin-top: 21px;
            background: url(../../assets/images/qrcode_bg@2x.png) center center no-repeat;
            background-size: 100% 100%;
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
            // background: linear-gradient(#05102B, #0A2148); 
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
            // background: linear-gradient(#05102B, #0A2148); 
        }
        .tips,
        .bar-status {
            width: 100%;
            margin: 0 auto;
            text-align: center;
            font-size:28px;
            font-family:PingFangSC-Regular;
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