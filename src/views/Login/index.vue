<template>
    <div class="login-container">
        <Loading v-show="loading" />
        <!-- top banner -->
        <section class="banner-top">
            <div class="conversation-box">
                <div class="conversation clearfix dialog-left dialog-1">
                    <img src="../../assets/images/tx_icon3@2x.png">
                    <p class="txt">链鱼支付真的有优惠吗？</p>
                </div>
                <div class="conversation clearfix dialog-right dialog-2">
                    <p class="txt">能啊，我用了半年了，次次有优惠。</p>
                    <img src="../../assets/images/tx_icon3@2x.png">
                </div>
            </div>
            <div class="banner-box">
                <img src="../../assets/images/bg01@2x.png">
            </div>
        </section>
        <!--  login box -->
        <section class="login-wrapper">
            <div class="login-tips">
                <div class="step-item step-one">
                    <img src="../../assets/images/zhuce_icon@2x.png">
                    <span>10s注册</span>
                </div>
                <div class="arrow-right arrow-one"></div>
                <div class="step-item step-tow">
                    <img src="../../assets/images/kaihu_icon@2x.png">
                    <span>开通账户</span>
                </div>
                <div class="arrow-right arrow-two"></div>
                <div class="step-item step-three">
                    <img src="../../assets/images/xiaofei_icon@2x.png">
                    <span>转入消费</span>
                </div>
            </div>
            <div class="login-box">
                <p class="adv">10秒即可获得优惠</p>
                <div class="login-main">
                    <div class="label-item">
                        <input type="text" v-model="mobile" placeholder="请输入手机号" />
                    </div>
                    <div class="label-item auth-item">
                        <input type="text" v-model="verifyCode" placeholder="请输入验证码"  />
                        <span>
                            <button class="auth" :class="{active: smsCode}" v-waves :disabled="!smsCode" @click="handleSmsCode">{{authText}}</button>
                        </span>
                    </div>
                    <div class="btn-item">
                        <button type="button" v-waves class="btn" :class="{active: checkMobile && checkValidate}" :disabled="!(checkMobile && checkValidate)" @click="handleLogin">提交</button>
                    </div>
                </div>
            </div>
            <div class="banner-bottom">
                <div class="conversation-box">
                    <div class="conversation clearfix dialog-left dialog-3">
                        <img src="../../assets/images/tx_icon3@2x.png" />
                        <p class="txt">链鱼多余的资产只能在这里使用吗？</p>
                    </div>
                    <div class="conversation clearfix dialog-right dialog-4">
                        <img src="../../assets/images/tx_icon3@2x.png" />
                        <p class="txt">不不不，你还可以去享选商城使用哦。</p>
                    </div>
                </div>
                <div class="banner-box">
                    <img src="../../assets/images/bg01@2x.png">
                </div>
            </div>
        </section>
    </div>
