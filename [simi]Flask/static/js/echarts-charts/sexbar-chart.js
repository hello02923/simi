var chartDom2_2 = document.getElementById('card2_main2');
var myChart2_2 = echarts.init(chartDom2_2);
var option2_2;
window.addEventListener('resize', ()=> {
    // myChart.resize()
    echarts.init(document.getElementById('card2_main2')).resize()
})
option2_2 = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: ['女', '男'],
        top:'15%',
        right: '0'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value',
        boundaryGap: [0, 0.01]
    },
    xAxis: {
        type: 'category',
        data: ['Nov.1', 'Nov.2', 'Nov.3', 'Nov.4', 'Nov.5', 'Nov.6']
    },
    series: [
        {
            name: '女',
            type: 'bar',
            data: [1820, 2389, 2934, 10970, 1344, 1130]
        },
        {
            name: '男',
            type: 'bar',
            data: [1932, 2338, 3100, 12194, 1341, 1807]
        }
    ]
};

option2_2 && myChart2_2.setOption(option2_2);