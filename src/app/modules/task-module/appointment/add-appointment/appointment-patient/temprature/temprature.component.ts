import { Component, ElementRef, OnInit, AfterViewInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import * as d3 from 'd3';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-temprature',
  templateUrl: './temprature.component.html',
  styleUrls: ['./temprature.component.scss']
})
export class TempratureComponent implements OnInit, AfterViewInit {

  @ViewChild("thermometerChart") element!: ElementRef;
  batteryPower = 4;
  htmlElement!: HTMLElement;

  chartdata = [170, 50, 40, 30, 60, 50, 85, 80, 120, 120, 160, 150];
  constructor(public api:ApiService) {

    this.api.temperature1.subscribe((response)=>{
      //console.log("response:any",response);
      this.api.temperature = response;
      d3.select( this.element.nativeElement).selectAll("*").remove();
      this.createSvg();
    })
  }


  data = [
    { "Framework": "Vue", "Stars": "166443", "Released": "2014" },
    { "Framework": "React", "Stars": "150793", "Released": "2013" },
    { "Framework": "Angular", "Stars": "62342", "Released": "2016" },
    { "Framework": "Backbone", "Stars": "27647", "Released": "2010" },
    { "Framework": "Ember", "Stars": "21471", "Released": "2011" },
  ];
  svg: any;
  margin = 50;
  width = 100;
  height = 200;

