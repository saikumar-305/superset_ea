import React, { useEffect } from "react";
import * as venn from "venn.js";
import * as d3 from "d3";

const VennDiagram = ({ vennReport, setSelectedSegments, selectedSegments }) => {
  // console.log(vennReport);
  // const setDefaultSegment = () => {
  //   if (!vennReport) {
  //     return undefined;
  //   } else {
  //     return vennReport[0].sets.join(",");
  //   }
  // };
  // if(!selectedSegments) {

  // }
  // let selectedSegments = setDefaultSegment();
  let clickedNode = null;
  const colours = ["#1f77b4", "#ff7f0e", "#2ca02c"];

  function createVenn(width, height) {
    var chart = venn.VennDiagram().width(width).height(height).fontSize("16px");
    d3.select("#venn").datum(vennReport).call(chart);
    var tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "venntooltip")
      .attr("id", "venntooltip");

    d3.select("#venn")
      .selectAll("path")
      .style("stroke-opacity", 0)
      .style("stroke", "#ee6c85")
      .style("stroke-width", 4)
      .style("fill-opacity", 0.8)
      .style("fill", function (d, i) {
        return colours[i];
      });
    d3.select("#venn").selectAll("text").remove();
    // d3.selectAll("#venntooltip").remove();

    d3.selectAll("g")
      .on("mouseover", function (d, i) {
        var node = d3.select(this).transition();
        node.select("text").style("font-size", "18px");
        // Display a tooltip with the current size
        tooltip.transition().duration(400).style("opacity", 0.7);
        tooltip.text(d.segmentationLabel + " (" + d.size + ")");
        // highlight the current path
        var selection = d3.select(this).transition("tooltip").duration(400);
        selection.select("path").style("stroke-opacity", 1);
      })
      .on("mousemove", function () {
        tooltip
          .style("left", d3.event.pageX + "px")
          .style("top", d3.event.pageY - 28 + "px");
      })
      .on("mouseout", function (d, i) {
        var node = d3.select(this).transition();
        node.select("text").style("font-size", "16px");
        tooltip.transition().duration(400).style("opacity", 0);
        if (clickedNode != d) {
          var selection = d3.select(this).transition("tooltip").duration(400);
          selection.select("path").style("stroke-opacity", 0);
        }
      })
      .on("click", function (d) {
        try {
          d3.select("#venn").selectAll("path").style("stroke-opacity", 0);
          clickedNode = d;
          selectedSegments = d.sets.join(",");
          d3.select(this).select("path").style("stroke-opacity", 1);
          setSelectedSegments(d.sets.join(","));
        } catch (e) {
          console.error(e);
        }
      });
  }

  function createVennLegend() {
    // Venn Legend Code
    var SVG = d3.select("#vennLegend");
    var keys = new Array();
    for (var i = 0; i < vennReport.length - 1; i++) {
      keys.push(vennReport[i].segmentationLabel);
    }
    var size = 20;
    SVG.selectAll("mydots")
      .data(keys)
      .enter()
      .append("rect")
      .attr("x", 25)
      .attr("y", function (d, i) {
        return 25 + i * (size + 5);
      })
      .attr("width", size)
      .attr("height", size)
      .style("fill", function (d, i) {
        return colours[i];
      })
      .style("fill-opacity", "0.8");

    // Add one dot in the legend for each name.
    SVG.selectAll("mylabels")
      .data(keys)
      .enter()
      .append("text")
      .attr("x", 25 + size * 1.2)
      .attr("y", function (d, i) {
        return 25 + i * (size + 5) + size / 2;
      })
      .text(function (d) {
        console.log(d);
        return d;
      })
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle");
  }

  useEffect(() => {
    if (vennReport) {
      createVenn(350, 250);
      createVennLegend();
    }
    // return () => {
    //   cleanup
    // }
  }, [vennReport]);

  return (
    <>
      <div>
        <svg id="vennLegend" height="100" width="400"></svg>
      </div>
      <div id="venn"></div>
    </>
  );
};

export default VennDiagram;
