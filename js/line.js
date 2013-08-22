function lineChart() {
  var margin = {top: 20, right: 20, bottom: 20, left: 20},
      width = 760,
      height = 120,
      xValue = function(d) { return d[0]; },
      yValue = function(d) { return d[1]; },
      xScale = d3.scale.linear(),
      yScale = d3.scale.linear(),
      xAxis = d3.svg.axis().scale(xScale).orient("bottom").tickSize(6, 0),
      line = d3.svg.line().x(X).y(Y);

  function chart(selection) {
    selection.each(function(data) {

      // Convert data to standard representation greedily;
      // this is needed for nondeterministic accessors.
      /*data = data.map(function(arr, index) {
        return arr.map(function(d, i){
          return [xValue.call(data, d, i), yValue.call(data, d, i)];
        });
      });*/

      // Update the x-scale.
      xScale
          .domain(extent(data, xValue))
          .range([0, width - margin.left - margin.right]);

      // Update the y-scale.
      yScale
          .domain([0, extent(data, yValue)[1]])
          .range([height - margin.top - margin.bottom, 0]);

      // Select the svg element, if it exists.
      var svg = d3.select(this).selectAll("svg").data([data]);

      var gBase;
      if (!svg.node()){
        // Otherwise, create the skeletal chart.
        gBase = svg.enter().append("svg").append("g").attr("class", "gbase");
      }
      else {
        gBase = svg.select("g.gbase");
      }

      if (!gBase.select(".x.axis").node()){
        gBase.append("g").attr("class", "x axis");
      }

      // Update the outer dimensions.
      svg .attr("width", width)
          .attr("height", height);

      // Update the inner dimensions.
      var g = svg.select("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var gRedrawBase = gBase.selectAll("path.line")
        .data(function(d){ return d; });

      // A path for each set of data to be represented
      gRedrawBase.enter().
        append("path").attr("class", "line");

      gRedrawBase.exit().remove();

      // Update the line path.
      g.selectAll(".line")
          .attr("d", line);

      // Update the x-axis.
      g.select(".x.axis")
          .attr("transform", "translate(0," + yScale.range()[0] + ")")
          .call(xAxis);
    });
  }

  // The x-accessor for the path generator; xScale ∘ xValue.
  function X(d) {
    return xScale(xValue(d));
  }

  // The y-accessor for the path generator; yScale ∘ yValue.
  function Y(d) {
    return yScale(yValue(d));
  }

  function log (argument) {
    console.log(argument);
  }

  // Explicitly find the extent of a one level deep nested array
  function extent (data, accessor) {
    var max = d3.max(data, function(array) {
      return d3.max(array, accessor);
    });
    var min = d3.min(data, function(array) {
      return d3.min(array, accessor);
    });
    return [min, max];
  }

  chart.margin = function(_) {
    if (!arguments.length) return margin;
    margin = _;
    return chart;
  };

  chart.width = function(_) {
    if (!arguments.length) return width;
    width = _;
    return chart;
  };

  chart.height = function(_) {
    if (!arguments.length) return height;
    height = _;
    return chart;
  };

  chart.x = function(_) {
    if (!arguments.length) return xValue;
    xValue = _;
    return chart;
  };

  chart.y = function(_) {
    if (!arguments.length) return yValue;
    yValue = _;
    return chart;
  };

  return chart;
}