  createSvg() {

    this.htmlElement = this.element.nativeElement;
    var svg = d3.select(this.htmlElement)
      .append("svg")
      .attr("width", this.width)
      .attr("height", this.height);

    var defs = svg.append("defs");
    var bulbGradient = defs.append("radialGradient")
      .attr("id", "bulbGradient")
      .attr("cx", "50%")
      .attr("cy", "50%")
      .attr("r", "50%")
      .attr("fx", "50%")
      .attr("fy", "50%");

    bulbGradient.append("stop")
      .attr("offset", "0%")
      .style("stop-color", "rgb(230, 200, 200)");
    bulbGradient.append("stop")
      .attr("offset", "90%")
      .style("stop-color", "rgb(230,0,0)");
    var topY = 5;
    var bulbRadius = 20
    var tubeWidth = 21.5;
    var tubeBorderWidth = 1;
    var tubeBorderColor = "#999999";
    var width = 80;
    var height = 180;
    var maxTemp = 108;
    var minTemp = 94;
    var currentTemp = this.api.temperature;
    var bottomY = height - 5;
    var topY = 5;
    var bulb_cy = bottomY - bulbRadius;
    var bulb_cx = width / 2;
    var top_cy = topY + tubeWidth / 2;
    svg.append("circle")
      .attr("r", tubeWidth / 2)
      .attr("cx", width / 2)
      .attr("cy", top_cy)
      .style("fill", "#FFFFFF")
      .style("stroke", tubeBorderColor)
      .style("stroke-width", tubeBorderWidth + "px");

    // Main bulb of thermometer (empty), white fill
    svg.append("circle")
      .attr("r", bulbRadius)
      .attr("cx", bulb_cx)
      .attr("cy", bulb_cy)
      .style("fill", "#FFFFFF")
      .style("stroke", tubeBorderColor)
      .style("stroke-width", tubeBorderWidth + "px");


    // Rect element for tube fill colour
    svg.append("rect")
      .attr("x", width / 2 - (tubeWidth - tubeBorderWidth) / 2)
      .attr("y", top_cy)
      .attr("height", bulb_cy - top_cy)
      .attr("width", tubeWidth - tubeBorderWidth)
      .style("shape-rendering", "crispEdges")
      .style("fill", "#FFFFFF")
      .style("stroke", "#999999");
      var step = 5;

      // Determine a suitable range of the temperature scale
      var domain = [
        step * Math.floor(minTemp / step),
        step * Math.ceil(maxTemp / step)
        ];

      if (minTemp - domain[0] < 0.66 * step)
        domain[0] -= step;

      if (domain[1] - maxTemp < 0.66 * step)
        domain[1] += step;


      // D3 scale object
      var scale = d3.scaleLinear()
        .range([bulb_cy - bulbRadius/2 - 8.5, top_cy])
        .domain(domain);


      // Max and min temperature lines
      [minTemp, maxTemp].forEach(function(t) {

        var isMax = (t == maxTemp),
            label = (isMax ? "max" : "min"),
            textCol = (isMax ? "rgb(230, 0, 0)" : "rgb(0, 0, 230)"),
            textOffset = (isMax ? -4 : 4);

        svg.append("line")
          .attr("id", label + "Line")
          .attr("x1", width/2 - tubeWidth/2)
          .attr("x2", width/2 + tubeWidth/2 + 22)
          .attr("y1", scale(t))
          .attr("y2", scale(t))
          .style("stroke", tubeBorderColor)
          .style("stroke-width", "1px")
          .style("shape-rendering", "crispEdges");

        svg.append("text")
          .attr("x", width/2 + tubeWidth/2 + 2)
          .attr("y", scale(t) + textOffset)
          .attr("dy", isMax ? null : "0.75em")
          .text(label)
          .style("fill", textCol)
          .style("font-size", "11px")

      });


      var tubeFill_bottom = bulb_cy,
          tubeFill_top = scale(currentTemp);

      // Rect element for the red mercury column
      svg.append("rect")
        .attr("x", width/2 - (tubeWidth - 10)/2)
        .attr("y", tubeFill_top)
        .attr("width", tubeWidth - 10)
        .attr("height", tubeFill_bottom - tubeFill_top)
        .style("shape-rendering", "crispEdges")
        .style("fill", "rgb(230,0,0)")


      // Main thermometer bulb fill
      svg.append("circle")
        .attr("r", bulbRadius - 6)
        .attr("cx", bulb_cx)
        .attr("cy", bulb_cy)
        .style("fill", "url(#bulbGradient)")
        .style("stroke", "rgb(230,0,0)")
        .style("stroke-width", "2px");


      // Values to use along the scale ticks up the thermometer
      var tickValues = d3.range((domain[1] - domain[0])/step + 1).map(function(v) { return domain[0] + v * step; });


      // D3 axis object for the temperature scale
      var axis = d3.axisLeft(scale)
        .scale(scale)
        .tickSizeInner(7)
        .tickSizeOuter(0)
        .tickValues(tickValues)



      // Add the axis to the image
      var svgAxis = svg.append("g")
        .attr("id", "tempScale")
        .attr("transform", "translate(" + (width/2 - tubeWidth/2) + ",0)")
        .call(axis);

      // Format text labels
      svgAxis.selectAll(".tick text")
          .style("fill", "#777777")
          .style("font-size", "10px");

      // Set main axis line to no stroke or fill
      svgAxis.select("path")
        .style("stroke", "none")
        .style("fill", "none")

      // Set the style of the ticks
      svgAxis.selectAll(".tick line")
        .style("stroke", tubeBorderColor)
        .style("shape-rendering", "crispEdges")
        .style("stroke-width", "1px");

  }
  ngOnInit(): void {
  }
  ngAfterViewInit() {
    this.createSvg();
    this.drawBars(this.data);
  }

  private drawBars(data: any[]): void {
    // Create the X-axis band scale

    const x = d3.scaleBand()
      .range([0, this.width])
      .domain(data.map(d => d.Framework))
      .padding(0.2);

    //console.log("data", this.height);
    // Draw the X-axis on the DOM
    this.svg.append("g")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Create the Y-axis band scale
    const y = d3.scaleLinear()
      .domain([0, 200000])
      .range([this.height, 0]);

    // Draw the Y-axis on the DOM
    this.svg.append("g")
      .call(d3.axisLeft(y));

    // Create and fill the bars
    this.svg.selectAll("bars")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d: any) => x(d.Framework))
      .attr("y", (d: any) => y(d.Stars))
      .attr("width", x.bandwidth())
      .attr("height", (d: any) => this.height - y(d.Stars))
      .attr("fill", "#d04a35");
  }

}
