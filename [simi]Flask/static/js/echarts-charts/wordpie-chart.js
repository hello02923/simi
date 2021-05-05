var chartDom = document.getElementById('main3');
var myChart = echarts.init(chartDom);
var option;
 window.addEventListener('resize', ()=> {
	// myChart.resize()
	echarts.init(document.getElementById('main3')).resize()
})

option = {
    tooltip: {
        trigger: 'item'
    },
    // legend: {
    //     top: '3%',
    //     left: 'center'
    // },
    legend: {
        // orient: 'vertical',
        left: 'left',
    },
    series: [
        {
            name: '關鍵字',
            type: 'pie',
            radius: ['30%', '60%'],
            avoidLabelOverlap: false,
            itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2
            },
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '16',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                {value: 1048, name: '數位'},
                {value: 735, name: '社群'},
                {value: 580, name: '行銷'},
                {value: 484, name: '精準'},
                {value: 300, name: '痛點'}
            ]
        }
    ]
};

option && myChart.setOption(option);