<template>
    <div class="shadow-container">
            <div class="shadow-box">
                <div class="shadow-text">
                    <p>已失效</p>
                </div>
            </div>
    </div>
</template>
<script>
    export default {
        name: 'Shadow'
    }
</script>
<style lang="scss">
    .shadow-container {
        position: absolute;
        left: 50%;
        top: 0;
        transform: translateX(-50%);
        .shadow-box {
            position: relative;
            width:100%;
            height:100%; 
            background:rgba(0,0,0,0.5);
            .shadow-text {
                position: absolute;
                left: 50%;
                top: 50%;
                z-index: 2000;
                transform: translate(-50%, -50%);
                background: transparent;
                p {
                    font-size:72px;
                    font-family:PingFang-SC-Bold;
                    color:rgba(255,255,255,1);
                    line-height:51px;
                }
            }
        }
    }
</style>