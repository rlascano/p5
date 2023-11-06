class Maze {
    constructor(w) {
        this.w = w
        this.cols = Math.floor(width / this.w)
        this.rows = Math.floor(height / this.w)                
        this.grid = []               
    }

    removeWalls(a, b) {
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

    generate_grid() {        
        for (let j = 0; j < this.rows; j++) {
            for (let i = 0; i < this.cols; i++) {
                let cell = new Cell(i, j, this.w);
                this.grid.push(cell);
            }
        }
    }    

    generate_maze() {
        let current = this.grid[0];        
        let stack = [];
        current.visited = true;
        stack.push(current);
        while (stack.length > 0) {
            current = stack.pop();            
            if (current.checkNeighbors(this.grid)) {
                stack.push(current);
                let next = current.checkNeighbors(this.grid);
                this.removeWalls(current, next);
                next.visited = true;
                stack.push(next);                
            }
        }
    }

    addNeighbors() {
        for(let i = 0; i < this.grid.length; i++) {
            this.grid[i].addNeighbors(this.grid);
        }
    }

    show() {
        for (let cell of this.grid) {
            cell.show();
        }
    }

}