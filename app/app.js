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
"West Virginia", "Wisconsin", "Wyoming", "United States"];

var genderDict1990;
var genderDict2000;
var genderDict2010;
$.getJSON(baselink1990 + "&get=P0050001,P0050002&for=state:*", function (data) {
    genderDict1990 = getGenderDict(data, 1990);
});

$.getJSON(baselink2000 + "&get=P012002,P012026&for=state:*", function (data) {
    genderDict2000 = getGenderDict(data, 2000);
});

$.getJSON(baselink2010 + "&get=P0120002,P0120001&for=state:*", function (data) {
    genderDict2010 = getGenderDict(data, 2010);
});

var raceDict1990;
var raceDict2000;
var raceDict2010;
$.getJSON(baselink1990 + "&get=P0060001,P0060002,P0060003,P0060004,P0060005&for=state:*", function (data) {
    raceDict1990 = getRaceDict(data, true);
});

$.getJSON(baselink2000 + "&get=P003003,P003004,P003005,P003006,P003007,P003008,P003009&for=state:*", function (data) {
    raceDict2000 = getRaceDict(data, false);
});

$.getJSON(baselink2010 + "&get=P0030002,P0030003,P0030004,P0030005,P0030006,P0030007,P0030008&for=state:*", function (data) {
    raceDict2010 = getRaceDict(data, false);
});

var asianDict1990;
var asianDict2000;
var asianDict2010;
$.getJSON(baselink1990 + "&get=P0070003,P0070004,P0070005,P0070006,P0070007,P0070008,P0070009,P0070010,P0070011,P0070012,P0070013,P0070014,P0070015,P0070016&for=state:*", function (data) {
    asianDict1990 = getAsianDict(data, 1990);
});
$.getJSON(baselink2000 + "&get=PCT007002,PCT007003,PCT007004,PCT007005,PCT007006,PCT007007,PCT007008,PCT007009,PCT007010,PCT007011,PCT007012,PCT007013,PCT007014,PCT007015,PCT007016,PCT007017,PCT007019&for=state:*", function (data) {
    asianDict2000 = getAsianDict(data, 2000);
});
$.getJSON(baselink2010 + "&get=PCT0070002,PCT0070003,PCT0070004,PCT0070005,PCT0070006,PCT0070007,PCT0070008,PCT0070009,PCT0070010,PCT0070011,PCT0070012,PCT0070013,PCT0070014,PCT0070015,PCT0070016,PCT0070017,PCT0070018,PCT0070019,PCT0070020,PCT0070022&for=state:*", function (data) {
    asianDict2010 = getAsianDict(data, 2010);
});

var asianDictList;
var genderDictList;
var raceDictList;
setTimeout(function () {
    asianDictList = [asianDict1990, asianDict2000, asianDict2010];
    genderDictList = [genderDict1990, genderDict2000, genderDict2010];
    raceDictList = [raceDict1990, raceDict2000, raceDict2010];
    createGraph(genderDictList, "total");
}, 300);


angular.module('censusVisuals', [
])
    .controller('VisualsController', function ($scope) {
        $scope.states = states;
        $scope.button1 = "All States"
        $scope.stateSwitch = function (state) {
            createGraph(genderDictList, state);
        }
        $scope.changeButtonText = function (button, state) {
            $scope[button] = state;
        }
        $scope.switchGenderGraph = function (button, state) {
            $scope.changeButtonText(button, state);
            $scope.stateSwitch(state);
        }
    });

//get men, women population 1990, 2000, 2010
