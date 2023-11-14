let size;
let sudoku = [
  [0, 2, 3, 4, 0, 9, 0, 0, 6],
  [0, 0, 0, 0, 0, 2, 0, 3, 7],
  [7, 0, 0, 5, 3, 0, 0, 0, 0],
  [0, 6, 5, 0, 0, 0, 0, 0, 4],
  [3, 9, 4, 7, 0, 6, 0, 5, 0],
  [0, 1, 7, 0, 0, 5, 0, 2, 9],
  [4, 7, 2, 0, 1, 3, 0, 0, 0],
  [6, 3, 8, 0, 5, 0, 0, 0, 0],
  [9, 5, 1, 0, 8, 7, 0, 4, 0]  
];

let p;

function setup() { 
  createCanvas(450, 450);  
  size = width / 9;
  background(220);   
  drawLines(); 
  for(let j = 0; j < 9; j++) {
    for(let i = 0; i < 9; i++) {
      drawNumber(sudoku, j, i);
    }
  }
  solve(sudoku);
}

/*function mousePressed() {
  background(220);
  solve(sudoku);
  p.html("Resuelto!")
  drawLines(); 
  for(let j = 0; j < 9; j++) {
    for(let i = 0; i < 9; i++) {
      drawNumber(sudoku, j, i);
    }
  }
}*/

function draw() {
  background(220);
  drawLines();   
  for(let j = 0; j < 9; j++) {
    for(let i = 0; i < 9; i++) {
      drawNumber(sudoku, j, i);
    }
  }
}

function drawLines() {
  for(let i = 0; i < width; i++) {
    strokeWeight(1);
    if(i % 3 == 0) {
      strokeWeight(3);
    }
    line(i * size, 0, i * size, height);
    line(0, i * size, width, i * size);
  }
}

async function validCol(board, col, num) {
    for(let k = 0; k < 9; k++) {
      if(board[k][col] === num) {
        return false;
      }
    }
  return true;
}

async function validRow(board, row, num) {
    for(let k = 0; k < 9; k++) {
      if(board[row][k] === num) {
        return false;
      }
    }
  return true;
}

async function validSquare(board, row, col, num) {
  let startCol = 3 * Math.floor(col/3);
  let startRow = 3 * Math.floor(row/3);
  
  
  for(let i = 0; i < 3; i++) {
    for(let j = 0; j < 3; j++) {  
      if(board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}

async function valid(board, row, col , num) {
  return (await validCol(board, col, num) && await validRow(board, row, num) && await validSquare(board, row, col, num));
}

async function solve(board) { 
  await sleep(200);
  for(let i = 0; i < 9; i++) {    
    for(let j = 0; j < 9; j++) {       
      if(board[i][j] === 0) {        
        for(let num = 1; num < 10; num++) {          
          if(await valid(board, i, j, num)) {
            board[i][j] = num;             
            if(await solve(board)) {              
              return true;
            }            
           board[i][j] = 0;
          }          
        }
        return false;
      }      
    }  
  }
  return true;
}

function drawNumber(board, j, i) {
  strokeWeight(1);
  textSize(20);
  if(board[j][i] !== 0) {
       text(sudoku[j][i], i * size + 20, j * size + 30); 
  }  
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}