<template>
  <a-table :columns="columns" :data-source="data">
    <span slot="name" slot-scope="text, record">
      {{ record.name + ' ' + record.lastName }}
    </span>
    <span slot="birthday" slot-scope="text, record">
      {{ parseDate(record.birthday) }}
    </span>
    <span slot="period" slot-scope="text, record">
      {{ parseDate(record.period) }}
    </span>
    <span slot="action" slot-scope="text, record">
      <a-button @click="editUser(record)">Edit</a-button>
      <a-divider type="vertical" />
      <a-button type="danger" @click="deleteUser(record)">Delete</a-button>
    </span>
  </a-table>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: null,
    },
    data: {
      type: Array,
      default: null,
    },
  },
  data() {
    return {}
  },
  methods: {
    deleteUser(data) {
      this.$store.dispatch('privateNumbers/deleteUser', data)
    },
    editUser(data) {
      this.$store.dispatch('privateNumbers/onEdit', data)
    },
    parseDate(date) {
      console.log(date)
      const newDate = new Date(date)
      const month = newDate.getMonth()
      const year = newDate.getFullYear()
      const day = newDate.getDate()

      return `${day}-${month + 1}-${year}`
    },
  },
}
</script>
