<template>
    <div class="loading-container">
            <div class="loading-box">
            </div>
    </div>
</template>
<style lang="scss">
    // @-webkit-keyframes borderScale {
    //   0% {
    //     border: 3px solid white;
    //   }
    //   50% {
    //     border: 15px solid #3498db;
    //   }
    //   100% {
    //     border: 3px solid white;
    //   }
    // }

    // @keyframes borderScale {
    //   0% {
    //     border: 3px solid white;
    //   }
    //   50% {
    //     border: 15px solid #3498db;
    //   }
    //   100% {
    //     border: 3px solid white;
    //   }
    // }
    // .loading-container {
    //     width: 100%;
    //     height: 100%;
    //     position: absolute;
    //     z-index: 2000;
    //     background-color: #FFFFFF;
    //     .loading-box {
    //       width: 200px;
    //       height: 200px;
    //       color: white;
    //       margin: 0 auto;
    //       position: absolute;
    //       top: 50%;
    //       left: 50%;
    //       margin-right: -50%;
    //       transform: translate(-50%, -50%);
    //       border: 3px solid #3498db;
    //       border-radius: 50%;
    //       -webkit-animation: borderScale 1s infinite ease-in-out;
    //       animation: borderScale 1s infinite ease-in-out;
    //     }
    //     .loading-text {
    //       font-family:PingFang-SC-Bold, sans-serif;
    //       font-weight: bold;
    //       font-size: 1.5em;
    //       position: absolute;
    //       color: #3498db;
    //       top: 50%;
    //       left: 50%;
    //       margin-right: -50%;
    //       transform: translate(-50%, -50%);
    //     }
    // }
  //   .loading-container {
  //       width: 100%;
  //       height: 100%;
  //       position: absolute;
  //       z-index: 2000;
  //       background-color: #FFFFFF;
  //     .loading-box,
  //     .loading-box:after {
  //       border-radius:50%;
  //       width:100px;
  //       height:100px;
  //     }
  //     .loading-box {
  //       font-size:10px;
  //       position:absolute;
  //       left: 50%;
  //       top: 50%;
  //       // 使用transform和translate进行定位且同时使用transform:rotate进行定位转换(旋转)时，必须定义transform-origin: 0 0;，且动画转换rotate时同时带上translate，否则transform会把初始位置定位到left:50%的地方
  //       transform: translate(-50%, -50%);
  //       transform-origin: 0 0;
  //       border-top:11px solid rgba(#3498db,0.2);
  //       border-right:11px solid rgba(#3498db,0.2);
  //       border-bottom:11px solid rgba(#3498db,0.2);
  //       border-left:11px solid rgba(#3498db,1);
  //       animation:loader 1.1s infinite linear;
  //     }
  //   }
  //   @mixin loaderMixin() {
  //     0% {
  //       transform:rotate(0deg) translate(-50%,-50%);
  //     }
  //     100% {
  //       transform:rotate(360deg) translate(-50%,-50%);
  //     }
  // }
  // @keyframes loader {@include loaderMixin;}
  

  .loading-container {
    width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2000;
        background-color: #FFFFFF;
  .loading-box {
    color:#3498db;
    width:1em;
    height:1em;
    border-radius:50%;
    -webkit-animation:loading 1.3s infinite linear;
    animation:loading 1.3s infinite linear;
    font-size:20px;
    position:absolute;
    left: 50%;
    top: 50%;
    // 使用transform和translate进行定位且同时使用transform:rotate进行定位转换(旋转)时，必须定义transform-origin: 0 0;，且动画转换rotate时同时带上translate，否则transform会把初始位置定位到left:50%的地方
    transform: translate(-50%, -50%);
    transform-origin: 0 0;
  }

}

@mixin loading-frames() {

  0%,
  100% {
    box-shadow:0 -3em 0 0.2em,
    2em -2em 0 0em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 0;
  }

  12.5% {
    box-shadow:0 -3em 0 0,
    2em -2em 0 0.2em,
    3em 0 0 0,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }

  25% {
    box-shadow:0 -3em 0 -0.5em,
    2em -2em 0 0,
    3em 0 0 0.2em,
    2em 2em 0 0,
    0 3em 0 -1em,
    -2em 2em 0 -1em,
    -3em 0 0 -1em,
    -2em -2em 0 -1em;
  }

  37.5% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0em 0 0,
    2em 2em 0 0.2em,
    0 3em 0 0em,
    -2em 2em 0 -1em,
    -3em 0em 0 -1em,
    -2em -2em 0 -1em;
  }

  50% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 0em,
    0 3em 0 0.2em,
    -2em 2em 0 0,
    -3em 0em 0 -1em,
    -2em -2em 0 -1em;
  }

  62.5% {
    box-shadow:0 -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 0,
    -2em 2em 0 0.2em,
    -3em 0 0 0,
    -2em -2em 0 -1em;
  }

  75% {
    box-shadow:0em -3em 0 -1em,
    2em -2em 0 -1em,
    3em 0em 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 0,
    -3em 0em 0 0.2em,
    -2em -2em 0 0;
  }

  87.5% {
    box-shadow:0em -3em 0 0,
    2em -2em 0 -1em,
    3em 0 0 -1em,
    2em 2em 0 -1em,
    0 3em 0 -1em,
    -2em 2em 0 0,
    -3em 0em 0 0,
    -2em -2em 0 0.2em;
  }

}

@-webkit-keyframes loading {@include loading-frames;}
@keyframes loading {@include loading-frames;}
</style>