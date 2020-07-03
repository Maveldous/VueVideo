<template>
    <div class="videoplayer">
        <video @canplaythrough="getsize">
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
                reflink: this.link, // this.link должно быть
                paused: true
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
        height: 360px;
        width: 640px;
        position: relative;
        border: 1px solid black;
    }
    video{
        position: absolute;
        width: 640px;
        height: 360px;
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