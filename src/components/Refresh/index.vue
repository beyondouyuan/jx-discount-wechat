<template>
    <div class="refresh-container">
            <div class="refresh-box">
            </div>
    </div>
</template>
<script>
    export default {
        name: 'Refresh'
    }
</script>

<style lang="scss">
    .refresh-container {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2000;
        background-color: #FFFFFF;
      .refresh-box,
      .refresh-box:after {
        border-radius:50%;
        width:10em;
        height:10em;
      }
      .refresh-box {
        font-size:10px;
        position:absolute;
        left: 50%;
        top: 50%;
        // 使用transform和translate进行定位且同时使用transform:rotate进行定位转换(旋转)时，必须定义transform-origin: 0 0;，且动画转换rotate时同时带上translate，否则transform会把初始位置定位到left:50%的地方
        transform: translate(-50%, -50%);
        transform-origin: 0 0;
        border-top:1.1em solid rgba(#3498db,0.2);
        border-right:1.1em solid rgba(#3498db,0.2);
        border-bottom:1.1em solid rgba(#3498db,0.2);
        border-left:1.1em solid rgba(#3498db,1);
        animation:loader 1.1s infinite linear;
      }
    }

    @mixin loaderMixin() {

      0% {
        transform:rotate(0deg) translate(-50%,-50%);
      }

      100% {
        transform:rotate(360deg) translate(-50%,-50%);
      }

  }
  @keyframes loader {@include loaderMixin;}
</style>