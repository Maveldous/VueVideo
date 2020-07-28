<template>
    <div class="global-container">
        <!-- <div v-if="stateOf" class="ref__container">
            <label class="ref__container-title" for="ref__container-input">Video player</label>
            <p>https://2ch.hk/a/src/6873846/15936790507220.webm</p>
            <input
                v-model="ref" 
                class="ref__container-input" 
                type="text" name="ref__container-input" 
                placeholder="Вставьте ссылку на видео"
                autofocus
                >
            <button @click="openLink()" class="ref__container-btn">OPEN</button>
        </div> -->
        <videoplayer :content="someContent" :link="ref"></videoplayer>
    </div>
</template>


<script>
    module.exports = {
        data: function(){
            return {
                stateOf: false, //true должно быть https://pic.pikbest.com/00/97/20/888piC6X888piCvKd.mp4
                ref: 'https://pic.pikbest.com/00/97/20/888piC6X888piCvKd.mp4',
                someContent: [
                    {
                        first:5,
                        second: 9,
                        name: 'Title2'
                    },
                    {
                        first:2,
                        second: 4,
                        name: 'Title1'
                    }
                ]
            }
        },
        components: {
            'videoplayer': require('./components/videoplayer.vue'),
        },
        methods: {
            openLink: function(){
                this.stateOf = false
            }
        }
    }
</script>

<style>
    .global-container{
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .ref__container-title{
        display: block;
        text-align: center;
        font-size: 35px;
        padding-bottom: 50px;
    }
    .ref__container-input{
        width: 70vw;
        height: 30px;
        border: 3px solid #ada4a4d8;
        border-radius: 5px;
        font-size: 25px;
    }
    .ref__container-btn{
        font-size: 25px;
    }
</style>