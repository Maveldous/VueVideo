<template>
    <div class="global-container">
        <article class="ref__description article">
            <h1 class="ref__description-title title">Video player</h1>
            <p class="ref__description-text">Here is a component video player written in a Vue framework. It is fully responsive and intuitive. With the ability to embed it anywhere without additional dependencies. Customizable to the needs of the designer.</p>
        </article>
        <article class="ref__demo article">
            <h1 class="ref__demo-title title">Demonstration</h1>
            <videoplayer :notes="someContent" :link="ref" :key="ref"></videoplayer>
            <div class="ref__container">
            <p>Enter the link in the form below.<br> Example: 
                <a href="https://pic.pikbest.com/00/07/48/97B888piCT9M.mp4">https://pic.pikbest.com/00/07/48/97B888piCT9M.mp4</a>
            </p>
                <input
                    v-model="ref" 
                    class="ref__demo-input" 
                    type="text" name="ref__container-input" 
                    placeholder="Вставьте ссылку на видео"
                    autofocus
                    >
            </div>
        </article>
        <article class="ref__documentation article">
            <h1 class="ref__documentation-title title">Documentation</h1>
            <table class="ref__documentation-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Type</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="red">ref</td>
                        <td>String</td>
                        <td>Link to video</td>
                    </tr>
                    <tr>
                        <td class="red">notes</td>
                        <td>Array of objects</td>
                        <td>Video temp marks</td>
                    </tr>
                </tbody>
            </table>
        </article>
        
    </div>
</template>


<script>
    module.exports = {
        data: function(){
            return {
                ref: 'https://pic.pikbest.com/00/97/20/888piC6X888piCvKd.mp4',
                someContent: [
                    {
                        start:5,
                        duration: 4,
                        name: 'Title2'
                    },
                    {
                        start:2,
                        duration: 2,
                        name: 'Title1'
                    }
                ]
            }
        },
        components: {
            'videoplayer': require('./components/videoplayer.vue'),
        },
        methods: {

        }
    }
</script>

<style>
    body{
        font-family: 'Roboto', sans-serif;
    }
    .article{
        padding: 30px;
    }
    .title{
        display: block;
        font-size: 50px;
        font-weight: 700;
    }
    .ref__description-text{
        display: inline-block;
        width: 500px;
        color: #888;
    }

    .ref__container{
        margin: 50px auto;
        width: 80vw;
    }
    .videoplayer{
        margin: 0 auto;
    }

    .ref__demo-input{
        width: 70vw;
        height: 30px;
        border: 3px solid #ada4a4d8;
        border-radius: 5px;
        font-size: 25px;
    }
    .ref__demo-btn{
        font-size: 25px;
    }

    tr{
        margin: 50px 0;
    }

    th, td{
        width: 200px;
        height: 70px;
        text-align: left;
    }

    .red{
        color: red;
    }
</style>