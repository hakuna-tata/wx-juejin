import { FeiDianModel } from '../../models/FeiDianModel.js'

const FeiDianClass = new FeiDianModel()

Page({
    data: {

    },

    onLoad: function (options) {
        FeiDianClass.getHotRecommendList().then(res => {
        })
    },

    onReady: function () {

    },

    onShow: function () {

    },

    onPullDownRefresh: function () {

    },

    onReachBottom: function () {

    },
})