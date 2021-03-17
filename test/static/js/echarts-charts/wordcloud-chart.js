var chart4 = echarts.init(document.getElementById('main4'));
var word_data = {
    "粉絲團": "1",
    "葡萄酒": "1",
    "喝": "1",
    "購買": "1",
    "直接": "1",
    "請": "1",
    "香": "1",
    "夢幻": "1",
    "不甜": "1",
    "完全": "1",
    "微酸": "1",
    "濃郁": "1",
    "香甜": "1",
    "酒精味": "1",
    "很足": "1",
    "香氣": "1",
    "時": "1",
    "開瓶": "1",
    "很漂亮": "1",
    "濃濃": "1"
}
var new_word_data = []
for (var key in word_data){
    new_word_data.push({name: key,value: parseInt(word_data[key])})
}

console.log(new_word_data)
var option4 = {
    tooltip: {},
    series: [ {
        type: 'wordCloud',
        gridSize: 1,
        sizeRange: [12, 50],
        rotationRange: [-90, 90],
        shape: 'pentagon',
        width: 400,
        height: 200,
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
        data: new_word_data
    } ]
};

chart4.setOption(option4);

window.onresize = chart4.resize;