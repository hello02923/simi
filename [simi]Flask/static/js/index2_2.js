var construct_ratio_data = []
$.ajax({
    dataType: "json",
    url: './../static/data/senti_ratio.json',
    type: 'GET',
    async: false,
    success: function(data){
        construct_ratio_data = data
    },
    error: function(msg){
        console.log('error')
        console.log(msg)
    }
});

$(document).ready(function(){
    main3_1Charts("威士忌",'week')
    main3_2Charts("威士忌",'week')
    main3_3Charts("威士忌",'week')

    $(".g3_select").change(function() {
        $(".g3_select").find(":selected").each(function() {
            // console.log(this.value)
            // console.log($('select').val())
            main3_1Charts($('select').val(),this.value)
            main3_2Charts($('select').val(),this.value)
            main3_3Charts($('select').val(),this.value)
        })
    })
    
    // ch3_1
    $(".select").change(function() {
        $(".select").find(":selected").each(function() {
            // console.log(this.value)
            // console.log($('select').val())
            main3_1Charts(this.value,$('.g3_select').val())
            main3_2Charts(this.value,$('.g3_select').val())
            main3_3Charts(this.value,$('.g3_select').val())
        })
    })
    
})

function main3_1Charts(al_type,time_range){
    var chartDom = document.getElementById('main3_1');
    var myChart = echarts.init(chartDom);
    var option;
    var posneg_ratio_data;
     window.addEventListener('resize', ()=> {
        // myChart.resize()
        echarts.init(document.getElementById('main3_1')).resize()
    })
    fb_data = [
                 {value: construct_ratio_data[al_type][time_range]['fb']['positive'].toFixed(2), name: '正向'},
                 {value: construct_ratio_data[al_type][time_range]['fb']['negative'].toFixed(2), name: '負向'},
                 {value: construct_ratio_data[al_type][time_range]['fb']['neutral'].toFixed(2), name: '中立'},
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
                name: 'Facebook',
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
}

// ch3_2
function main3_2Charts(al_type,time_range){
    var chartDom = document.getElementById('main3_2');
    var myChart = echarts.init(chartDom);
    var option;
    var posneg_ratio_data;
     window.addEventListener('resize', ()=> {
        // myChart.resize()
        echarts.init(document.getElementById('main3_2')).resize()
    })
    ptt_data = [
                 {value: construct_ratio_data[al_type][time_range]['ptt']['positive'].toFixed(2), name: '正向'},
                 {value: construct_ratio_data[al_type][time_range]['ptt']['negative'].toFixed(2), name: '負向'},
                 {value: construct_ratio_data[al_type][time_range]['ptt']['neutral'].toFixed(2), name: '中立'},
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
        series: [
            {
                name: 'Ptt',
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
}

// ch3_3
function main3_3Charts(al_type,time_range){
    var chartDom = document.getElementById('main3_3');
    var myChart = echarts.init(chartDom);
    var option;
    var posneg_ratio_data;
     window.addEventListener('resize', ()=> {
        // myChart.resize()
        echarts.init(document.getElementById('main3_3')).resize()
    })
    dcard_data = [
                 {value: construct_ratio_data[al_type][time_range]['dcard']['positive'].toFixed(2), name: '正向'},
                 {value: construct_ratio_data[al_type][time_range]['dcard']['negative'].toFixed(2), name: '負向'},
                 {value: construct_ratio_data[al_type][time_range]['dcard']['neutral'].toFixed(2), name: '中立'},
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
                name: 'Dcard',
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
}