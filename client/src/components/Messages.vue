<template>
  <div class="flex flex-row flex-1 clear">
    <div class="flex flex-column col col-12">
      <main class="chat flex flex-column flex-1 clear">
        <div class="message flex flex-row" v-for="message in messages">
          <img src="https://placeimg.com/64/64/any" alt="${message.name}" class="avatar">
          <div class="message-wrapper" >
            <p class="message-header">
              <span class="username font-600">{{ message.name }}</span>
            </p>
            <p class="message-content font-300">{{ message.text }}</p>
            <span @click="tryRemoveMessage (message)"><i class="fa fa-remove" title="remove"></i></i></span>
          </div>
        </div>
      </main>

      <h6 style="color:red; text-align: center;" id ="errors"></h6>
      <div class="flex flex-row flex-space-between" id="send-message">
        <input class="col col-3" type="text" placeholder="Your name" v-model="newName" @keyup.enter="tryAddMessage">
        <input class="col col-7" type="text" placeholder="Enter message" v-model="newMessage" @keyup.enter="tryAddMessage">
        <button class="button-primary col col-2" type="submit" @click="tryAddMessage">Send</button>
      </div>
    </div>
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
        newName: 'anonymous'
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
        console.log(message.name)
        // Remove message from the db
        services.messageService.remove(message)
      }
    }
  }
</script>
