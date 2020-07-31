<template>
    <div class="videoplayer" :class="{'active': fullstate}" >
        <div v-show="stateAlert" class="videoAlert">
            <i class="fas fa-exclamation-circle"></i>
            <p class="videoAlert__title"> {{stateAlert}}</p>
        </div>
        <video class="videoComponent" @timeupdate="timeUpdate">
            <source :src="reflink" type="video/mp4">
            <source :src="reflink" type="video/webm">
            <p>Your browser doesn't support HTML5 video. Here is a <a :href="reflink">link to the video</a> instead.</p>
        </video>
        <div class="video__controll">
            <div @mousedown.prevent="move" @mousemove="mousemove" class="video__load">
                <div :style="{left: coordinate.left + 'px'}" class="video__load__pop">
                    {{coordinate.value.toFixed(2)}}
                </div>
                <div :style="{width: loadWidth + '%'}" class="inner__load">
                    <div @mousemove="mousemove" class="circle"></div>
                </div>
            </div>
            <div class="video__controll-panel">
                <div class="volumeBox">
                    <button class="video__btn-volume">
                        <i class="fas fa-volume-up"></i>
                    </button>
                    <input type="range" class="video__range-volume" v-model="volume">
                </div>
                <button @click="skip(false)" class="video__btn-arrow">
                    <i class="fas fa-backward"></i>
                </button>
                <button @click="pause()" class="video__btn-pause">
                    <i :class="paused ? 'far fa-play-circle': 'far fa-pause-circle'"></i>
                </button>
                <button @click="skip(true)" class="video__btn-arrow">
                    <i class="fas fa-forward"></i>
                </button>
                <button class="video__btn-fullscreen" @click="fullscreen">
                    <i :class="fullstate ? 'fas fa-compress': 'fas fa-expand'"></i>
                </button>
            </div>
        </div>
    </div>
</template>



