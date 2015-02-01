var formatData = function (data, state) {
    formattedData = [];
    for (var i = 0; i < data.length; i++) {
        console.log(data);
        formattedData.push(data[i][state]);
    }
    return formattedData;
}
var createGraph = function (unformattedData, state) {
    var data = formatData(unformattedData, state);
    console.log(data);
    var margin = {
        top: 50,
        right: 20,
        bottom: 50,
        left: 125
    }
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    var x0 = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    var x1 = d3.scale.ordinal();
    var y = d3.scale.linear()
        .range([height, 0]);
    var color = d3.scale.ordinal()
        .range(["#446CB3", "#F1A9A0"]);
    var xAxis = d3.svg.axis()
        .scale(x0)
        .orient("bottom");
    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");
    var svg = d3.select("#graph").append("svg")
        .attr("width", width + margin.left + margin.right + 50)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var catNames = d3.keys(data[0]).filter(function (key) {
        return key !== "year" && key !== "values";
    });
    x0.domain(data.map(function (d) {
        return d.year;
    }));
    x1.domain(catNames).rangeRoundBands([0, x0.rangeBand()]);
    y.domain([0, d3.max(data, function (d) {
            if (d.male > d.female) {
                return d.male;
            } else {
                return d.female;
            }
        })
    ]);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")
        .text("Here");

    var years = svg.selectAll(".state")
        .data(data)
        .enter().append("g")
        .attr("class", "g")
        .attr("transform", function (d) {
            return "translate(" + x0(d.year) + ",0)";
        });
    years.selectAll("rect")
        .data(function (d) {
            return d.values;
        })
        .enter().append("rect")
        .attr("width", x1.rangeBand())
        .attr("x", function (d) {
            return x1(d.name);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .style("fill", function (d) {
            return color(d.name);
        })

    var legend = svg.selectAll(".legend")
        .data(catNames.slice().reverse())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", function (a, i) {
            return "translate(0," + i * 20 + ")";
        });
    legend.append("rect")
        .attr("x", width + 50)
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", color);

    legend.append("text")
        .attr("x", width + 40)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "end")
        .text(function (d) {
            return d;
        });
};
