<template>
  <div id="app" class="flex flex-column">
    <main class="flex flex-column">
      <Hello></Hello>
      <Messages></Messages>
    </main>
  </div>
</template>

<script>
import Hello from './components/Hello'
import Messages from './components/Messages'

export default {
  components: { Messages, Hello }
}
</script>


