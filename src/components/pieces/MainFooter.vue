<template>
  <footer class="main-footer">
    <div class="container-fluid">
      <p v-html="$t('footer.developedBy', { link: 'http://thiagosf.net' })"></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'main-footer'
}
</script>
