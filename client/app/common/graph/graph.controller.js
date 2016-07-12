/*eslint-disable*/
import * as d3 from 'd3';
// s3 + webpack bug https://github.com/d3/d3/issues/2733
import { event as currentEvent } from 'd3';
import dummy from 'json!./dummy.json'; // initial data will loaded from the boundle
/*eslint-enable*/

// TODO: make a directive and move the d3 code from controller

class GraphController {
  constructor($scope, marvelService, $state) {
    'ngInject';
    this.svg = null;
    this.currentNode = null;
    this.currentPos = null;
    this.$state = $state;
    this.$scope = $scope;
    this.marvelService = marvelService;
    const nodesAndLinks = this.processNodes(dummy.data);
    this.drawGraph(nodesAndLinks[0], nodesAndLinks[1]);
  }

  searchCharacter(nameBeginsWith) {
    d3.select('svg').remove();
    this.loading = true;
    this.marvelService.getCharacters(nameBeginsWith)
      .then((data) => {
        const nodesAndLinks = this.processNodes(data);
        this.drawGraph(nodesAndLinks[0], nodesAndLinks[1]);
      })
      .catch(console.error.bind(console))
      .finally(() => {
        this.loading = false;
      });
  }

  processNodes(data) {
    const nodes = [];
    const links = [];
    const comics = {};
    console.log(links);
    data.results.forEach((character) => {
      const image = `${character.thumbnail.path}.${character.thumbnail.extension}`;

      if (character.comics.items.length > 0) {
        const characterNode =
          { count: 1, id: character.id, name: character.name, image, type: 'character' };
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
            const comicNode = { name, id, count: 1, type: 'comic' };
            comics[id] = comicNode;
            characterNode.links.push(comicNode);
          }
        });
      }
    });
    // Put the comics in nodes array
    Object.keys(comics).forEach((comicId) => {
      const comic = comics[comicId];
      nodes.unshift(comic);
    });
    // Make links
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

  zoom(value) {
    // alert('Not working properly... use mouse to pan/zoom');
    const transform = d3.transform(this.svg.attr('transform'));
    const scale = transform.scale;
    const translate = transform.translate;
    scale[0] = scale[1] = scale[0] + value;
    this.svg.transition().attr('transform',
      `scale (${scale[0]}, ${scale[1]}) translate( ${translate[0]},${translate[1]} )`);
  }

  pan(axis, value) {
    // alert('Not working properly... use mouse to pan/zoom');
    const transform = d3.transform(this.svg.attr('transform'));
    const scale = transform.scale;
    const translate = transform.translate;
    translate[axis] = translate[axis] + value;
    this.svg.transition().attr('transform',
      `scale (${scale[0]}, ${scale[1]}) translate( ${translate[0]},${translate[1]} )`);
  }


  drawGraph(nodes, links) {
    const width = 800;
    const height = 600; // TODO: get value from browser

    const force = d3.layout.force()
        .charge(-180)
        .linkDistance(90)
        .size([width, height]);

    const toolTip = d3.select('.chart')
        .append('div')
        .attr('class', 'tooltip animated bounceIn')
        .attr('style', 'display: none;');

    const svg = this.svg = d3.select('.chart').append('svg')
        .attr('width', '100%')
        .attr('height', '100%')
        .call(d3.behavior.zoom().on('zoom', () => {
          if (this.currentNode) {
            return;
          }
          window.sss = svg;
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
        .attr('r', (d) => {
          const r = d.image ? 28 : 10 + d.count;
          return r;
        })
        .style('fill', (d) => {
          if (d.count > 1) {
            return '#737373';
          }
          return '#b3b3b3';
        });

    node.append('svg:image')
        .attr('class', 'avatar')
        .attr('xlink:href', (d) => {
          let img = d.image;
          if (!img) {
            img = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
          }
          return img;
        })
        .attr('clip-path', 'url(#clip)')
        .attr('x', () => -30)
        .attr('y', () => -30)
        .attr('height', () => 60)
        .attr('width', () => 60);

    node
    .on('mousedown', (d) => {
      this.currentPos = [currentEvent.pageX, currentEvent.pageY];
      this.currentNode = d;
    })
    .on('mouseup', (d) => {
      const diff = (currentEvent.pageX - this.currentPos[0]) -
        (currentEvent.pageY - this.currentPos[1]);
      // If mouse didn't move go to link
      if (diff === 0) {
        this.$state.go(d.type, { id: d.id });
      }
      this.currentNode = null;
    })
    .on('mouseover', (d) => {
      const posX = currentEvent.pageX;
      const posY = currentEvent.pageY;
      toolTip.attr('style', `left: ${posX}px;top:${posY}px; display: block;`)
          .html(`<strong>${d.name}</strong>`);
    })
    .on('mouseout', () => {
      toolTip.attr('style', 'display: none;');
    });


    force.on('tick', () => {
      link.attr('x1', (d) => d.source.x)
          .attr('y1', (d) => d.source.y)
          .attr('x2', (d) => d.target.x)
          .attr('y2', (d) => d.target.y);

      node.attr('transform', (d) => `translate( ${d.x} , ${d.y}  ) `);
    });
  }
}

export default GraphController;
