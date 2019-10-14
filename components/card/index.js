Component({
    properties: {
      card:Object
    },
    data: {
     url: "/pages/personal/personal"
    },
    methods: {
        tapCardItem(e){
            this.triggerEvent('tapCard', e.currentTarget.dataset)
        }
    }
})
