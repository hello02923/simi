var chartDom = document.getElementById('main5');
var myChart = echarts.init(chartDom);
var option;
 window.addEventListener('resize', ()=> {
	// myChart.resize()
	echarts.init(document.getElementById('main5')).resize()
})

option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        data: ['中性', '負面', '正面'],
        top:'15%',
        right: '0'
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: [
        {
            type: 'value'
        }
    ],
    xAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['文章一', '文章二', '文章三', '文章四', '文章五', '文章六', '文章七']
        }
    ],
    series: [
        {
            name: '中性',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            emphasis: {
                focus: 'series'
            },
            data: [200, 170, 240, 244, 200, 220, 210]
        },
        {
            name: '正面',
            type: 'bar',
            stack: '總量',
            label: {
                show: true
            },
            emphasis: {
                focus: 'series'
            },
            data: [320, 302, 341, 374, 390, 450, 420]
        },
        {
            name: '負面',
            type: 'bar',
            stack: '總量',
            label: {
                show: true,
                position: 'inside'
            },
            emphasis: {
                focus: 'series'
            },
            data: [-120, -132, -101, -134, -190, -230, -210]
        }
    ]
};

option && myChart.setOption(option);