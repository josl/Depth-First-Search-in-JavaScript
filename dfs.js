// DFS implementation in JavaScript
//
//

const readline = require('readline');
const fs = require('fs');


// Define graph

function Node(node) {
    this.weight = 0;
    this.y = node;
}

function Graph(nEdges, nVertices) {
    this.nEdges = nEdges || 0;
    this.nVertices = nVertices || 0;
    this.nodes = {};
    this.directed = 0;
}

function innitGraph(graph, nodes){
    for (var i = 1; i < nodes; i++) {
        graph.nodes[i] = [];
    }
    return graph;
}

function processEdge(graph, x, y, directed) {
    var node = new Node();
    node.y = y;
    if (x in graph.nodes) {
        graph.nodes[x].push(node);
    }else {
        graph.nodes[x] = [node];
    }
    if (!directed) {
        processEdge(graph, y, x, true);
    }
}

function redGraph(graph) {
    const rl = readline.createInterface({
      input: fs.createReadStream('graph4.txt')
    });
    var graph = innitGraph();
    var graph = new Graph();
    var index = 0;
    rl.on('line', function(line) {
        if (line != ''){
            var graphEntry = line.split(' ');
            if (index === 0) {
                graph.nEdges = graphEntry[0];
                graph.nVertices = graphEntry[1];
                graph.directed = parseInt(graphEntry[2]);
                graph = innitGraph(graph, graph.nVertices);
            } else {
                processEdge(graph, graphEntry[0], graphEntry[1], graph.directed);
            }
            index++;
        }
    });

    rl.on('close', function() {
        console.log('we are done here!', graph.nodes);
        traverseGraph(graph, 1);
    });
}

var processed = {};  // List of processed nodes
var discovered = {}; // List of discovered nodes

// visit each node and edge once in BFS
function traverseGraph(graph, start, finished) {

    discovered[start] = 1; // Redundant for first starting node

    if (! finished ) {

        graph.nodes[start].forEach(function (nodes) {
            console.log(start, nodes.y);
            if (!(nodes.y in discovered)) {
                console.log('Edge: ( ', start, nodes.y, ' )');
                traverseGraph(graph, nodes.y, finished);
            }
            else if (!(nodes.y in processed)) {
                console.log('Edge: ( ', start, nodes.y, ' )');
                discovered[nodes.y] = 1;
            }
        });
        processed[start] = 1;
        finished = true;
    }
    return;
}

redGraph();
