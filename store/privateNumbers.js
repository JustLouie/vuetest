import * as R from 'ramda'

export const state = {
  columns: [
    {
      key: 'name',
      title: 'სახელი გვარი',
      scopedSlots: { customRender: 'name' }
    },
    {
      title: 'პირადი ნომერი',
      dataIndex: 'privateNumber',
      key: 'privateNumber',
    },
    {
      title: 'სქესი',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'დაბადების თარიღი',
      key: 'birthday',
      scopedSlots: { customRender: 'birthday' }
    },
    {
      title: 'მოქმედების ვადა',
      key: 'period',
      scopedSlots: { customRender: 'period' }
    },
    {
      title: 'Action',
      key: 'action',
      scopedSlots: { customRender: 'action' },
    },
  ],
  data: null,

  values: {
    name: '',
    lastName: '',
    cirizenship: '',
    gender: '',
    privateNumber: '',
    birthday: '',
    delivery: '',
    period: '',
    country: '',
    cardNumber: '',
    deliveryService: '',
  },

  edit: false,
  errors: null,
  addUserSuccess: false,
}

const compareDateBetween = (from, to) => {
  return (val) => {
    const newVal = new Date(val)
    const newFrom = new Date(from)
    const newTo = new Date(to)
    if (from && !to) {
      return newVal >= newFrom
    } else if (to && !from) {
      return newVal <= newTo
    } else {
      return newVal >= newFrom && newVal <= newTo
    }
  }
}

const alreadyAdded = (key, value) => {
  const store = JSON.parse(localStorage.getItem('users')) || []

  return store.find((user) => user[key] === value)
}

const validation = (values) => {
  const errors = []

  for (const key in values) {
    if (values[key] === '') {
      errors.push({
        name: key,
        message: 'Field is Required',
      })
    } else if (
      key === 'privateNumber' &&
      alreadyAdded('privateNumber', values[key])
    ) {
      errors.push({
        name: key,
        message: `Private Number is already registered`,
      })
    } else if (key === 'birthday' || key === 'delivery') {
      const now = new Date()

      if (values[key] > now) {
        errors.push({
          name: key,
          message: 'Invalid Date',
        })
      }
    }
  }

  return errors

}

export const mutations = {
  getUsers(state) {
    const data = JSON.parse(localStorage.getItem('users')) || []
    state.data = data
  },
  addUserRequest(state) {
    state.addUserSuccess = false
  },
  addUserFailed(state, errors) {
    state.errors = errors
  },
  addUser(state, payload) {
    const store = JSON.parse(localStorage.getItem('users')) || []
    state.addUserSuccess = true
    state.data = R.append(payload, store)
  },
  updateUser(state, user) {
    const index = R.findIndex(R.propEq('privateNumber', user.privateNumber))(
      state.data
    )
    state.data = R.update(index, user, state.data)
  },
  deleteUser(state, user) {
    const store = JSON.parse(localStorage.getItem('users')) || []
    const found = store.filter((u) => u.privateNumber === user.privateNumber)
    state.data = R.without(found, state.data)
  },
  tableFilter(state, filters) {
    const data = JSON.parse(localStorage.getItem('users'))

    if (data && data.length) {
      const filter = {}

      for (const key in filters) {
        if (filters[key] !== '') {
          if (key === 'birthday_from' || key === 'birthday_to') {
            filter.birthday = compareDateBetween(
              filters.birthday_from,
              filters.birthday_to
            )
          } else if (key === 'period_from' || key === 'period_to') {
            filter.period = compareDateBetween(
              filters.period_from,
              filters.period_to
            )
          } else {
            filter[key] = (val) => {
              const newVal = val.toLowerCase()
              const keyword = filters[key].toLowerCase()
              return newVal.includes(keyword)
            }
          }
        }
      }

      state.data = R.filter(R.where(filter), data)
    }
  },
  updateStorage(state) {
    localStorage.setItem('users', JSON.stringify(state.data))
  },
  updateValues(state, values) {
    state.values[values.name] = values.value
  },
  onEdit(state, payload) {
    const store = JSON.parse(localStorage.getItem('users')) || []
    const found = store.find((s) => s.privateNumber === payload.privateNumber)
    state.values = found
    state.edit = true
  },
  clearEdit(state) {
    state.edit = false
    state.values = {}
  },
}

export const actions = {
  addUser(context, data) {
    context.commit('addUserRequest')

    context.commit('addUser', data)

    context.commit('updateStorage')
  },
  updateUser(context, data) {
    context.commit('updateUser', data)
    context.commit('updateStorage')
  },
  deleteUser(context, data) {
    context.commit('deleteUser', data)
    context.commit('updateStorage')
  },
  onEdit(context, data) {
    context.commit('onEdit', data)
  },
  getUsers(context) {
    context.commit('getUsers')
  },
  filterUsers(context, data) {
    context.commit('tableFilter', data)
  },
  updateValues(context, values) {
    context.commit('updateValues', values)
  },
  clearEdit(context) {
    context.commit('clearEdit')
  },
}
