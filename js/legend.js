function legend() {
  var chart, keys, color;

  function series(selection) {
    selection.each(function(data){
      // Ideally, legends should just be plain data filters
      /*console.log(chart.margin());*/
      var svg = d3.select(this).select("svg"), legendsContainer, 
        chartMargins = chart.margin(), chartWidth = chart.width(),
        chartHeight = chart.height();

      color = d3.scale.ordinal()
        .domain(keys)
        .range(d3.range(keys.length).map(d3.scale.linear()
          .domain([0, keys.length - 1])
          .range(["red", "blue"])
          .interpolate(d3.interpolateLab)));        

      legendsContainer = svg.selectAll("g.legends");
      if (!legendsContainer.node()){
        legendsContainer = svg.append("g").attr("class", "legends").data([keys]);
      }
      legendsContainer.
        attr("transform", "translate(" + chartMargins.left + "," + chartMargins.top + ")");

      var markers = legendsContainer.selectAll("rect.legend").data(function(d){ return d; });
      markers.enter().forEach(addLegend);

    });
  }

  function addLegend () {
    var self = d3.select(arguments[0].parentNode);
    self.append("rect").
      attr("class", "legend").
      attr("width", 10).
      attr("height", 10).
      attr("fill", color).
      attr("transform", function(d, i){
        return "translate(" + ((i + 1) * 10 + (i * d.length * 15) + chart.margin().left) + "," + chart.margin().top + ")"
      });
  }

  series.chart = function(_) {
    if (!arguments.length) return chart;
    chart = _;
    return series;
  };

  series.color = function(_) {
    if (!arguments.length) return color;
    color = _;
    return series;
  };

  series.keys = function(_) {
    if (!arguments.length) return keys;
    keys = _.split(" ");
    return series;
  };

  return series;
}
