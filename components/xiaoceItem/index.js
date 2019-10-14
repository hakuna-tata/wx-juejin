Component({ 
    properties: {
        list:{
          type:Object,
          observer: function (newVal){
            let val = newVal.img.replace("https://","")
            this.setData({
              img: `https://images.weserv.nl/?url=${val}`
            })
          }
        }
    },
    data: {
      img:""
    },
    methods: {

    }
})
