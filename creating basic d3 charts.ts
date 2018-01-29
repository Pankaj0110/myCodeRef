import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import 'd3-selection-multi';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  private barData = [10,20,30,40,50];

  @ViewChild('chart') chartContainer: ElementRef;
  @ViewChild('bars') chartBar : ElementRef;

  @ViewChild('barchart') barChart : ElementRef;
  @ViewChild('linechart') lineChart: ElementRef;
  @ViewChild('scatterplot') scatterPlot : ElementRef;
  
  ngOnInit(){
    this.drawBasics();
    this.drawBars();
    this.drawBarChart();
    this.drawLine();
    this.drawScatterPlot();
  }

  ngOnChanges(){
    /* console.log("changes")
    this.drawScatterPlot(); */
  }

  private drawBasics(){
    let container = this.chartContainer.nativeElement;
    let svg = d3.select(container)
              .append('svg')
              .attr("height",200)
              .attr("width",200);
    
    svg.append("rect")
            . attr('x',50).attr("y", 70)
             .attr("height",100)
             .attr("width",100)
             .style("fill",'blue');

  /** creating a circle */

  svg.append("circle")
    .attr("cx",100)
    .attr("cy",100)
    .attr('r',20)
    .style('fill',"red")
  }

  private drawBars(){
    let width = 300;
    let padding = 20;
    let height = 200;
    let barData = [100,20,38,40,50];
    let barChart  = this.chartBar.nativeElement;

    let svg = d3.select(barChart)
                .append('svg')
                .attr("height",height)
                .attr("width",width)
                .attr("x",0).attr("y",10)
    let graph = svg.selectAll('rect')
                    .data(this.barData)
                    .enter()
                    .append('rect')
                    .attr("x", function(d, i){
                      return i * (width/barData.length);
                    })
                    .attr("y", function(d, i){
                      return height - d*3;
                    })
                    .attr("height",function(d){
                      return d*4;
                    })
                    .attr("width",function(d, i ){
                      return width/barData.length - padding;
                    }).text(function(d){return d  })                    
                    .style("fill",'#CFCFCF')
                    
  }

  /*** Basic charting */
  public drawBarChart(){
    let h = 300;
    let w = 300;
    let p = 10;
    let data = [5,10,15,20,25,30];
    let container = this.barChart.nativeElement;
    let svg = d3.select(container)
                .append('svg')
                .attr("height",h)
                .attr("width",w);
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attrs({
              x: function(d,i){return i * (w/data.length);},
              y: function(d){return h-d*4;},
              width:  w/data.length - p,
              height: function(d){return d*4;},
              fill:function(d){return "RGB(0,"+(d*10)+",0)"}
            });

    /** adding text on bar graph */
    svg.selectAll('text')
       .data(data)
       .enter()
       .append('text')
       .text(function(d){return d})
       .attrs({
         "text-anchor":"middle",
         x: function(d, i){
           return i* (w/data.length)+(w/data.length-p)/2
         },
         y: function(d, i){ return (h-d*4)-5}
       })
  }

  /** line chart */
  public drawLine(){
    let salesData = [
      {"month":10, "sales":20},
      {"month":20, "sales":5},
      {"month":30, "sales":2},
      {"month":40, "sales":27},
      {"month":50, "sales":43},
      {"month":60, "sales":12},
      {"month":70, "sales":28},
      {"month":80, "sales":18},
      {"month":90, "sales":53},
      {"month":100, "sales":21},
      {"month":120, "sales":28},
      {"month":130, "sales":8},
    ]

    let lineFunction = d3.line()
                         .x(function(d:any){return d.month*3})
                         .y(function(d:any){return  300 - d.sales*3})
                         .curve(d3.curveLinear);

    let container = this.lineChart.nativeElement;
    console.log(container)
    let svg = d3.select(container)
                .append('svg')
                .attr("height",300)
                .attr("width", 400);

    let viz = svg.append("path")
                .attrs({
                  d:lineFunction(salesData),
                  "stroke":"purple",
                  "stroke-width":2,
                  "fill":'none'
                });
    svg.selectAll('text').
    data(salesData)
    .enter()
    .append('text')
    .text(function(d){
      return d.sales;
    })
    .attrs({
      "text-anchor":"start",
         x: function(d:any){console.log(d); return d.month*3-20 },
         y: function(d:any){return  300 - d.sales*3},
        "dy":".35em",
        "font-family":"sans-serif",
        "font-size":"12px"
    })
    }

    /** Scatter plot */
    // binding data using textbox
   public myData = 20;
    private drawScatterPlot(){
      console.log("Draw ssvatter plot"/* , this.salesData */)
      let salesData = [
        {"month":10, "sales":20},
        {"month":20, "sales":5},
        {"month":30, "sales":2},
        {"month":40, "sales":27},
        {"month":50, "sales":43},
        {"month":60, "sales":12},
        {"month":70, "sales":this.myData},
        {"month":80, "sales":18},
        {"month":90, "sales":53},
        {"month":100, "sales":21},
        {"month":120, "sales":28},
        {"month":130, "sales":8},
      ];

      let width = 400;
      let height = 400;

      let container = this.scatterPlot.nativeElement;

      //adding svg
      let svg = d3.select(container)
                  .append('svg')
                  .attrs({
                    "height":height,
                    "width":width
                  })
      
      //adding circles

      svg.selectAll("circle")
         .data(salesData)
         .enter()
         .append("circle")
         .attrs({
           "cx":function(d, i){return d.month*3},
           "cy":function(d){return height-d.sales*3},
           "r":5,
           "fill":"#cfcfcf"
         })
      
      // line function
      let lineFunction = d3.line()                            
                            .x(function(d){return d.month*3})
                            .y(function(d){return height- d.sales*3})
                            .curve(d3.curveLinear);
      //labelfunction
      let showLabel= function(dataset, d, col, type){
        let min = d3.min(function(data){ return d[col]});
        let max = d3.max(function(data){ return d[col]});
        if(min==d && max==d && type=='minmax'){
          return d;
        }else if(type=='all'){
          return d;
        }
      }
      svg.append("path")
          .attrs({
            d:lineFunction(salesData),
            "stroke":"purple",
            "stroke-width":2,
            "fill":"none"
          })

      svg.selectAll("text")
          .data(salesData)
          .enter()
          .append("text")
          .text(function(d){
            //return showLabel(salesData, d.sales,"sales",'minmax');
            return d.sales;
          })
          .attrs({
            x:function(d){return d.month*3-25},
            y:function(d){return height - d.sales*3},
            "text-anchor":"start",
            "dy":".35em",
            "font-family":"sans-serif",
            "font-size":"12px"
          })
    }

    
    
}