<script>
 let video = '';
 let loadband = '';

    module.exports = {
        data: function (){
            return {
                reflink: this.link,
                timers: this.notes,
                paused: true,
                fullstate: false,
                loadWidth: 0,
                stateMouse: false,
                volume: 20,
                coordinate:{
                    left: 0,
                    value: 0
                },
                stateAlert: ''
            }
        },
        props:['link', 'notes'],
        methods:{
            pause: function(){
                if(this.paused) video.play()
                else video.pause()
                this.paused = !this.paused
            },
            timeUpdate: function(){
                let counter = false
                this.loadWidth =    video.currentTime * 100 / video.duration
                this.timers.forEach(time => {
                    if(time.start < video.currentTime &&
                     time.duration + time.start > video.currentTime) {
                        this.stateAlert = time.name;
                        counter = true
                    }
                });
                if(!counter) this.stateAlert = "" 
            },
            move: function(event){
                this.stateMouse =   true
                this.loadWidth =    (event.pageX - loadband.getBoundingClientRect().left) * 100 / loadband.offsetWidth
                video.currentTime = this.loadWidth * video.duration / 100
            },
            mousemove: function(event){
                let position =          event.pageX - loadband.getBoundingClientRect().left;
                this.coordinate.left =  position - 25;
                let curTime = (position * 100 / loadband.offsetWidth) * video.duration / 100;
                this.coordinate.value = curTime;
                if(this.stateMouse){
                    this.loadWidth =    position * 100 / loadband.offsetWidth
                    video.currentTime = curTime;
                }
            },
            skip: function(bool){
                if(bool){
                    video.currentTime = video.currentTime + 2.5
                    this.timeUpdate()
                }
                else{
                    video.currentTime = video.currentTime - 2.5
                    this.timeUpdate()
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
        },
        mounted: function(){
            video =    document.querySelector('video');
            loadband = document.querySelector('.video__load');
        },
        beforeDestroy: function(){
            window.removeEventListener('mouseup', function(event){},false);
            document.removeEventListener('fullscreenchange', function(event){},false);
        }
    }
</script>

<style scoped>
    .videoplayer{
        position: relative;
        background: #000;
        width: 640px;
        height: 360px;
    }
    .videoplayer:hover .video__controll{
        transform: translateX(0px);
        z-index: 1;
        opacity: 1;
    }
    .videoComponent{
        width: 640px;
        height: 360px;
    }

    .video__controll{
        position: absolute;
        z-index: 2;
        bottom: 0;
        left: 0;
        right: 0;
        display: flex;
        height: 54px;
        flex-direction: column;
        transition: 0.5s ease all;
        transform: translateY(30px);
        z-index: -10;
        opacity: 0;
    }
    .video__controll-panel{
        height: 100%;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .video__load{
        position: relative;
        width: 100%;
        height: 15%;
        background: rgba(0, 0, 0, 0.3);
    }
    .video__load:hover .video__load__pop{
        display: block;
    }
    .video__load__pop{
        display: none;
        position: absolute;
        font-size: 10px;
        width: 50px;
        height: 20px;
        background: rgba(0, 0, 0, 0.6);
        color: #fff;
        bottom: 10px;
        padding-top: 8px;
        text-align: center;
    }

    .inner__load{
        background: rgba(17, 205, 252);
        height: 100%;
        position: relative;
    }

    .circle{
        position: absolute;
        right: -5px;
        top: -4px;
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: none;
        z-index: 100;
        background: #fff;
    }

    .videoAlert{
        position: absolute;
        color: white;
        width: 40px;
        height: 40px;
        text-align: center;
        padding-top: 10px;
        top:20px;
        right:30px;
        z-index: 10;
    }
    .fas.fa-exclamation-circle {
        font-size: 20px;
        font-weight: 900;
        padding: 0;
    }

    .videoAlert__title{
        text-align: center;
        margin-top: 5px;
    }

    /* Кнопки иконки */

    button, 
    button:active, 
    button:focus {
        outline: none;
        padding: 0;
    }

    .video__btn-fullscreen{
        position: absolute;
        right: 15px;
    }

    .volumeBox{
        display: inline-block;
        position: absolute;
        left: 0;
    }

    i{
        font-size: 15px;
        padding: 0 10px;
        transition: all ease 1s;
    }

    input[type='range'] {
        -webkit-appearance: none;
        overflow: hidden;
        width: 120px;
        border-radius: 10px;
    }
    
    input[type='range']::-webkit-slider-runnable-track {
        height: 8px;
        -webkit-appearance: none;
        color: #13bba4;
    }
    
    input[type='range']::-webkit-slider-thumb {
        -webkit-appearance: none;
        width: 0;
        height: 0;
        cursor: grabbing;
        background: #434343;
        box-shadow: -80px 0 0 80px #43e5f7;
    }
    
    input[type="range"]::-moz-range-progress {
        background-color: #43e5f7; 
    }
    input[type="range"]::-moz-range-track {  
        background-color: #fff;
    }
    input[type="range"]::-ms-fill-lower {
        background-color: #43e5f7; 
    }
    input[type="range"]::-ms-fill-upper {  
        background-color: #fff;
    }

    /* Блок с фуллскрин стилями */

    .videoplayer.active{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        height: 100%;
        width: 100%;
    }

    .videoplayer.active .videoComponent{
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
    }

    .videoplayer.active .circle{
        display: none;
    }

    @media (max-width: 900px){
        .videoplayer{
            width: 426px;
            height: 240px;
        }
        .videoComponent{
            width: 426px;
            height: 240px;
        }
        .video__controll{
            height: 36px;
        }
        input[type='range']{
            width: 80px;
        }
        .video__load{
            height: 50%;
        }
        .circle{
            top: -3px;
        }
    }

    @media (max-width: 600px){
        .videoplayer{
            width: 320px;
            height: 180px;
        }
        .videoComponent{
            width: 320px;
            height: 180px;
        }
        input[type='range']{
            width: 50px;
        }
        .video__controll{
            height: auto;
        }
        .video__load{
            height: 8px;
        }
    }

</style>