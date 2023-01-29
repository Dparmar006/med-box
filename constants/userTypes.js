module.exports = {
  USER_TYPES: {
    ADMIN: 1,
    PHARMACIST: 2,
    PHARMACY_MANAGER: 3,
    CUSTOMER: 4 
  },

  ADMIN_MODULES: [
    {
      module: 'PHARMACISTS',
      moduleNum: 1,
      url: '/admin/pharmacists',
      name: 'Pharmacists'
    },
    {
      module: 'STORES',
      moduleNum: 2,
      url: '/admin/stores',
      name: 'Stores'
    },
    {
      module: 'MEDICINES',
      moduleNum: 3,
      url: '/admin/medicines',
      name: 'Medicines'
    }
  ],

  USER_MODULES: [
    {
      module: 'PROFILE',
      moduleNum: 1,
      url: '/profile',
      name: 'My Profile'
    },
    {
      module: 'PROFILE',
      moduleNum: 1,
      url: '/profile',
      name: 'Pharmacists'
    }
  ]
}
