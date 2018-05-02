<template>
    <div class="loading-container">
            <div class="loading-box">
                <div class="loading-text">loading</div>
            </div>
    </div>
</template>
<style lang="scss">
    @-webkit-keyframes borderScale {
      0% {
        border: 3px solid white;
      }
      50% {
        border: 15px solid #3498db;
      }
      100% {
        border: 3px solid white;
      }
    }

    @keyframes borderScale {
      0% {
        border: 3px solid white;
      }
      50% {
        border: 15px solid #3498db;
      }
      100% {
        border: 3px solid white;
      }
    }
    .loading-container {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 2000;
        background-color: #FFFFFF;
        .loading-box {
          width: 200px;
          height: 200px;
          color: white;
          margin: 0 auto;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%);
          border: 3px solid #3498db;
          border-radius: 50%;
          -webkit-animation: borderScale 1s infinite ease-in-out;
          animation: borderScale 1s infinite ease-in-out;
        }
        .loading-text {
          font-family:PingFang-SC-Bold, sans-serif;
          font-weight: bold;
          font-size: 1.5em;
          position: absolute;
          color: #3498db;
          top: 50%;
          left: 50%;
          margin-right: -50%;
          transform: translate(-50%, -50%);
        }
    }
</style>