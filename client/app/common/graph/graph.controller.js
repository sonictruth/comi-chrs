import * as d3 from 'd3';

class GraphController {
  constructor() {
    console.log('init', d3.select);
    d3.select("body").append("span")
    .text("Hello, world!");
  }
}

export default GraphController;
