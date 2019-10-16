Component({
    
    properties: {
        list:Array,
        swiperHeight:String
    },

    data: {
        topicSrc: "images/ic_topic_star.png",
        hotSrc: "images/pin_hot.png",
    },

    methods: {
        tapSwiper(e){
            this.triggerEvent('tapSwiper', e.currentTarget.dataset)
        }
    }
})
