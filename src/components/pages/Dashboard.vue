<template>
  <div class="dashboard">
    <p>Dashboard</p>
    <router-link :to="{ name: 'logout' }">logout</router-link>
  </div>
</template>

<script>
export default {
  name: 'dashboard'
}
</script>
