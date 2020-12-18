<template>
  <div class="private-numbers__search">
    <a-collapse>
      <a-collapse-panel key="1" header="Search">
        <a-form @submit="handleSubmit">
          <div class="form-wrapper">
            <a-input placeholder="სახელი გვარი" v-model="values.name" name="name" />
            <a-input
              placeholder="პირადი ნომერი"
              type="number"
              v-model="values.privateNumber"
              name="privateNumber"
            />
            <a-select name="country" v-model="values.country" default-value="">
              <a-select-option value="">დაბადების ადგილი</a-select-option>
              <a-select-option value="თბილისი">თბილისი</a-select-option>
              <a-select-option value="ქუთაისი"> ქუთაისი </a-select-option>
              <a-select-option value="ბათუმი"> ბათუმი </a-select-option>
            </a-select>
            <a-date-picker
              name="birthday_from"
              v-model="values.birthday_from"
              placeholder="დაბ. თარიღი-დან"
            />
            <a-date-picker
              name="birthday_to"
              v-model="values.birthday_to"
              placeholder="დაბ. თარიღი-მდე"
            />
            <div />
            <a-date-picker
              v-model="values.period_from"
              name="period_from"
              placeholder="მოქმედების ვადა-დან"
            />
            <a-date-picker
              name="period_to"
              v-model="values.period_to"
              placeholder="მოქმედების ვადა-მდე"
            />
          </div>
          <a-button type="primary" html-type="submit">Search</a-button>
        </a-form>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>
<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      values: {},
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault()
      const store = this.$store
      store.dispatch('privateNumbers/filterUsers', this.values)
    },
  },
}
</script>
<style lang="scss">
.form-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
  padding-bottom: 30px;

  @media screen and (max-widh: 768px) {
    grid-template-columns: 1fr;
  }
}
</style>
