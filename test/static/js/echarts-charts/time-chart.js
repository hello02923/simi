var chartDom = document.getElementById('main2');
var myChart = echarts.init(chartDom);
window.addEventListener('resize', ()=> {
	// myChart.resize()
	echarts.init(document.getElementById('main2')).resize()
})
var option;

option = {
    title: {
        text: ''
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['facebook', 'instagram', 'dcard', 'udn', 'ptt']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['週一', '週二', '週三', '週四', '週五', '週六', '週日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: 'facebook',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
            name: 'instagram',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: 'dcard',
            type: 'line',
            stack: 'Total',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: 'udn',
            type: 'line',
            stack: 'Total',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: 'ptt',
            type: 'line',
            stack: 'Total',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};

option && myChart.setOption(option);