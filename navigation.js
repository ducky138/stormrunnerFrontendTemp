var app = angular.module('stormrunnerreporter', []); // injecting stuff into ng-app (stormrunnerreporter)
// google.charts.load('current', {packages: ['corechart', 'line']});
// google.charts.load("visualization", "1", {packages:["corechart"]});


//@TODO MICHELLE PROVIDES
function getBanners(){
  var banners = ["Loblaws", "Fortinos", "Zehrs", "SuperStore"];
  return banners;
}

//@TODO MICHELLE PROVIDES
function getTestNames(banner){
  // GET TESTNAMES BASED ON BANNER PROVIDED
  var testnames = ["test1", "test2", "test3", "test4", "test5"];
  return testnames;
}

//@TODO MICHELLE PROVIDES
function getScriptNames(testname){
  // GET TESTNAMES BASED ON BANNER PROVIDED
  var scriptnames = ["script1", "script2", "script3", "script4", "script5", "script6", "script7"];
  return scriptnames;
}

//@TODO MICHELLE PROVIDES
function getChartData(){

  var json = '{"columns" : ["Transaction_1(atrt)", "Transaction_1(90th)", "Transaction_2(atrt)", "Transaction_2(90th)"], "coordinates": [[601, 1.511, 1.661, 1.611, 1.761], [602, 1.513, 1.677, 1.613, 1.777], [603, 1.513, 1.679, 1.613, 1.779], [604, 1.531, 1.687, 1.631, 1.787], [605, 1.542, 1.701, 1.642, 1.801], [606, 1.574, 1.708, 1.674, 1.808], [607, 1.581, 1.776, 1.681, 1.876], [608, 1.611, 1.782, 1.711, 1.882], [609, 1.615, 1.783, 1.715, 1.883], [610, 1.642, 1.798, 1.742, 1.898]]}';

  var obj = JSON.parse(json);
  var columns = obj.columns;
  var coordinates = obj.coordinates;

  console.log(columns);
  console.log(coordinates[0]);

  drawChart(columns, coordinates);

}


function drawChart(columns, coordinates){

  hideById("chart_div");

  var data = new google.visualization.DataTable();

  data.addColumn('number', 'Run');
  for (i = 0; i < columns.length; i++){
    data.addColumn('number', columns[i]);
  }

  data.addRows(coordinates);

  var options = {
    hAxis: {
      title: 'Run'
    },
    vAxis: {
      title: 'Time'
    }
    ,chartArea:{left:50,top:50,bottom:50} //padding 50px to remove the huge default padding
    ,height: 700
  };

  var chart = new google.visualization.LineChart(document.getElementById('chart_div'));
  chart.draw(data, options);

  google.visualization.events.addListener(chart, 'select', selectHandler);

  function selectHandler(e) {

    // Get the modal
    var modal = document.getElementById('myModal');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // ON CLICK LOGIC HERE
    modal.style.display = "block";

    // console.log(chart.getSelection()[0]);

    selectedRowIndex = chart.getSelection()[0].row;
    selectedColumnIndex = chart.getSelection()[0].column;

    console.log('hihihi ' + data.getRowProperties(selectedRowIndex).row);

    console.log(data.getValue(selectedRowIndex, selectedColumnIndex));

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

  }

}












function getChartColumns(json){
  var obj = JSON.parse(json);
  return columns;
}

function getChartCoordinates(json){
  var obj = JSON.parse(json);
  return columns;
}

function createBannerButton(banner) {
  var btn = document.createElement("BUTTON");
  btn.innerHTML = banner;
  btn.setAttribute('class', 'btn btn-secondary btn-lg bannerbuttons data-toggle="button" aria-pressed="false"');
  btn.setAttribute('banner', banner);
  btn.setAttribute('onclick', "hideById(\'scriptButtons\'); addTestNameButtonsToPage(\'" + banner + "\');"); //hide scriptButtons here because when we click on a new test we don't want the old ones showing
  console.log(btn);
  document.body.appendChild(btn);
}

function addBannerButtonsToPage(arr) {
  for (i = 0; i < arr.length; i++) {
    createBannerButton(arr[i]);
  }
}

function addTestNameButtonsToPage(banner){
  var testnames = getTestNames(banner);
  html = '';
    for (i = 0; i < testnames.length; i++) {
      // html += "<button class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\" \" banner=\"" + banner + "\" testname=\"" + banner + "_test" + "\" onclick=\"addScriptButtonsToPage(\'" + testnames[i] + "\')\">" + banner + testnames[i] + "</button>"
      classAttributeContent = 'class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\"\"';
      bannerAttributeContent = 'banner=\"' + banner + '\"';
      testnameAttributeContent = 'testname=\"' + banner + '_test' + '\"'; // THIS IS JUST A TEST VALUE. CHANGE IT TO REAL VALUE LATER
      onClickAttributeContent = 'onclick=\"addScriptButtonsToPage(\'' + testnames[i] + '\')\"';
      html += '<button' + ' ' + classAttributeContent + ' ' + bannerAttributeContent + ' ' + testnameAttributeContent + ' ' + onClickAttributeContent + '>' + banner + testnames[i] + '</button>';
    }
  console.log("TESTBUTTONS" + html);
  document.getElementById('testButtons').innerHTML= html;
}

function addScriptButtonsToPage(testname){
  var scriptnames = getScriptNames(testname);
  html = '';
    for (i = 0; i < scriptnames.length; i++) {
      // html += "<button class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\" \" banner=\"" + banner + "\" testname=\"" + banner + "_test" + "\" scriptname=\"" + scriptnames[i] + "\">" + banner + scriptnames[i] + "</button>"
      classAttributeContent = 'class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\"\"';
      scriptNameAttributeContent = 'scriptname=\"' +  scriptnames[i] + '\"';
      testnameAttributeContent = 'testname=\"' + testname + '\"';
      onClickAttributeContent = ''; // add method where coordinates will be plotted on graph based on parameters (testname, scriptname)
      html += '<button' + ' ' + classAttributeContent + ' ' + scriptNameAttributeContent + ' ' + testnameAttributeContent + ' ' + onClickAttributeContent +  '>' + testname + scriptnames[i] + '</button>';
    }
  console.log("SCRIPTBUTTONS" + html);
  document.getElementById('scriptButtons').innerHTML= html;
}

function hideById(id){
  document.getElementById(id).innerHTML = "";
}


















// function createTestNameButton(banner) {
//   var btn = document.createElement("BUTTON");
//   btn.innerHTML = banner;
//   btn.setAttribute('class', 'btn btn-secondary divider');
//   btn.setAttribute('banner', banner);
//   btn.setAttribute('onclick', banner);
//   console.log(btn);
//   document.body.appendChild(btn);
// }









// app.controller('BannerCtrl', [
// '$scope'
// function($scope){
//   $scope.posts = posts.posts;
//   $scope.addPost = function(){
//     if(!$scope.title || $scope.title === '') { return; }
//
//     $scope.posts.push({
//       title: $scope.title,
//       link: $scope.link,
//       upvotes: 0,
//       comments: [
//         {author: 'Joe', body: 'Cool post!', upvotes: 0},
//         {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
//       ]
//     });
//     $scope.title = '';
//     $scope.link = '';
//   };
//
//   $scope.incrementUpvotes = function(post) {
//     post.upvotes += 1;
//   };
//
// }]);
//
//
// app.controller('TestNameCtrl', [
// '$scope',
// function($scope){
//
// }]);
