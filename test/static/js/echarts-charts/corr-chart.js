// example data
var ROOT_PATH = 'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples';

var corrChartDom = document.getElementById('card2_main3');
var corrChart = echarts.init(corrChartDom);
var corrChartoption;
 window.addEventListener('resize', ()=> {
    echarts.init(corrChartDom).resize()
})
 
corrChart.showLoading();
$.getJSON(ROOT_PATH + '/data/asset/data/les-miserables.json', function (graph) {
    corrChart.hideLoading();

    graph.nodes.forEach(function (node) {
        node.label = {
            show: node.symbolSize > 30
        };
    });
    corrChartoption = {
        title: {
            text: 'Les Miserables',
            subtext: 'Default layout',
            top: 'bottom',
            left: 'right'
        },
        tooltip: {},
        legend: [{
            // selectedMode: 'single',
            data: graph.categories.map(function (a) {
                // console.log(a.name.replace('类目', '類別'));
                return a.name
            })
        }],
        animationDuration: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                name: 'Les Miserables',
                type: 'graph',
                layout: 'none',
                data: graph.nodes,
                links: graph.links,
                categories: graph.categories,
                roam: true,
                label: {
                    position: 'right',
                    formatter: '{b}'
                },
                lineStyle: {
                    color: 'source',
                    curveness: 0.3
                },
                emphasis: {
                    focus: 'adjacency',
                    lineStyle: {
                        width: 10
                    }
                }
            }
        ]
    };
    // console.log(corrChartoption)
    corrChart.setOption(corrChartoption);
});

corrChartoption && corrChart.setOption(corrChartoption);