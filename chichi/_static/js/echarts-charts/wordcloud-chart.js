var chart2_1 = echarts.init(document.getElementById('card2_main1'));
var option2_1 = {
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 10,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        width: 600,
        height: 400,
        drawOutOfBound: true,
        textStyle: {
            color: function () {
                return 'rgb(' + [
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160),
                    Math.round(Math.random() * 160)
                ].join(',') + ')';
            }
        },
        emphasis: {
            textStyle: {
                shadowBlur: 10,
                shadowColor: '#333'
            }
        },
        data: [
            {
                name: '社群行銷',
                rotationRange: [-90, 90],
                value: 10000,
                textStyle: {
                    color: 'black'
                },
                emphasis: {
                    textStyle: {
                        color: 'red'
                    }
                }
            },
            {
                name: '國家',
                value: 6181
            },
            {
                name: '企業',
                value: 4386
            },
            {
                name: '領先',
                value: 4055
            },
            {
                name: '科技',
                value: 2467
            },
            {
                name: '數位',
                value: 2244
            },
            {
                name: '公司',
                value: 3386
            },
            {
                name: '客戶',
                value: 2055
            },
            {
                name: '合作',
                value: 1467
            },
            {
                name: '資訊',
                value: 6244
            },
            {
                name: '行銷',
                value: 1898
            },
            {
                name: '富蘭克林',
                value: 1484
            },
            {
                name: '投資組合',
                value: 1112
            },
            {
                name: '優勢',
                value: 965
            },
            {
                name: '媒體',
                value: 847
            },
            {
                name: '環境',
                value: 582
            },
            {
                name: '台灣',
                value: 555
            },
            {
                name: '防疫',
                value: 550
            },
            {
                name: '酒廠',
                value: 462
            },
            {
                name: 'Facebook',
                value: 366
            },
            {
                name: '調酒',
                value: 360
            },
            {
                name: '推動',
                value: 282
            },
            {
                name: '機會',
                value: 273
            },
            {
                name: '跨界',
                value: 265
            }
        ]
    } ]
};

chart2_1.setOption(option2_1);

window.onresize = chart2_1.resize;