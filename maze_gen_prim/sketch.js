let cols, rows;
let w = 20;
let grid = [];
let current;
let frontiers = [];
let start;
let end;
let openSet = [];
let closedSet = [];
let path = [];

function removeFromArray(arr, elt) {
  // Could use indexOf here instead to be more efficient
  for (var i = arr.length - 1; i >= 0; i--) {
    if (arr[i] == elt) {
      arr.splice(i, 1);
    }
  }
}

function heuristic(a, b) {
  //var d = dist(a.i, a.j, b.i, b.j);
  var d = abs(a.i - b.i) + abs(a.j - b.j);
  return d;
}

function setup() {
  createCanvas(600, 600);
  background(51);
  cols = floor(width / w);
  rows = floor(height / w);

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let cell = new Cell(i, j);
      grid.push(cell);
    }
  }
  generateMaze();
  for (let cell of grid) {
    cell.addNeighbors(grid);
  }
  for (let cell of grid) {
    cell.show();
  }
  start = grid[0];
  end = grid[grid.length - 1];
  openSet.push(start);
}

function draw() {
  //frameRate(1);  
  if (openSet.length > 0) {
    let winner = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if (current === end) {
      path = [];
      var temp = current;
      path.push(temp);
      while (temp.previous) {
        path.push(temp.previous);
        temp = temp.previous;
      }
      noLoop();
      console.log("Fin!");
    }

    removeFromArray(openSet, current);
    closedSet.push(current);

    let neighbors = current.neighbors;
    for (let i = 0; i < neighbors.length; i++) {
      let neighbor = neighbors[i];
      //let walls = neighbor.walls.filter(wall => wall === true);
      if (!closedSet.includes(neighbor)) {
        let tempG = current.g + 1;

        let newPath = false;
        if (openSet.includes(neighbor)) {
          if (tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }
        } else {
          neighbor.g = tempG;
          newPath = true;
          openSet.push(neighbor);
        }

        if (newPath) {
          neighbor.h = heuristic(neighbor, end);
          neighbor.f = neighbor.g + neighbor.h;
          neighbor.previous = current;
        }
      }
    }
  } else {
    console.log("no hay solucion");
    noLoop();
    return;
  }

  for (var i = 0; i < closedSet.length; i++) {
    closedSet[i].highlight(color(255, 0, 0, 10));
  }

  for (var i = 0; i < openSet.length; i++) {
    openSet[i].highlight(color(0, 255, 0, 50));
  }

  // Find the path by working backwards
  /* path = [];
  var temp = current;
  path.push(temp);
  while (temp.previous) {
    path.push(temp.previous);
    temp = temp.previous;
  } */

  /* for (var i = 0; i < path.length; i++) {
    path[i].highlight(color(0, 0, 255, 25));
  } */

  noFill();
  stroke(255);
  strokeWeight(w / 10);
  beginShape();
  for (var i = 0; i < path.length; i++) {
    vertex(path[i].i * w + w / 2, path[i].j * w + w / 2);
  }
  endShape();
}

function generateMaze() {
  let index = floor(random(cols * rows));
  current = grid[index];
  current.isPartMaze = true;
  let n = current.getNeighbors(grid);
  for (let i = 0; i < n.length; i++) {
    frontiers.push(n[i]);
  }

  while (frontiers.length > 0) {
    let index = floor(random(frontiers.length - 1));
    let frontier = frontiers[index];
    let next = frontier.getRandomNeighbor(grid);
    removeWalls(frontier, next);
    frontier.isPartMaze = true;

    let nextN = frontier.getNeighbors(grid)
    for (let i = 0; i < nextN.length; i++) {
      if (!frontiers.includes(nextN[i])) {
        frontiers.push(nextN[i]);
      }
    }
    frontiers.splice(index, 1);
  }
}

function index(i, j) {
  if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
    return -1;
  }
  return i + j * cols;
}

function removeWalls(a, b) {
  let x = a.i - b.i;
  if (x === 1) {
    a.walls[3] = false;
    b.walls[1] = false;
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  let y = a.j - b.j;
  if (y === 1) {
    a.walls[0] = false;
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}