<template>
    <div class="order-container">
        <Loading v-show="loading" />
            <vue-better-scroll
                    style="height:300px" 
                    class="wrapper"
                    ref="scroll"
                    :scrollbar="scrollbarObj"
                    :pullUpLoad="pullUpLoadObj"
                    :startY="parseInt(startY)"
                    @pullingUp="pullingUp"
                    v-if="orderList.length !=0">
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
              </vue-better-scroll>
              <div v-else class="no-data">
                <p>暂无数据</p>
              </div>
    </div>
</template>
<script>
    import VueBetterScroll from 'vue2-better-scroll'
    import { requestFindMyOrder } from '@/api'
    import { Toast } from 'mint-ui'
    const requestCode = '0000'
    export default {
        name: 'Order',
        components: {
          VueBetterScroll: VueBetterScroll
        },
        data() {
            return {
                loading: true,
                orderList: [],
                nextPage: 1,
                totalPage: 1,
                pageNo: 1,
                listQuery: {
                  pageNum: 1,
                  pageSize: 5
                },
                allLoaded: false,
                scrollbarObj: {
                    fade: false
                },
                pullUpLoadObj: {
                  threshold: 30,
                  txt: {
                    more: '加载更多',
                    noMore: '没有更多数据了'
                  }
                },
                startY: 0,  // 纵轴方向初始化位置
                scrollToX: 0,
                scrollToY: 0,
                scrollToTime: 300
            }
        },
        created() {
            this.fetchFindMyOrder()
        },
        methods: {
          pullingUp() {
                if (this.nextPage > this.totalPage) {
                    this.$refs.scroll.forceUpdate(false);
                } else {
                    this.fetchFindMyOrder()
                    this.$refs.scroll.forceUpdate(true)
                }
            },
          fetchFindMyOrder() {
             const startTime = Date.now() // 请求开始
             const condition = {
              ...this.listQuery
            }
            requestFindMyOrder(condition).then(res => {
              const endTime = Date.now() // 请求结束
              if (res.code == requestCode) {
                Toast({
                  message: res.msg,
                  duration: 1000
                })
                const { data } = res
                this.nextPage = parseInt(data.pageNo) + 1
                this.totalPage = parseInt(data.pages)
                this.listQuery.pageNum = this.nextPage
                this.orderList.push(...data.data)
                const requestTime = endTime - startTime
                if (requestTime <= 300) {
                    setTimeout(() => {
                      this.loading = false
                    }, 300 - requestTime)
                  } else {
                      this.loading = false
                  }
              } else {
                Toast(res.msg)
                this.loading = false
              }
            }).catch(e => Toast(e))
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
        .no-data {
          width: 100%;
          height: 100vh;
          display: flex;
          align-items: center;
          display: flex;
          align-items: center;
          justify-content: center;
          p {
            font-size: 36px;
            color:#CCCCCC;
          }
        }
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