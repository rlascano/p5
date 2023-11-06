class Cell {
  constructor(i, j, w) {
    this.w = w;
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.visited = false;
    this.svisited = false; 
    this.f = 0;
    this.g = 0;
    this.h = 0;   
    this.neighbors = [];
    this.previous = undefined;
  }

  index(i, j) {    
    let cols = width / this.w;
    let rows = height / this.w;
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
      return -1;
    }    
    return i + j * cols;
  }

  checkNeighbors(grid) {
    let neighbors = [];

    let top = grid[this.index(this.i, this.j - 1)];
    let right = grid[this.index(this.i + 1, this.j)];
    let bottom = grid[this.index(this.i, this.j + 1)];
    let left = grid[this.index(this.i - 1, this.j)];

    if (top && !top.visited) {
      neighbors.push(top);
    }

    if (right && !right.visited) {
      neighbors.push(right);
    }

    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }

    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      let r = floor(random(0, neighbors.length))
      return neighbors[r];
    }
    return undefined;    
  }

  addNeighbors(grid) {
    let top = grid[this.index(this.i, this.j - 1)];
    let right = grid[this.index(this.i + 1, this.j)];
    let bottom = grid[this.index(this.i, this.j + 1)];
    let left = grid[this.index(this.i - 1, this.j)];

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

  highlight(col) {
    let x = this.i * this.w;
    let y = this.j * this.w;
    noStroke();
    fill(col);
    rect(x, y, this.w * 0.75, this.w * 0.75);    
  }

  show() {
    let x = this.i * this.w;
    let y = this.j * this.w;
    stroke(255);
    if (this.walls[0]) {
      line(x, y, x + this.w, y);
    }
    if (this.walls[1]) {
      line(x + this.w, y, x + this.w, y + this.w);
    }
    if (this.walls[2]) {
      line(x + this.w, y + this.w, x, y + this.w);
    }
    if (this.walls[3]) {
      line(x, y + this.w, x, y);
    }

  }
}