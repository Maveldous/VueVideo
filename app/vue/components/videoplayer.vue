<template>
    <div :style="{ height: height + 'px', width: width + 'px' }" class="videoplayer">
        <video :width="width" :height="height" @canplaythrough="getsize">
            <source :src="reflink" type="video/mp4">
            <source :src="reflink" type="video/webm">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="reflink">link to the video</a> instead.</p>
        </video>
        <div class="video__controll-panel">
            <button @click="pause()" class="video__btn">STOP</button>
            <div class="video__load"></div>
        </div>
    </div>
</template>



<script>
    module.exports = {
        data: function (){
            return {
                reflink: 'https://2ch.hk/a/src/6873846/15936790507220.webm',
                paused: true,
                width: 0,
                height: 0
            }
        },
        props:['link'],
        methods:{
            pause: function(){
                if(this.paused) document.querySelector('video').play()
                else document.querySelector('video').pause()
                this.paused = !this.paused
            },
            getsize: function(){
                this.width = document.querySelector('video').videoWidth;
                this.height = document.querySelector('video').videoHeight;
                if(document.documentElement.clientWidth > 900){
                    this.width = this.width/2
                    this.height = this.height/2
                }
            }
        },
        mounted: function(){

        }
    }
</script>

<style scoped>

    .video__btn{
        display: block;
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: #ffffff;
        height: 100%;
    }
    .videoplayer{
        position: relative;
        border: 1px solid black;
    }
    video{
        position: absolute;
        z-index: -1;
    }
    .video__controll-panel{
        display: flex;
        height: 15%;
        margin-top: 48%;
    }
    .video__load{
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
    }

</style>