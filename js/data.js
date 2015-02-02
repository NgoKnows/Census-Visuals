var getRaceDict = function (data, is1990) {
    var stateRace = {};
    if (is1990) {
        var totalrace = {
            White: 0,
            Black: 0,
            "American Indian": 0,
            Asian: 0,
            Other: 0
        }
        var races = ["White", "Black", "American Indian", "Asian", "Other"];

    } else {
        var totalrace = {
            White: 0,
            Black: 0,
            "American Indian": 0,
            Asian: 0,
            "Pacific Islander": 0,
            Other: 0,
            "Two or more": 0
        }
        var races = ["White", "Black", "American Indian", "Asian", "Pacific Islander", "Other", "Two or more"];
    }
    for (var i = 1; i < 52; i++) {
        var race = {};
        for (var j = 0; j < races.length; j++) {
            var pop = parseInt(data[i][j]);
            race[races[j]] = pop;
            totalrace[races[j]] += pop;
        }
        stateRace[states[i - 1]] = race;
    }
    stateRace["total"] = totalrace;
    //console.log(stateRace);
    return stateRace;

}

var getGenderDict = function (data, year) {
    var stateGender = {};
    var totals = {
        male: 0,
        female: 0,
        year: year
    };
    for (var i = 1; i < 52; i++) {
        var gender = {};
        var males = parseInt(data[i][0]);
        if (year === 2010) {
            var females = parseInt(data[i][1]) - males;
        } else {
            var females = parseInt(data[i][1]);
        }
        gender["male"] = males;
        gender["female"] = females;
        gender["year"] = year
        gender["values"] = [{
            name: "male",
            value: males
            }, {
            name: "female",
            value: females
            }]
        totals["male"] += males;
        totals["female"] += females;
        stateGender[states[i - 1]] = gender;

    }
    totals["year"] = year;
    totals["values"] = [{
        name: "male",
        value: totals["male"]
            }, {
        name: "female",
        value: totals["female"]
            }];
    stateGender["total"] = totals;
    //console.log(stateGender);
    return stateGender;
}

var getAsianDict = function (data, year) {
    totalRace = {}
    var stateRace = {};
    if (year === 1990) {
        var races = ["American Indian", "Eskimo", "Aleut", "Chinese", "Filipino", "Japanese", "Asian Indian", "Korean", "Vietnamese", "Cambodian", "Hmong", "Laotian", "Thai", "Other"];
        races.forEach(function (race) {
            totalRace[race] = 0;
        })

    } else if (year === 2000) {
        var races = ["Asian Indian", "Bangladeshi", "Cambodian", "Chinese", "Filipino", "Hmong", "Indonesian", "Japanese", "Korean", "Laotian", "Malaysian", "Pakistani", "Sri Lankan", "Taiwanese", "Thai", "Vietnamese", "Other"];
        races.forEach(function (race) {
            totalRace[race] = 0;
        })
    } else {
        var races = ["Asian Indian", "Bangladeshi", "Bhutanese", "Cambodian", "Chinese", "Filipino", "Hmong", "Indonesian", "Japanese", "Korean", "Laotian", "Malaysian", "Nepalese", "Pakistani", "Sri Lankan", "Taiwanese", "Thai", "Vietnamese", "Other"];;
        races.forEach(function (race) {
            totalRace[race] = 0;
        })
    }
    for (var i = 1; i < 52; i++) {
        var race = {};
        for (var j = 0; j < races.length; j++) {
            var pop = parseInt(data[i][j]);
            race[races[j]] = pop;
            totalRace[races[j]] += pop;
        }
        stateRace[states[i - 1]] = race;
    }
    stateRace["total"] = totalRace;
    //console.log(stateRace);
    return stateRace;
}
