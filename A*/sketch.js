let maze;
let next;
let start;
let end;
let openSet = [];
let closedSet = [];
let path = [];
let w = 20;

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
  background(51)
  maze = new Maze(w);  
  maze.generate_grid();
  maze.generate_maze();
  maze.addNeighbors();
  maze.show(); 
  start = maze.grid[0];
  end = maze.grid[maze.grid.length - 1];  
  end.highlight(255, 128, 0);
  end.walls[1] = false; 
  openSet.push(start); 
}

function draw() {  
  frameRate(10); 
  if(openSet.length > 0) {
    let winner = 0;
    for(let i = 0; i < openSet.length; i++) {
      if(openSet[i].f < openSet[winner].f) {
        winner = i;
      }
    }
    var current = openSet[winner];

    if(current === end) {
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
    for(let i = 0; i < neighbors.length; i++) {      
      let neighbor = neighbors[i];
      //let walls = neighbor.walls.filter(wall => wall === true);
      if(!closedSet.includes(neighbor)) {        
        let tempG = current.g + 1;           
        
        let newPath = false;
        if(openSet.includes(neighbor)) {
          if(tempG < neighbor.g) {
            neighbor.g = tempG;
            newPath = true;
          }          
        } else {
          neighbor.g = tempG;                        
          newPath = true;          
          openSet.push(neighbor);
        }

        if(newPath) {
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
