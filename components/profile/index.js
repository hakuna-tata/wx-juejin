Component({
  properties: {
    userInfo:Object
  },

  data: {
    defaultImage:'images/empty_avatar_user.png'
  },

  methods: {
    tapProfile(e){
      this.triggerEvent('tapProfile', e.currentTarget.dataset)
    }
  }
})
