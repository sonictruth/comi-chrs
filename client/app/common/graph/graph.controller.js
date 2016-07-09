/* eslint no-duplicate-imports: false */
import * as d3 from 'd3';
import { event as currentEvent } from 'd3'; // https://github.com/d3/d3/issues/2733
import dummy from 'json!./dummy.json';

// TODO: make a directive and move the d3 code from controller

class GraphController {
  constructor($scope) {
    'ngInject';
    this.$scope = $scope;
    this.$scope.loading = true;
    const nodesAndLinks = this.processNodes(dummy.data);
    this.drawGraph(nodesAndLinks[0], nodesAndLinks[1]);
    this.$scope.loading = false;
  }

  processNodes(data) {
    const nodes = [];
    const links = [];
    const comics = {};
    console.log(links);
    data.results.forEach((character) => {
      const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;

      if (character.comics.items.length > 0) {
        const characterNode = { count: 1, name: character.name, image };
        characterNode.links = [];
        nodes.push(characterNode);
        character.comics.items.forEach((comic) => {
          const id = comic.resourceURI.split('/').pop();
          const name = comic.name;
          const cComic = comics[id];
          if (cComic) {
            cComic.count++;
            characterNode.links.push(cComic);
          } else {
            const comicNode = { name, id, count: 1 };
            comics[id] = comicNode;
            characterNode.links.push(comicNode);
          }
        });
      }
    });
    // pun the comics in nodes array
    Object.keys(comics).forEach((comicId) => {
      const comic = comics[comicId];
      nodes.push(comic);
    });
    // make links
    nodes.forEach((node, index) => {
      if (node.links && node.links.length > 0) {
        node.links.forEach((comicLink) => {
          const indexOfComic = nodes.indexOf(comicLink);
          if (indexOfComic >= 0) {
            links.push({ source: index, target: indexOfComic });
          }
        });
      }
    });
    return [nodes, links];
  }

  zoom() {
    alert('Not implemented yet, use the mouse to pan and zoom.');
  }

  drawGraph(nodes, links) {
    const width = 800;
    const height = 600;

    const color = d3.scale.category20();

    const force = d3.layout.force()
        .charge(-180)
        .linkDistance(90)
        .size([width, height]);

    const toolTip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip animated bounceIn')
        .attr('style', 'display: none;');

    const svg = d3.select('.chart').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .call(d3.behavior.zoom().on('zoom', () => {
          svg.attr('transform',
            `translate(  ${currentEvent.translate} )  scale( ${currentEvent.scale} )`);
        }))
      .append('g');

    svg.append('clipPath')
        .attr('id', 'clip')
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', 25);

    force
        .nodes(nodes)
        .links(links)
        .start();

    const link = svg.selectAll('.link')
        .data(links)
        .enter()
        .append('line')
        .attr('class', 'link')
        .style('stroke-width', 3);

    const node = svg.selectAll('.node')
        .data(nodes)
        .enter()
        .append('g')
        .attr('class', 'node')
        .call(force.drag);

    // TODO: use rect for magazines
    /*
    node.append('rect')
        .attr('width', 200)
        .attr('height', 200);
    */

    node.append('circle')
        .style('background', (d) => `url("${d.image}")`)
        .attr('r', (d) => {
          const r = d.image ? 28 : d.count + 5;
          return r;
        })
        .style('fill', (d) => color(d.count));

    node.append('svg:image')
        .attr('class', 'avatar')
        .attr('xlink:href', (d) => d.image)
        .attr('clip-path', 'url(#clip)')
        .attr('x', () => -30)
        .attr('y', () => -30)
        .attr('height', () => 60)
        .attr('width', () => 60);

    node.on('mouseover', (d) => {
      // FIXME: get the offset right
      const posX = currentEvent.pageX;
      const posY = currentEvent.pageY;
      toolTip.attr('style', `left: ${posX}px;top:${posY}px; display: block;`)
          .html(`<strong>${d.name}</strong>`);
    }).on('mouseout', () => {
      toolTip.attr('style', 'display: none;');
    });

    force.on('tick', () => {
      link.attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate( ${d.x} , ${d.y} )`);
    });
  }
}

export default GraphController;
