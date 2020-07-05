<template>
    <div class="videoplayer">
        <video height="360px" width="640px" @timeupdate="timeUpdate">
            <source :src="reflink" type="video/mp4">
            <source :src="reflink" type="video/webm">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="reflink">link to the video</a> instead.</p>
        </video>
        <div class="video__controll-panel">
            <button @click="pause()" class="video__btn fas fa-play"></button>
            <div @click="move" class="video__load">
                <div :style="{width: loadWidth + '%'}" class="inner__load"></div>
            </div>
        </div>
    </div>
</template>



<script>
    module.exports = {
        data: function (){
            return {
                reflink: this.link,
                paused: true,
                loadWidth: 0
            }
        },
        props:['link'],
        methods:{
            pause: function(){
                var video = document.querySelector('video');
                if(this.paused) video.play()
                else video.pause()
                this.paused = !this.paused
            },
            timeUpdate: function(){
                var video =         document.querySelector('video');
                this.loadWidth =    video.currentTime * 100 / video.duration
            },
            move: function(event){
                var video =         document.querySelector('video');
                var loadband =      document.querySelector('.video__load');
                this.loadWidth =    event.offsetX * 100 / loadband.offsetWidth
                video.currentTime = this.loadWidth * video.duration / 100
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
        background: #000;
    }
    .video__controll-panel{
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 15%;
    }
    .video__load{
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
    }
    .inner__load{
        background: #fff;
        height: 100%;
    }
</style>