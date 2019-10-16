Component({
    properties: {
        posts:Object,  
    },
    attached() {
        const _node = ((this.properties.posts || {}).node) || null
        if (_node) {
            this.setData({
                actor: _node.actors[0],
                target: _node.targets[0],
            })
        }
    },
    data: {
        actor: {},
        target: {},
        defaultAvarar:"images/default_avatar.png",
        moreSrc: "images/ic_pin_more.png",
        likeSrc:"images/zan_green_fd.png",
        disLikeSrc:"images/zan_grey_fd.png",
        replySrc: "images/fd_reply.png",
        shareSrc: "images/fd_share.png"
    },

    methods: {
        preview(e) {
            let dataset = e.currentTarget.dataset
            let urls = dataset.urls
            let index = dataset.index
            wx.previewImage({
                urls,
                current: urls[index],
            })
        },
    }
})
