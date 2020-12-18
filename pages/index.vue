<template>
  <div class="main-page">
    <Search />
    <AddUser :userAdded="userAdded" :edit="edit" />
    <Table :columns="columns" :data="data" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({

  mounted() {
    this.$store.dispatch('privateNumbers/getUsers')
  },
  computed: {
    columns() {
      return this.$store.state.privateNumbers.columns || null
    },
    data() {
      return this.$store.state.privateNumbers.data || null
    },
    userAdded() {
      return this.$store.state.privateNumbers.addUserSuccess || null
    },
    edit() {
      return this.$store.state.privateNumbers.edit
    }
  },
})
</script>

<style scope="scss">
.main-page {
  padding: 30px;
}
</style>
