<template>
    <div class="user-container">
        <Loading v-show="loading" />
        <div class="user-wrapper">
            <div class="user-box">
                <div class="user-main">
                    <div class="label-item">
                        <input type="text" placeholder="请输入手机号" :value="$route.params.mobile | mdMobile" />
                    </div>
                    <div class="label-item auth-item">
                        <input type="text" v-model="verifyCode" placeholder="短信验证码"  />
                        <span class="auth-wrapper">
                            <button class="auth" :class="{active: smsCode}" v-waves :disabled="!smsCode" @click="handleSmsCode">{{authText}}</button>
                        </span>
                    </div>
                    <div class="label-item auth-item">
                        <input type="text" v-model="payPassword" placeholder="新的支付密码"  />
                    </div>
                    </div>
            </div>
            <div class="btn-box">
                <div class="btn-item">
                            <button type="button" v-waves class="btn" :class="{active: checkPass && checkValidate}" :disabled="!(checkPass && checkValidate)" @click="handleSubmitSetPass">提交</button>
                    </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestSetPayPassword,requestSmsCode } from '@/api'
    import { Toast, Indicator } from 'mint-ui'
    import { RegUtils } from '@/utils/regexp'
    import waves from "@/directive/waves"
    const requestCode = '0000'
    export default {
        name: 'User',
        directives: {
            waves
        },
        data() {
            return {
                authText: '获取验证码',
                payPassword: '',
                loading: false,
                verifyCode: '',
                checkPass: false,
                checkValidate: false,
                smsCode: false,
                isLogining: false // 防止重复提交
            }
        },
        watch: { // 监控以实现实时验证
            payPassword: function(newMobile, oldMobile) {
                if (!RegUtils.isPhone(newMobile)) {
                    this.checkPass = false
                } else {
                    this.checkPass = true
                    this.checkValidate = true
                    this.smsCode = true
                }
            },
            verifyCode: function(newVal, oldVal) {
                if (!RegUtils.isNumber(newVal)) {
                    this.smsCode = false
                } else {
                    this.smsCode = true
                }
            }
        },
        filters: {
            mdMobile(mobile) {
                const start = mobile.slice(0, 4)
                const end = mobile.slice(-2)
                return `${start}******${end}`
            }
        },
        methods: {
            countDown(second) {
                const oldText = '重新获取校验码'
                if (second >0 ) {
                    this.authText = `${second}秒后重新获取`
                    this.smsCode = false
                    second--
                    setTimeout(() => {
                        this.countDown(second)
                    }, 1000)
                } else {
                    this.smsCode = true
                    this.authText = oldText
                }
            },
            handleSmsCode() {
                this.smsCode = false
                const condition = {
                    mobile: this.$route.params.mobile
                }
                requestSmsCode(condition).then(res => {
                    if (res.code == requestCode) {
                        Toast({
                          message: '获取成功',
                          duration: 2000
                        })
                        this.countDown(60)
                    } else {
                        Toast({
                          message: '获取失败',
                          duration: 2000
                        })
                        this.smsCode = true
                    }
                })
            },
            handleSubmitSetPass() {
                this.loading = true // loading
                this.checkValidate = false // 防止重复提交
                const startTime = Date.now() // 请求开始
                const condition = {
                    mobile: this.$route.params.mobile,
                    validateCode: this.verifyCode,
                    payPassword: this.payPassword
                }
                requestSetPayPassword(condition).then(res => {
                    const endTime = Date.now()
                    if (res.code == requestCode) {
                        Toast({
                          message: '修改成功',
                          duration: 2000
                        })
                        if (endTime - startTime >= 1000) {
                            this.checkValidate = true
                            this.loading = false
                        } else {
                            setTimeout(() => {
                                this.checkValidate = true
                                this.loading = false
                                this.$router.push({name: 'Home'})
                            }, 2500)
                        }
                    } else {
                        this.loading = false
                        this.checkValidate = true
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .user-container {
        width: 100%;
        min-height: 100vh;
        height: 100%;
        background: #F5F5F5;
        position: relative;
        padding-top: 30px;
        .user-wrapper {
            width: 100%;
            height: 100%;
            position: relative;
            z-index: 0;
            box-sizing: border-box;
            .user-box {
                width:686px;
                height:460px; 
                margin: 0 auto;
                padding: 30px 30px 91px 30px;
                box-shadow:2px 0px 8px rgba(44,42,45,0.2);
                background-color:rgba(255,255,255,1);
                .user-main {
                    .label-item {
                        margin-top: 30px;
                    }
                    input {
                        box-sizing: border-box;
                        width:620px;
                        height:88px; 
                        padding: 0 15px;
                        font-size:28px;
                        font-family:PingFang-SC-Medium;
                        border-bottom: 1px solid #2C2A2D;
                        background:rgba(255,255,255,1);
                    }
                    .auth-item {
                        display: flex;
                        position: relative;
                        .auth-wrapper {
                            position: absolute;
                            right: 10px;
                            bottom: 10px;
                        }
                        .auth {
                            display: flex;
                            justify-content: center;
                            width:270px;
                            height:88px;
                            margin-left: 25px;
                            line-height:88px; 
                            font-size:28px;
                            font-family:PingFangSC-Medium;
                            color:rgba(255,255,255,1);
                            background-color:rgba(170,176,179,1);
                        }
                        .auth.active {
                            background: linear-gradient(#05102B, #0A2148); /* 标准的语法 */
                        }
                    }
                }
            }
            .btn-box {
                width:686px;
                height:88px; 
                margin: 0 auto;
                margin-top: 103px;
                .btn-item {
                        // margin-top: 40px;
                        .btn {
                            box-sizing: border-box;
                            width:100%;
                            height:88px; 
                            font-size:30px;
                            font-family:PingFangSC-Medium;
                            color:rgba(255,255,255,1);
                            line-height:0px;
                            background-color:rgba(170,176,179,1);
                        }
                        .btn.active {
                            background: linear-gradient(#05102B, #0A2148); /* 标准的语法 */
                        }
                    }
            }
        }
    }
</style>