</template>
<script>
    import { mapActions } from 'vuex'
    import { requestLogin, requestSmsCode } from '@/api'
    import { RegUtils } from '@/utils/regexp'
    import { Toast, Indicator } from 'mint-ui'
    import waves from "@/directive/waves"
    const requestCode = '0000'
    export default {
        name: 'Login',
        directives: {
            waves
        },
        data() {
            return {
                loading: true,
                authText: '获取验证码',
                mobile: '',
                verifyCode: '',
                checkMobile: false,
                checkValidate: false,
                smsCode: false,
                isLogining: false // 防止重复提交
            }
        },
        created() {
            setTimeout(() => {
                this.loading = false
            }, 3000)
        },
        watch: { // 监控以实现实时验证
            mobile: function(newMobile, oldMobile) {
                if (!RegUtils.isPhone(newMobile)) {
                    this.checkMobile = false
                } else {
                    this.checkMobile = true
                    this.smsCode = true
                }
            },
            verifyCode: function(newVal, oldVal) {
                if (!RegUtils.isNumber(newVal)) {
                    this.checkValidate = false
                } else {
                    this.checkValidate = true
                }
            }
        },
        methods: {
            ...mapActions([
                'LoginAction'
            ]),
            /**
             * 倒计时
             *
             * @param      {(Function|number)}  second  The second
             */
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
                // 防止重复提交
                this.smsCode = false
                const condition = {
                    mobile: this.mobile
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
            handleLogin() {
                // 因为提交按钮的禁用状态用观察者模式与校验状态关联起来了，必须要正通过才不禁用，方可提交操作，因此
                // 为了防止重复提交，点击提交后，手动将其中一个校验状态设置为不通过，如此可实现禁用按钮，
                // 提交处理完成（不管失败还是成功，在将简要状态改为通过，如此即可防止重复提交）
                this.checkValidate = false
                // 此处可不做验证提示， 但若不使用观察者模式，则此处检验必须需开启
                // if (!(this.checkMobile && this.checkValidate)) {
                //     Toast({
                //           message: '请输入手机号或者验证码！',
                //           duration: 2000
                //     })
                //     return;
                // }
                const mobile = this.mobile
                const verifyCode = this.verifyCode
                const condition = {
                    mobile,
                    loginSource : 'qr',
                    verifyCode,
                    openid : 'oxBTcvqv6EDiQY7x3kvjA1b_Fv1A'
                }
                Indicator.open({
                    text: '正在登录...',
                    spinnerType: 'fading-circle'
                })
                // 使用vuex进行异步登录
                this.LoginAction(condition).then(res => {
                    console.log(res)
                    if (res.code == requestCode) {
                        setTimeout(() => {
                            Indicator.close()
                        }, 600)
                        setTimeout(() => {
                            Toast({
                              message: '登录成功',
                              duration: 1000
                            })
                        }, 800)
                        // 3s 后可在此提交
                        setTimeout(() => {
                            this.checkValidate = true
                        }, 3000)
                        setTimeout(() => {
                            this.$router.push({name: 'Home'})
                        }, 1500)
                    } else {
                        setTimeout(() => {
                            Indicator.close()
                        }, 1000)
                        setTimeout(() => {
                            Toast({
                              message: '登录失败',
                              duration: 1000
                            })
                        }, 1200)
                        // 3s 后可在此提交
                        setTimeout(() => {
                            this.checkValidate = true
                        }, 3000)
                    }
                })
            }
        }
    }
</script>
<style lang="scss">
    .login-container {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column
    }
    .banner-top {
        width: 100%;
        height: 380px;
        // background: url(../../assets/images/bg01@2x.png) center center no-repeat;
        // background-size: 100% 100%;
        position: relative;
        z-index: 0;
        .conversation-box {
            position: absolute;
            z-index: 2000;
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
    .login-wrapper {
        width: 100%;
        flex: 1;
        position: relative;
        z-index: 0;
        box-sizing: border-box;
        .login-tips {
            box-sizing: border-box;
            position: absolute;
            top: -100px;
            left: 50%;
            transform: translateX(-50%);
            width:686px;
            height:200px;
            padding: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow:2px 0px 8px rgba(44,42,45,0.2);
            background-color:rgba(255,255,255,1);
            img {
                width: 81px;
                height: 81px;
                border-radius: 100%;
                margin-bottom: 23px;
            }
            span {
                font-size:30px;
                font-family:PingFang-SC-Medium;
                color:rgba(52,52,52,1);
            }
            .step-item {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .arrow-right {
                position: absolute;
                top: 47px;
                width: 30px;
                height: 58px;
                background: url(../../assets/images/_@2x.png) center center no-repeat;
                background-size: 100% 100%; 
            }
            .arrow-one {
                left: 200px;
            }
            .arrow-two {
                left: 454px;
            }
        }
        .login-box {
            width:686px;
            height:529px; 
            margin: 0 auto;
            margin-top: 130px;
            padding: 30px;
            box-shadow:2px 0px 8px rgba(44,42,45,0.2);
            background-color:rgba(255,255,255,1);
            .adv {
                margin: 0 auto;
                width:100%;
                height:34px; 
                line-height:34px; 
                text-align: center;
                font-size:36px;
                font-family:PingFangSC-Medium;
                color:rgba(52,52,52,1);
            }
            .login-main {
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
                    border: 1px solid #2C2A2D;
                    background:rgba(255,255,255,1);
                }
                .auth-item {
                    display: flex;
                    input {
                        width:325px;
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
                .btn-item {
                    margin-top: 40px;
                    .btn {
                        box-sizing: border-box;
                        width:620px;
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
    .banner-bottom {
        width: 686px;
        height: 390px;
        margin: 0 auto;
        margin-top: 40px;
        // background: url(../../assets/images/bg01@2x.png) center center no-repeat;
        // background-size: 100% 100%;
        position: relative;
        .conversation-box {
            position: absolute;
            z-index: 2000;
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
        // border-radius: 32px;
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
    .dialog-1 {
        // width:386px;
        border-radius: 0 32px 32px 0; // left-top right-top right-bottom left-bottom
        margin-top: 40px;
        margin-left: 70px;
    }
    .dialog-2 {
        border-radius: 32px 0 0 32px;
        margin-top: 62px;
        margin-right: 70px;
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
</style>