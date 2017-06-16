<template>
  <div>
    <input type="text" placeholder="Your name" v-model="newName" @keyup.enter="tryAddMessage">
    <input type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
    <button type="submit" @click="tryAddMessage">Add message</button>
    <ul>
      <li v-for="message in messages">
        <span>{{ message.name }}</span>
        <span>{{ message.text }}</span>
        <span @click="tryRemoveMessage(message)">x</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import * as services from '../services'
  import { getMessages } from '../vuex/getters'
  import { fetchMessages, addMessage, removeMessage } from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        messages: getMessages
      },
      actions: {
        fetchMessages,
        addMessage,
        removeMessage
      }
    },
    data () {
      return {
        newMessage: '',
        newName: ''
      }
    },

    ready () {
      this.fetchMessages()
      this.addMessage()
      this.removeMessage()
    },

    methods: {
      tryAddMessage () {
        if (this.newMessage.trim()) {
          // Persist a new message to the db
          services.messageService.create({ text: this.newMessage, name: this.newName }).then(this.newMessage = '')
        }
      },
      tryRemoveMessage (message) {
        // Remove message from the db
        services.messageService.remove(message)
      }
    }
  }
</script>
