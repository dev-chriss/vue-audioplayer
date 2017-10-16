<template>
  <div id="app">
    <a href="https://github.com/chrissetyawan/vue-audioplayer" target="_blank" class="github-corner">
      <svg width="80" height="80" viewBox="0 0 250 250"
           style="fill:#39AF78; color:#2F4053; position: absolute; top: 0; border: 0; right: 0;">
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
          <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
                fill="currentColor" style="transform-origin: 130px 106px;" class="octo-arm"></path>
          <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
                fill="currentColor" class="octo-body"></path>
      </svg>
    </a>
    <div class="container">
      <br>
      <h1>Vue AudioPlayer</h1>
      <p>Vue 2 - AudioPlayer can play .opus, .ogg, .mp3 and others</p>
      <br>

      <div style="margin-top:50px;">
        <div style="margin-bottom:30px;">
          <file-upload :url='url' 
              :max-size='maxsize' 
              :thumb-url='thumbUrl' 
              :accept="accept" 
              :btn-label='btnlabel'
              @change="onFileChange" 
              @success="onUploadSuccess" 
              @error="onUploadError">
          </file-upload>
        </div>
        
        <div>
          <a-player
            ref="aplayer"
            theme= "#42b983"
            :listmaxheight="listmaxheight"
            :music="music"
            :remove="remove"
            @error="onMusicError"
          ></a-player>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import appconfig from './configs/config.js'

export default {
  data () {
    return {
      // file uploader
      maxsize:10000000, // don't allow the total upload size to exceed ~10MB
      accept:".opus, .mp3, .mp4, .wav, .ogg",
      btnlabel:"Add file",
      url: appconfig.API + '/file/upload',
      filesUploaded: null,
      //music player
      aplayer: null,
      remove:true,
      mode: 'single',
      listmaxheight: '300px',
      music: [
        {
          url: './static/audio/test1.opus',
          title: 'test1.opus',
          author: 'Anonim',
        },
        {
          title: 'test2.opus',
          author: 'Anonim',
          url: './static/audio/test2.opus'
        },
        {
          title: 'Life is Beautiful.mp3',
          author: 'Json Mraz',
          url: './static/audio/LifeIsWonderfull.mp3',
          pic: './static/img/bg.jpg'
        }
      ]
    }
  },
  mounted () {
    this.aplayer = this.$refs.aplayer
    this.getMusicList(this.$refs.aplayer)
  },
  methods: {
    onMusicError () {
      // console.dir(this.aplayer.audio.error)
      console.log('error : %O', this.aplayer.audio.error)
    },
    thumbUrl (file) {
      return file.myThumbUrlProperty
    },
    onFileChange (file) {
      var newmusic = {
        title: file.file.title, 
        author: file.file.author, 
        url: file.file.url
      }
      this.fileUploaded = newmusic
      this.aplayer.pause()
      this.aplayer.music.push(newmusic)
    },
    onUploadError (event) {
      console.log("error:"+event.message)
    },
    onUploadSuccess (event) {
      this.aplayer.play(this.fileUploaded)
      this.aplayer.play()
    },
    getMusicList(player){
      axios.get(appconfig.API + '/file/list')
      .then(response => {
          var data = response.data
          var newmusic

          data.playlist.forEach(function(item){
            newmusic = {
              title: item.title, 
              author: item.author, 
              url: item.url
            }
            player.music.push(newmusic)
        });
      })
      .catch(e => {
        console.log("error:"+e.message)
      })
    }
  }
}
</script>

<style>

</style>
