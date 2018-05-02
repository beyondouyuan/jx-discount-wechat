<template>
    <div class="order-container">
        <Loading v-show="loading" />
        <div v-for="(item, index) of orderList" :key="index" class="order-list">
            <div class="title-box">
                <h2>{{item.merchantName}}</h2>
            </div>
            <div class="detail-box">
                <div class="detail-item"><span>付款金额</span><span class="amount-value">{{item.payAmount}}</span></div>
                <div class="detail-item"><span>订单编号</span><span>{{item.gatheringOrderNo}}</span></div>
                <div class="detail-item"><span>付款时间</span><span>{{item.payTime | parseTime}}</span></div>
            </div>
        </div>
    </div>
</template>
<script>
    import { requestFindMyOrder } from '@/api'
    const requestCode = '0000'
    const orderList = [{
          merchantName: '大郎起来喝药',
          payAmount: 1000,
          gatheringOrderNo: 1234567890,
          payTime: '2018-01-03'
      }, {
          merchantName: '大郎起来喝药',
          payAmount: 1000,
          gatheringOrderNo: 1234567890,
          payTime: '2018-01-03'
      }, {
          merchantName: '大郎起来喝药',
          payAmount: 1000,
          gatheringOrderNo: 1234567890,
          payTime: '2018-01-03'
      }, {
          merchantName: '大郎起来喝药',
          payAmount: 1000,
          gatheringOrderNo: 1234567890,
          payTime: '2018-01-03'
    }]
    export default {
        name: 'Order',
        data() {
            return {
                loading: true,
                orderList: [],
                listQuery: {
                  pageNum: 1,
                  pageSize: 5
                }
            }
        },
        created() {
            this.fetchFindMyOrder()
        },
        methods: {
          fetchFindMyOrder() {
             const startTime = Date.now() // 请求开始
             const condition = {
              ...this.listQuery
            }
            requestFindMyOrder(condition).then(res => {
              const endTime = Date.now() // 请求结束
              if (res.code == requestCode) {
                const { data } = res
                this.orderList.push(...data.data)
                if (endTime - startTime >= 1000) {
                      this.loading = false
                  } else {
                      setTimeout(() => {
                          this.loading = false
                      }, 1000)
                  }
              }
            })
          }
        }
    }
</script>
<style lang="scss">
    .order-container {
        width: 100%;
        min-height: 100vh;
        height: 100%;
        // padding-bottom: 186px;
        background: #F5F5F5;
        position: relative;
        .order-list {
            width:686px; 
            margin: 0 auto 32px auto;
            padding: 39px 0 40px 30px;
            background:rgba(255,255,255,1);
            &:not(:first-child) {
                margin: 32px auto;
            }
        }
        .title-box {
            border-bottom: 1px solid  rgba(230,230,230,1);
            padding-bottom: 20px;
            h2 {
                font-size:32px;
                font-family:PingFang-SC-Medium;
                color:rgba(52,52,52,1);
            }
        }
        .detail-item {
            margin-top: 33px;
            padding-right: 31px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size:28px;
            font-family:PingFang-SC-Medium;
            color:rgba(102,102,102,1);
            .amount-value {
                font-size:36px;
                color:rgba(52,52,52,1);
            }
        }
    }
</style>