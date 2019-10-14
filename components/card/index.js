Component({
    properties: {
      card:Object
    },
    data: {

    },
    methods: {
        tapCardItem(e){
            this.triggerEvent('tapCard', e.currentTarget.dataset)
        }
    }
})
