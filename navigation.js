var app = angular.module('stormrunnerreporter', []); // injecting stuff into ng-app (stormrunnerreporter)

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

function addBannerButtonsToPage(arr) {
  for (i = 0; i < arr.length; i++) {
    createBannerButton(arr[i]);
  }
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

function addTestNameButtonsToPage(banner){
  var testnames = getTestNames(banner);
  html = '';
    for (i = 0; i < testnames.length; i++) {
      // removed divider class
      html += "<button class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\" \" banner=\"" + banner + "\" testname=\"" + banner + "_test" + "\" onclick=\"addScriptButtonsToPage(\'" + testnames[i] + "\')\">" + banner + testnames[i] + "</button>"
    }
  console.log("TESTBUTTONS" + html);
  document.getElementById('testButtons').innerHTML= html;
}

function addScriptButtonsToPage(testname){
  var scriptnames = getScriptNames(testname);
  html = '';
    for (i = 0; i < scriptnames.length; i++) {
      // removed divider class
      // html += "<button class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\" \" banner=\"" + banner + "\" testname=\"" + banner + "_test" + "\" scriptname=\"" + scriptnames[i] + "\">" + banner + scriptnames[i] + "</button>"
      html += "<button class=\"btn btn-secondary btn-lg data-toggle=\"button\" aria-pressed=\"false\" scriptname=\"" +  scriptnames[i] + "\">" + testname + scriptnames[i] +"</button>"
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
