<template>
  <div class="add-user">
    <a-button type="primary" @click="onModalShow"> Add User </a-button>
    <a-modal v-model="modalShow" title="Add User" centered @ok="handleSubmit">
      <a-form :form="form">
        <div class="form-wrapper">
          <a-form-item label="Name">
            <a-input
              v-decorator="[
                'name',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.name"
              placeholder="სახელი"
              name="name"
              @input="onValueUpdate"
            />
          </a-form-item>
          <a-form-item label="Last Name">
            <a-input
              v-decorator="[
                'lasName',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.lastName"
              placeholder="გვარი"
              name="lastName"
              @input="onValueUpdate"
            />
          </a-form-item>
          <a-form-item label="Citizenship">
            <a-select
              v-decorator="[
                'cirizenship',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              name="cirizenship"
              :value="values.citizenship"
              default-value=""
              @change="(e) => onValueUpdate(e, 'citizenship')"
            >
              <a-select-option value="">მოქალაქეობა</a-select-option>
              <a-select-option value="საქართველო">საქართველო</a-select-option>
              <a-select-option value="ამერიკა"> ამერიკა </a-select-option>
              <a-select-option value="გერმანია"> გერმანია </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Gender">
            <a-select
              v-decorator="[
                'gender',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              name="gender"
              :value="values.gender"
              default-value=""
              @change="(e) => onValueUpdate(e, 'gender')"
            >
              <a-select-option value="">სქესი</a-select-option>
              <a-select-option value="მამრობით">მამრობით</a-select-option>
              <a-select-option value="მდედრობითი">მდედრობითი</a-select-option>
              <a-select-option value="სხვა">სხვა</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Private Number">
            <a-input
              v-decorator="[
                'privateNumber',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.privateNumber"
              placeholder="პირადი ნომერი"
              type="number"
              name="privateNumber"
              @input="onValueUpdate"
            />
          </a-form-item>
          <a-form-item label="Birthday Date">
            <a-date-picker
              v-decorator="[
                'birthday',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.birthday"
              name="birthday"
              placeholder="დაბადების თარიღი"
              @change="(e) => onValueUpdate(e, 'birthday')"
            />
          </a-form-item>
          <a-form-item name="Delivery Date">
            <a-date-picker
              v-decorator="[
                'delivery',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.delivery"
              name="delivery"
              placeholder="გაცემის თარიღი"
              @change="(e) => onValueUpdate(e, 'delivery')"
            />
          </a-form-item>
          <a-form-item name="Period">
            <a-date-picker
              v-decorator="[
                'period',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.period"
              name="period"
              placeholder="მოქმედების ვადა"
              @change="(e) => onValueUpdate(e, 'period')"
            />
          </a-form-item>
          <a-form-item label="Country">
            <a-select
              v-decorator="[
                'country',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              name="country"
              :value="values.country"
              default-value=""
              @change="(e) => onValueUpdate(e, 'country')"
            >
              <a-select-option value="">დაბადების ადგილი</a-select-option>
              <a-select-option value="თბილისი">თბილისი</a-select-option>
              <a-select-option value="ქუთაისი"> ქუთაისი </a-select-option>
              <a-select-option value="ბათუმი"> ბათუმი </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="Card Number">
            <a-input
              v-decorator="[
                'cardNumber',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.cardNumber"
              placeholder="ბარათის No"
              name="cardNumber"
            />
          </a-form-item>
          <a-form-item label="Delivery Service">
            <a-input
              v-decorator="[
                'deliveryService',
                {
                  rules: [{ required: true, message: 'Field is Required!' }],
                },
              ]"
              :value="values.deliveryService"
              placeholder="გამცემი ორგანო"
              name="deliveryService"
              @input="onValueUpdate"
            />
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
    userAdded: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      modalShow: false,
    }
  },
  computed: {
    form() {
      return this.$form.createForm(this)
    },
    values() {
      return this.$store.state.privateNumbers.values
    },
  },
  watch: {
    userAdded(val) {
      if (val) {
        this.values = {}
      }
    },
    edit(val) {
      if (val) {
        this.modalShow = true
      }
    },
  },
  methods: {
    onModalShow() {
      this.modalShow = true
      this.$store.dispatch('privateNumbers/clearEdit')
    },
    onValueUpdate(e, name) {
      this.$store.dispatch('privateNumbers/updateValues', {
        name: name || e.target.name,
        value: e.target ? e.target.value : e,
      })
    },
    handleSubmit() {
      this.form.validateFields((err) => {
        if (!err) {
          this.modalShow = false
          console.log(this.values)
          if (!this.edit) {
            this.$store.dispatch('privateNumbers/addUser', this.values)
          } else {
            this.$store.dispatch('privateNumbers/updateUser', this.values)
          }
        }
      })
    },
  },
})
</script>
<style lang="scss">
.add-user {
  padding: 20px 0px;
}
.form-wrapper {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
}
</style>
