<template>
  <div class="home">
    <main-header></main-header>
    <main-content>
      <h1>Home</h1>
    </main-content>
  </div>
</template>

<script>
import { MainHeader, MainContent } from '../pieces'
export default {
  name: 'home',
  components: { MainHeader, MainContent },
  head: {
    title: {
      inner: 'Train More'
    }
  }
}
</script>
