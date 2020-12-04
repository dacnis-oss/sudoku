'use strict';
const Chart = require('chart.js');
fetch('http://localhost:3000/api/v1/time').then((res)  => {
  res.json().then((jsonStr) => {
    jsonStr = jsonStr.map(str => parseInt(str, 10));
    let numArr = Array.from(jsonStr).sort((a, b) => a - b);
    console.log(numArr);
    let max = Number.MIN_SAFE_INTEGER;
    let map = new Map();
    map.set(0, 0);
    numArr.forEach((e) => {
      if(map.has(e)){
        map.set(e, map.get(e) + 1)
      }else{
        map.set(e, 1);
      }
    });
    console.log(map.values());
    // console.log(jsonStr);
    const maxNum = Math.max(...jsonStr);
    const index = [...Array(30).keys()];
    const ctx = document.getElementById('ctx');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from(map.keys()),
        datasets: [
          {
            data: Array.from(map.values()),
            backgroundColor: "rgba(219,39,91)"
          }
        ]
      }
    });

    // google.charts.load('current', {'packages': ['corechart']});
    // google.charts.setOnLoadCallback(drawChart);

    // function drawChart(){
    //   jsonStr = jsonStr.map(j => parseInt(j, 10));
    //   const maxNum = Math.max(...jsonStr);
    //   const index = [...Array(maxNum).keys()].map(i => ++i);
      
    //   const data = new google.visualization.DataTable();
    //   data.addColumn('number', 'Slices');
    //   data.addColumn('number', 'Topping')
    //   data.addRows([10,20], [20, 20]);

    //   const options = {'title' : 'sudoku time chart',
    //                    'width': 400,
    //                   'height': 300};
    //   const chart =  new google.visualization.PieChart(document.getElementById('chart'));
      
    //   chart.draw(data, options);
    // }
  });
});

