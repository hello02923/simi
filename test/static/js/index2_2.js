var wh_com_sent = {
	"Whiskey":{
		"week":{
			"dcard":{
				"positive":0.5681818181818182,
				"negative":0.17045454545454544,
				"neutral":0.26136363636363635,
			},
			"ptt":{
				"positive":0.8,
				"negative":0.0,
				"neutral":0.2,
			},
			"fb":{
				"positive":0.5701357466063348,
				"negative":0.2081447963800905,
				"neutral":0.22171945701357465,
			},
		},
		"month":{
			"dcard":{
				"positive":0.5555555555555556,
				"negative":0.18803418803418803,
				"neutral":0.2564102564102564,
			},
			"ptt":{
				"positive":0.6,
				"negative":0.26666666666666666,
				"neutral":0.13333333333333333,
			},
			"fb":{
				"positive":0.5992438563327032,
				"negative":0.19092627599243855,
				"neutral":0.20982986767485823,
			},
		},
		"half_year":{
			"dcard":{
				"positive":0.6874125874125874,
				"negative":0.13006993006993006,
				"neutral":0.1825174825174825,
			},
			"ptt":{
				"positive":0.6,
				"negative":0.21904761904761905,
				"neutral":0.18095238095238095,
			},
			"fb":{
				"positive":0.6082910321489001,
				"negative":0.15651438240270726,
				"neutral":0.23519458544839256,
			},
		},

	},
}

// ch3_1
var chartDom = document.getElementById('main3_1');
var myChart = echarts.init(chartDom);
var option;
var posneg_ratio_data;
 window.addEventListener('resize', ()=> {
    // myChart.resize()
    echarts.init(document.getElementById('main3_1')).resize()
})
fb_data = [
             {value: wh_com_sent["Whiskey"]['week']['fb']['positive'].toFixed(2), name: '正向'},
             {value: wh_com_sent["Whiskey"]['week']['fb']['negative'].toFixed(2), name: '負向'},
             {value: wh_com_sent["Whiskey"]['week']['fb']['neutral'].toFixed(2), name: '中立'},
         ]
// console.log(fb_data)
option = {
    title: {
        text: 'Facebook',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    // legend: {
    //     // orient: 'vertical',
    //     bottom: 0,
    // },
    series: [
        {
            name: 'FB',
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
            data: fb_data
        }
    ]
};

option && myChart.setOption(option);

// ch3_2
var chartDom = document.getElementById('main3_2');
var myChart = echarts.init(chartDom);
var option;
var posneg_ratio_data;
 window.addEventListener('resize', ()=> {
    // myChart.resize()
    echarts.init(document.getElementById('main3_2')).resize()
})
ptt_data = [
             {value: wh_com_sent["Whiskey"]['week']['ptt']['positive'].toFixed(2), name: '正向'},
             {value: wh_com_sent["Whiskey"]['week']['ptt']['negative'].toFixed(2), name: '負向'},
             {value: wh_com_sent["Whiskey"]['week']['ptt']['neutral'].toFixed(2), name: '中立'},
         ]
// console.log(fb_data)
option = {
    title: {
        text: 'Ptt',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    legend: {
        // orient: 'vertical',
        bottom: 0,
    },
    series: [
        {
            name: 'FB',
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
            data: ptt_data
        }
    ]
};

option && myChart.setOption(option);

// ch3_3
var chartDom = document.getElementById('main3_3');
var myChart = echarts.init(chartDom);
var option;
var posneg_ratio_data;
 window.addEventListener('resize', ()=> {
    // myChart.resize()
    echarts.init(document.getElementById('main3_3')).resize()
})
dcard_data = [
             {value: wh_com_sent["Whiskey"]['week']['dcard']['positive'].toFixed(2), name: '正向'},
             {value: wh_com_sent["Whiskey"]['week']['dcard']['negative'].toFixed(2), name: '負向'},
             {value: wh_com_sent["Whiskey"]['week']['dcard']['neutral'].toFixed(2), name: '中立'},
         ]
// console.log(fb_data)
option = {
    title: {
        text: 'Dcard',
        left: 'center'
    },
    tooltip: {
        trigger: 'item'
    },
    // legend: {
    //     // orient: 'vertical',
    //     bottom: 0,
    // },
    series: [
        {
            name: 'FB',
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
            data: dcard_data
        }
    ]
};

option && myChart.setOption(option);