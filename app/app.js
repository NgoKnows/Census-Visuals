"use strict"

var baselink1990 = "http://api.census.gov/data/1990/sf1?key=1c449fba433e3ded25970e0c260091f7af88a0f8"
var baselink2000 = "http://api.census.gov/data/2000/sf1?key=1c449fba433e3ded25970e0c260091f7af88a0f8"
var baselink2010 = "http://api.census.gov/data/2010/sf1?key=1c449fba433e3ded25970e0c260091f7af88a0f8"
var states = ["Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
"District of Columbia", "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
"Kansas", "Kentucky", "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
"Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
"New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
"South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
"West Virginia", "Wisconsin", "Wyoming"];

angular.module('censusVisuals', [
])
    .controller('ProjectController', function ($scope) {
        $scope.baselink = "http://api.census.gov/data/2000/sf1?key=1c449fba433e3ded25970e0c260091f7af88a0f8"
    });
console.log('it works');

//get men, women population 1990
var gender1990;
var gender2000;
var gender2010;
$.getJSON(baselink1990 + "&get=P0050001,P0050002&for=state:*", function (data) {
    gender1990 = data;
});
$.getJSON(baselink2000 + "&get=P012002,P012026&for=state:*", function (data) {
    gender2000 = data;
});
$.getJSON(baselink2010 + "&get=P0120002,P012A026&for=state:*", function (data) {
    gender2010 = data;
});
var stateGender = {};
var totals = [0,0];
setTimeout(function () {
    for (var i = 1; i < 52; i++) {
        var gender = [];
        var males = parseInt(gender1990[i][0]);
        var females = parseInt(gender1990[i][1]);
        gender[0] = males;
        gender[1] = females;
        totals[0] += males;
        totals[1] += females;
        stateGender[states[i]] = gender;
    }
    console.log(stateGender);
    console.log(totals);
}, 1000);

