<template>
    <div class="videoplayer" :class="{'active': fullstate}" >
        <video class="videoComponent" height="360px" width="640px" @timeupdate="timeUpdate">
            <source :src="reflink" type="video/mp4">
            <source :src="reflink" type="video/webm">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="reflink">link to the video</a> instead.</p>
        </video>
        <div class="video__controll-panel">
            <button @click="pause()" class="video__btn-pause">
                <i :class="paused ? 'fas fa-play': 'fas fa-pause'"></i>
            </button>
            <div @mousedown.prevent="move" @mousemove="mousemove" class="video__load">
                <div :style="{width: loadWidth + '%'}" class="inner__load"></div>
            </div>
            <div class="volumeBox">
                <button @click="activeVolume = !activeVolume" class="video__btn-volume">
                    <i class="fas fa-volume-up"></i>
                </button>
                <input type="range" class="video__range-volume" v-show="activeVolume" v-model="volume">
            </div>
            <button class="video__btn-fullscreen" @click="fullscreen">
                <i :class="fullstate ? 'fas fa-compress': 'fas fa-expand'"></i>
            </button>
        </div>
    </div>
</template>



<script>
    module.exports = {
        data: function (){
            return {
                reflink: this.link,
                paused: true,
                fullstate: false,
                loadWidth: 0,
                stateMouse: false,
                activeVolume: false,
                volume: 50
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
                this.stateMouse =   true
                var video =         document.querySelector('video');
                var loadband =      document.querySelector('.video__load');
                this.loadWidth =    event.offsetX * 100 / loadband.offsetWidth
                video.currentTime = this.loadWidth * video.duration / 100
            },
            mousemove: function(event){
                if(this.stateMouse){
                    var video =         document.querySelector('video');
                    var loadband =      document.querySelector('.video__load');
                    this.loadWidth =    event.offsetX * 100 / loadband.offsetWidth
                    video.currentTime = this.loadWidth * video.duration / 100
                }
            },
            fullscreen: function(){
                if(this.fullstate){
                    document.exitFullscreen()
                    this.fullstate = !this.fullstate
                }
                else{
                    document.documentElement.requestFullscreen()
                    this.fullstate = !this.fullstate
                }                
            }
        },
        watch:{
            volume(){
                var video =         document.querySelector('video');
                video.volume = this.volume / 100
            }
        },
        created: function(){
            var mouseup = window.addEventListener('mouseup', event => {
                this.stateMouse =   false
            })
            document.addEventListener('fullscreenchange', event => {
                if (document.fullscreenElement) this.fullstate = true
                else                            this.fullstate = false
            });
        }
    }
</script>

<style scoped>

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

    /* Кнопки иконки */

    button, 
    button:active, 
    button:focus {
        outline: none;
    }

    .video__btn-pause{
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: #ffffff;
        height: 100%;
    }
    .video__btn-fullscreen{
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: #ffffff;
        height: 100%;
    }

    i{
        font-size: 15px;
        padding: 0 10px;
        transition: all ease 1s;
    }

    .volumeBox{
        display: inline-block;
        position: relative;
    }

    .video__btn-volume{
        background: rgba(0, 0, 0, 0.8);
        border: none;
        color: #ffffff;
        height: 100%;
    }

    .video__range-volume{
        position: absolute;
        width: 150%;
        top: 0;
        right: -30%;
        transform: rotateZ(-90deg) translateX(40px);
    }

    /* Блок с фуллскрин стилями */

    .videoplayer.active{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }

    .videoplayer.active .videoComponent{
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .videoplayer.active .video__controll-panel{
        height: 8%;
    }

</style>