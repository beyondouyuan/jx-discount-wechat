<template>
    <div class="order-container">
        <Loading v-show="loading" />
            <header class="tab-box">
              <nav class="navigation">
                <router-link
                  to="/order"
                 :class="{active: $route.query.tab == 'cons' || !$route.query.tab}">消费订单</router-link>
                <router-link
                  to="/order?tab=recharge"
                  :class="{active: $route.query.tab == 'recharge'}">充值订单</router-link>
                <router-link
                  to="/order?tab=shell"
                  :class="{active: $route.query.tab == 'shell'}">转为享贝</router-link>
              </nav>
            </header>
              <div class="order-wrapper" v-if="orderList.length !=0">
                  <vue-better-scroll
                      style="height:300px" 
                      class="wrapper"
                      ref="scroll"
                      :scrollbar="scrollbarObj"
                      :pullUpLoad="pullUpLoadObj"
                      :startY="parseInt(startY)"
                      @pullingUp="pullingUp"
                      >
                      <div v-for="(item, index) of orderList" :key="index" class="order-list">
                        <div class="order-content" v-if="$route.query.tab == 'cons' || !$route.query.tab">
                          <div class="title-box">
                            <h2>{{item.merchantName}}</h2>
                          </div>
                          <div class="detail-box">
                              <div class="detail-item"><span>付款金额</span><span class="amount-value">&yen;{{item.payAmount}}</span></div>
                              <div class="detail-item"><span>订单编号</span><span>{{item.gatheringOrderNo}}</span></div>
                              <div class="detail-item"><span>付款时间</span><span>{{item.payTime | parseTime}}</span></div>
                          </div>
                        </div>
                        <div class="order-content" v-else-if="$route.query.tab == 'recharge'">
                          <div class="title-box">
                            <h2>{{item.merchantName}}</h2>
                          </div>
                          <div class="detail-box">
                              <div class="detail-item"><span>充值金额</span><span class="amount-value">&yen;{{item.payAmount}}</span></div>
                              <div class="detail-item"><span>获得金额</span><span class="amount-value">&yen;{{item.payAmount}}</span></div>
                              <div class="detail-item"><span>订单编号</span><span>{{item.gatheringOrderNo}}</span></div>
                              <div class="detail-item"><span>付款时间</span><span>{{item.payTime | parseTime}}</span></div>
                          </div>
                        </div>
                        <div class="order-content" v-else>
                          <div class="title-box">
                            <h2>{{item.merchantName}}</h2>
                          </div>
                          <div class="detail-box">
                              <div class="detail-item"><span>转入金额</span><span class="amount-value">&yen;{{item.payAmount}}</span></div>
                              <div class="detail-item"><span>相当享贝</span><span class="amount-value">&yen;{{item.payAmount}}</span></div>
                              <div class="detail-item"><span>订单编号</span><span>{{item.gatheringOrderNo}}</span></div>
                              <div class="detail-item"><span>转入时间</span><span>{{item.payTime | parseTime}}</span></div>
                          </div>
                        </div>
                    </div>
                </vue-better-scroll>
              </div>
              <div v-else class="no-data">
                <img src="../../assets/images/icon_nodata@2x.png" alt="暂无数据">
                <p>暂无数据</p>
              </div>
    </div>
</template>
<script>
    import VueBetterScroll from 'vue2-better-scroll'
    import { requestFindMyOrder } from '@/api'
    import { Toast } from 'mint-ui'
    const requestCode = '0000'
    const orderList = [{
      merchantName: 'mmmm',
      payAmount: 12,
      gatheringOrderNo: '213456789',
      payTime: '2018-01-01'
    },{
      merchantName: 'llllll',
      payAmount: 122,
      gatheringOrderNo: '098765432',
      payTime: '2018-09-01'
    }]
    export default {
        name: 'Order',
        components: {
          VueBetterScroll: VueBetterScroll
        },
        data() {
            return {
                // orderList,
                loading: false,
                orderList: [],
                nextPage: 1,
                totalPage: 1,
                pageNo: 1,
                listQuery: {
                  pageNum: 1,
                  pageSize: 5,
                  recordType: 0
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
        watch: {
          // 路由监控
          $route(to, from) {
            const recordType  = this.transTab(this.$route.query.tab)
            // 更新查询条件
            this.listQuery.pageNum = 1
            this.listQuery.recordType = recordType
            this.fetchFindMyOrder()
          }
        },
        methods: {
          transTab(tab) {
            switch(tab) {
              case 'cons':
                return 0
              case 'recharge':
                return 1
              case 'shell':
                return 2
              default:
                return 0
            }
          },
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
            this.loading = true
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
        background: #F5F5F5;
        position: relative;
        .no-data {
          width: 100%;
          height: calc(100vh - 100px); // 去除tab高度
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          p {
            margin-top: 20px;
            font-size: 28px;
            color:#999999;
          }
        }
        .navigation {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background:rgba(255,255,255,1);
            a {
              flex: 1;
              display: flex;
              height: 100%;
              align-items: center;
              justify-content: center;
              font-size:28px;
              font-family:PingFangSC-Regular;
              color:rgba(153,153,153,1);
              position: relative;
              &.active {
                  color:rgba(51,51,51,1);
                  &::after {
                    content: '';
                    position: absolute;
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    width:80px;
                    height:4px;
                    background:rgba(51,51,51,1);
                  }
              }
            }
          }
          .order-wrapper {
            margin-top: 20px;
          }
        .order-list {
            margin: 0 auto 20px auto;
            padding: 0 30px 0 32px;
            background:rgba(255,255,255,1);
            &:not(:first-child) {
                // margin: 32px auto;
            }
            .order-content {
              padding: 30px 0 30px 0;
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
