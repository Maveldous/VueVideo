<template>
    <div :style="{ height: height + 'px', width: width + 'px' }" class="videoplayer">
        <video :width="width" :height="height" @canplaythrough.once="getsize">
            <source :src="reflink" type="video/mp4">
            <source :src="reflink" type="video/webm">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="reflink">link to the video</a> instead.</p>
        </video>
        <div class="video__controll-panel">
            <button @click="pause()" class="video__btn">STOP</button>
            <div class="video__load">
                <div :style="{width: loadwidth + '%'}" class="inner__load"></div>
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
                width: 0,
                height: 0,
                loadwidth: 0,
                condition: true
            }
        },
        props:['link'],
        methods:{
            pause: function(){
                var video = document.querySelector('video');
                if(this.paused){
                    video.play()
                    this.condition = true
                    this.processing(video.duration);
                } 
                else {
                    video.pause()
                    this.condition = false
                }
                this.paused = !this.paused
            },
            getsize: function(){
                var video = document.querySelector('video');
                this.width = video.videoWidth;
                this.height = video.videoHeight;
                if(document.documentElement.clientWidth > 900){
                    this.width = this.width/2
                    this.height = this.height/2
                }
            },
            processing: function(duration){

                var loadband = document.querySelector('.inner__load')
                var timerId = setInterval(() => {
                    if(this.loadwidth >= 100 || this.condition === false) clearInterval(timerId)
                    this.loadwidth++
                }, duration * 10)

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