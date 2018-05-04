<template>
    <div class="result-container">
        <div class="result-wrapper">
            <div class="result-header">
                <div class="fail" v-if="state.status != 'success' ">
                    <img src="../../assets/images/icon_tip@2x.png">
                    <p class="status">支付失败</p>
                </div>
                <div class="success" v-else>
                    <img src="../../assets/images/icon_tip@2x.png">
                    <p class="status">支付成功</p>
                </div>
            </div>
            <div class="result-main" v-if="state.status == 'success' ">
                <div class="result-info">
                    <p class="amount">{{state.amount}}</p>
                    <p class="merchant">{{state.merchant}}</p>
                </div>
            </div>
            <div class="btn-container">
                <button type="button" class="btn" @click="handleBackHome">返回首页</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Result',
        data() {
            return {
                status: 'success',
                amount: '',
                merchant: '',
                state:''
            }
        },
        created() {
            // const { state } = this.$route.params
            // console.log(state.status)
        },
        mounted() {
            const { state } = this.$route.params
            this.state = state
        },
        methods: {
            handleBackHome() {
                this.$router.push({name: 'Home'})
            }
        }
    }
</script>
<style lang="scss">
    .result-container {
        width: 100%;
        min-height: 100vh;
        height: 100%;
        background-color: #F5F5F5;
        .result-wrapper {
            width: 100%;
            height:800px; 
            background:rgba(255,255,255,1);
        }
        .result-header {
            text-align: center;
            margin-top: 80px;
            img {
                width: 159px;
                height: 159px;
            }
            p {
                margin-top: 40px;
                font-size:30px;
                font-family:PingFangSC-Medium;
                color:rgba(52,52,52,1);
            }
        }
        .result-main {
             text-align: center;
             margin-top: 79px;
             .amount {
                height:54px; 
                font-size:72px;
                font-family:PingFangSC-Semibold;
                color:rgba(52,52,52,1);
                line-height:51px;
             }
             .merchant {
                margin-top: 40px;
                height:28px; 
                font-size:30px;
                font-family:PingFangSC-Medium;
                color:rgba(153,153,153,1);
                line-height:51px;
             }
        }
        .btn-container {
            margin-top: 110px;
            text-align: center;
            .btn {
                width:620px;
                height:80px;
                border: 1px solid #2D2B2E;
                background:rgba(255,255,255,1);
            }
        }
    }
</style>