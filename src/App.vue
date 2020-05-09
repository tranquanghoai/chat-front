<template>
  <div id="app">
    <v-row>
      <input v-model="toUserName" placeholder="Send To">
      <input v-model="privateMesage" placeholder="Nội dung" @keyup.enter="sendPrivateMessage()">
    </v-row>
    <img src="./assets/logo.png"  />
    <v-container class="grey lighten-5">
      <v-row no-gutters>
      <input v-model="name" placeholder="Name">
      <input v-model="room" placeholder="Room" @keyup.enter="joinRoom()">
      <input v-model="text" placeholder="Text" @keyup.enter="sendMessage()">
      <div v-for="(message, index) in messages" :key="index">
        <v-row>{{message.text}}</v-row>
      </div>
      </v-row>
    </v-container>
    <!-- <router-view /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      socket: window.io(window.baseUrl),
      messages: [],
      text: '',
      room: '',
      name: '',
      toUserName: '',
      privateMesage: ''
    }
  },
  created () {
    // this.socket.emit('join', {name: 'Hoai', room: '12345'}, (error) => {
    //   alert(error)
    //   console.log(this.messages)
    // })
    this.socket.on('message', (message) => {
      this.messages.push(message)
      console.log(message, this.messages)
    })
    this.socket.on('receiveMessage', (message) => {
      this.messages.push(message)
    })
  },
  methods: {
    sendPrivateMessage () {
      this.socket.emit('privateMessage', {toUserName: this.toUserName, message: this.privateMesage}, (error) => {
        alert(error)
      })
    },
    joinRoom () {
      this.socket.emit('join', {name: this.name, room: this.room}, (error) => {
        alert(error)
      })
    },
    sendMessage () {
      this.socket.emit('sendMessage', this.text, () => {
        this.text = ''
      })
    }
  }
}
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
