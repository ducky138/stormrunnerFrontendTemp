google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBasic);

function drawBasic() {

      // console.log(columns);
      // console.log(coordinates);

      var data = new google.visualization.DataTable();

      // data.addColumn('number', 'Run');
      // for (i = 0; i < columns.length; i++){
      //   data.addColumn('number', columns[i]);
      // }

      data.addColumn('number', 'Run');
      data.addColumn('number', 'Transaction_1 (atrt)');
      data.addColumn('number', 'Transaction_1 (90th)');

      data.addRows(
        // coordinates
        [
        [0, 0, 0],    [1, 10, 5],   [2, 23, 15],  [3, 17, 9],   [4, 18, 10],  [5, 9, 5],
        [6, 11, 3],   [7, 27, 19],  [8, 33, 25],  [9, 40, 32],  [10, 32, 24], [11, 35, 27],
        [12, 30, 22], [13, 40, 32], [14, 42, 34], [15, 47, 39], [16, 44, 36], [17, 48, 40],
        [18, 52, 44], [19, 54, 46], [20, 42, 34], [21, 55, 47], [22, 56, 48], [23, 57, 49],
        [24, 60, 52], [25, 50, 42], [26, 52, 44], [27, 51, 43], [28, 49, 41], [29, 53, 45],
        [30, 55, 47], [31, 60, 52], [32, 61, 53], [33, 59, 51], [34, 62, 54], [35, 65, 57],
        [36, 62, 54], [37, 58, 50], [38, 55, 47], [39, 61, 53], [40, 64, 56], [41, 65, 57],
        [42, 63, 55], [43, 66, 58], [44, 67, 59], [45, 69, 61], [46, 69, 61], [47, 70, 62],
        [48, 72, 64], [49, 68, 60], [50, 66, 58], [51, 65, 57], [52, 67, 59], [53, 70, 62],
        [54, 71, 63], [55, 72, 64], [56, 73, 65], [57, 75, 67], [58, 70, 62], [59, 68, 60],
        [60, 64, 56], [61, 60, 52], [62, 65, 57], [63, 67, 59], [64, 68, 60], [65, 69, 61],
        [66, 70, 62], [67, 72, 64], [68, 75, 67], [69, 80, 72]
      ]
    );

      var options = {
        hAxis: {
          title: 'Run'
        },
        vAxis: {
          title: 'Time'
        }
        ,chartArea:{left:50,top:50,bottom:50} //padding 50px to remove the huge default padding
        ,height: 700
        // ,legend: {position: 'none'}

      };

      var chart = new google.visualization.LineChart(document.getElementById('chart_div'));

      chart.draw(data, options);

      // console.log(data.getValue());

      google.visualization.events.addListener(chart, 'select', selectHandler);

      function selectHandler(e) {

        // console.log(chart.getSelection()[0]);
        // console.log(chart.getSelection()[0].row);

// -------------------------------------------------------------------------//

        // Get the modal
        var modal = document.getElementById('myModal');

        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];

        // ON CLICK LOGIC HERE
        modal.style.display = "block";
        document.getElementById('modalHeaderText').innerHTML= "Run " + chart.getSelection()[0].row;
        document.getElementById('modalBodyText').innerHTML='<a target="_blank" href="https://stormrunner-load.saas.hpe.com/run-overview/' + chart.getSelection()[0].row + '/dashboard/?TENANTID=911414929&projectId=1">https://stormrunner-load.saas.hpe.com/run-overview/' + chart.getSelection()[0].row + '/dashboard/?TENANTID=911414929&projectId=1</a>'

        // When the user clicks on <span> (x), close the modal
        span.onclick = function() {
            modal.style.display = "none";
            chart.draw(data, options);
        }

        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
                chart.draw(data, options);
            }
        }

// -------------------------------------------------------------------------//



        // https://stormrunner-load.saas.hpe.com/run-overview/660/dashboard/?TENANTID=911414929&projectId=1
        // var win = window.open('https://www.google.com', '_blank');
        // win.focus();
      }

    }
