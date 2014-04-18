'use strict';

angular.module('mean.system').controller('IndexController', ['$scope', '$http', 'Global', function ($scope, $http, Global) {
    $scope.global = Global;
    $scope.storage = [];
    $scope.getStorage = function(){
        var url = 'http://www.reddit.com/r/science/top.json?limit=20';
        $http.get(url)
            .success(function(data){
                var links = data.data.children;
                console.log(links);
                for(var i = 0; i < links.length; i++){
                    var url1 = 'http://www.reddit.com/'+links[i].data.permalink;
                    var url2 = url1.substring(0, url1.length - 1) + ".json?sort=top&limit=10&depth=1";
                    $http.get(url2).success(function(data2){
                        var commentsArray = data2[1].data.children;
                        console.log(commentsArray)
                        for (var i = 0; i < commentsArray.length-1; i++){
                            var comment = commentsArray[i].data.body;
                            $scope.storage.push(comment.split(" ").length);
                        }
                    })
                }
            })
    }; 
    $scope.getNumber = function(){
        console.log(scores)
    };
    var scores = {};
    $scope.getInformation = function(string){
            console.log("hey")
            var url = 'http://www.reddit.com/search.json?q=amazon&limit=100&sort=top&t=month';
            $http.get(url)
                .success(function(data){
                    var links = data.data.children;
                    for(var i = 0; i < links.length; i++){
                        var utcSeconds = links[i].data.created;
                        var score = links[i].data.score;
                        var date = new Date(utcSeconds*1000);
                        var key = date.getDate() +" "+ date.getMonth().toString();
                        if (scores[key]){
                            scores[key] += score;
                        }else{
                            scores[key] = score;
                        }
                    }
                })
        };
    }]);