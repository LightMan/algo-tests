class Graph {
  constructor() {
    this.vertices = [];
    this.adjacencyList = {};
    this.distances = {};
    this.parents = {};
    this.maxDistance = Number.MIN_SAFE_INTEGER;
  }

  addVertex(vertex) {
    this.vertices.push(vertex);
    this.adjacencyList[vertex] = {};
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  changeWeight(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1][vertex2] = weight;
  }

  vertexWithMinDistance(distances, visited) {
    let minDistance = Infinity, minVertex = null;
    for (let vertex in distances) {
      let distance = distances[vertex];
      if (distance < minDistance && !visited.has(vertex)) {
        minDistance = distance;
        minVertex = vertex;
      }
    }
    return minVertex;
  }

  initDistancesParentsFromNode(source) {
    for (let i = 0; i < this.vertices.length; i++) {
      if (this.vertices[i] === source) {
        this.distances[source] = 0;
      } else {
        this.distances[this.vertices[i]] = Infinity;
      }
      this.parents[this.vertices[i]] = null;
    }
  }

  dijkstra(source) {
    let visited = new Set();
    const distances = this.distances;
    const parents = this.parents;

    this.initDistancesParentsFromNode(source);

    let currVertex = this.vertexWithMinDistance(distances, visited);

    while (currVertex !== null) {
      let distance = distances[currVertex], neighbors = this.adjacencyList[currVertex];
      for (let neighbor in neighbors) {
        let newDistance = distance + neighbors[neighbor];
        if (distances[neighbor] > newDistance) {
          distances[neighbor] = newDistance;
          parents[neighbor] = currVertex;
        }
      }
      visited.add(currVertex);
      currVertex = this.vertexWithMinDistance(distances, visited);
    }

    // console.log(parents);
    // console.log(distances);
  }
}

var networkDelayTime = function (times, n, k) {
  const graph = generateGraph(times, n);
  graph.dijkstra(k);
  const maxDistance = Object.values(graph.distances).reduce((cur, prev) => Math.max(cur, prev));
  return maxDistance == Infinity ? -1 : maxDistance;

  function generateGraph(times, n) {
    const graph = new Graph();
    for (let i = 1; i <= n; i++) {
      graph.addVertex(i);
    }
    times.forEach(edge => graph.addEdge(edge[0], edge[1], edge[2]));
    return graph;
  }
};
