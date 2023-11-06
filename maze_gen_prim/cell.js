class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.isPartMaze = false;
    this.isFrontier = false;
    this.neighbors = [];    
  }

  addNeighbors(grid) {
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j)];

    if (top && !this.svisited && !top.walls[2]) {
      this.neighbors.push(top);
    }

    if (right && !this.svisited && !right.walls[3]) {
      this.neighbors.push(right);
    }

    if (bottom && !this.svisited && !bottom.walls[0]) {
      this.neighbors.push(bottom);
    }

    if (left && !this.svisited && !left.walls[1]) {
      this.neighbors.push(left);
    }        
  }
  
  getNeighbors(grid) {   
    let neighbors = []
    
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j )];
    
    if(top && !top.isPartMaze) {
      neighbors.push(top);
    }
    
    if(right && !right.isPartMaze) {
      neighbors.push(right);
    }
    
    if(bottom && !bottom.isPartMaze) {
      neighbors.push(bottom);
    }
    
    if(left && !left.isPartMaze) {
      neighbors.push(left);
    } 

    return neighbors;      
  }

  getRandomNeighbor(grid) {   
    let neighbors = []
    
    let top = grid[index(this.i, this.j - 1)];
    let right = grid[index(this.i + 1, this.j)];
    let bottom = grid[index(this.i, this.j + 1)];
    let left = grid[index(this.i - 1, this.j )];
    
    if(top && top.isPartMaze) {
      neighbors.push(top);
    }
    
    if(right && right.isPartMaze) {
      neighbors.push(right);
    }
    
    if(bottom && bottom.isPartMaze) {
      neighbors.push(bottom);
    }
    
    if(left && left.isPartMaze) {
      neighbors.push(left);
    } 

    if(neighbors.length > 0) {
      let index = floor(random(neighbors.length - 1))      
      return neighbors[index];
    } 
    return null;     
  }
  
  highlight(col) {
    let x = this.i * w;
    let y = this.j * w;
    noStroke();
    fill(col);
    rect(x + w/4, y + w/4, w * 0.5, w * 0.5);
  }
  
 show() {
    let x = this.i * w;
    let y = this.j * w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + w, y);
    }
    if (this.walls[1]) {
      line(x + w, y, x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x, y + w);
    }
    if (this.walls[3]) {
      line(x, y + w, x, y);
    }

    /* if (this.visited) {
      noStroke();
      fill(255, 0, 255, 10);
      rect(x, y, w, w);
    } */
  }
}