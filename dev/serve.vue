<script>
import Vue from 'vue';
import VueFile64 from '@/vue-file64.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueFile64
  }
});
</script>

<template>
  <div id="app">
    <vue-file64 />
  </div>
</template>
