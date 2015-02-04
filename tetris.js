(function() {

  var W = 10, H = 20, S = 20;
  var boardE, lastTime, board, elapsed;
  var blks = [];
  var curX, curY;
  var elapsed = 0.0, secPerDrop = 0.4;

  var TL = -W-1, TC = -W, TR = -W+1,
    ML = -1, MR = 1, BL = W-1, BC = W, BR = W+1;

  var shapes = [
    [7, TL, TC, MR], //0
    [8, TR, TC, ML], //1
    [9, ML, MR, BC], //2
    [3, TL, TC, ML], //3
    [12,ML, BL, MR], //4
    [15,ML, BR, MR], //5
    [18,ML, MR,  2], //6
    [0, TC, ML, BL], //7
    [1, TC, MR, BR], //8
    [10,TC, MR, BC], //9
    [11,TC, MR, MR], //10
    [2, TC, ML, BC], //11
    [13,TC, BC, BR], //12
    [14,TR, ML, MR], //13
    [4, TL, TC, BC], //14
    [16,TR, ML, MR], //15
    [17,TL, MR, ML], //16
    [5, TC, BC, BL], //17
    [6, TC, BC, 2*W] //18
  ];

  function reset() {
    console.log('reset');
    var T = W * H;
    boardE = document.querySelector('#tetris');
    while( boardE.firstChild ) { 
      boardE.removeChild(boardE.firstChild);
    }
    blks = [];
    boardE.style.width = W * S + 'px';
    boardE.style.height = H * S + 'px';
    for (var i = 0 ; i < T; ++i) {
      var block = document.createElement('div');
      blks.push(block);
      block.style.width = S + 'px';
      block.style.height = S + 'px';
      boardE.appendChild(block);
    }
    lastTime = Date.now();

    board = new Array(T);
    curX = 4;
    curY = 0;

    setBoard();

    document.addEventListener('keyup', function(e) {
      var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
      };

      handleInput(allowedKeys[e.keyCode]);
    });
  }

  function handleInput(key) {
    if (key === 'left') {
      moveLeft();
    } else if (key === 'right') {
      moveRight();
    }
  }

  function setBoard() {
    var t = curY * W + curX;
    if (board[t]) {
      board[t] = undefined;
    } else {
      board[t] = 1;
    }
  }

  function checkBoard(x, y) {
    // false meaning available
    if (x < 0 || x >= W || y < 0 || y >= H) {
      return true;
    }
    var t = y * W + x;
    return board[t];
  }

  function moveDown() {
    setBoard();
    if (!checkBoard(curX, curY+1)) {
      curY += 1;
      setBoard();
    } else {
      setBoard();
      curX = 4;
      curY = 0;
      if (checkBoard(curX, curY)) {
        reset();
      } else {
        setBoard();
      }
    }
  }

  function moveLeft() {
    setBoard();
    if (!checkBoard(curX-1, curY)) {
      curX -= 1;
    }
    setBoard();
  }

  function moveRight() {
    setBoard();
    if (!checkBoard(curX+1, curY)) {
      curX += 1;
    }
    setBoard();
  }

  function update(dt) {
    elapsed += dt;
    if (elapsed > secPerDrop) {
      elapsed -= secPerDrop;
      moveDown();
    }
  }

  function render() {
    for (var i = 0; i < H; ++i) {
      for (var j = 0; j < W; ++j) {
        var t = i * W + j;
        if (board[t]) {
          blks[t].className = 'block';
        } else {
          blks[t].className = '';
        }
      }
    }
  }

  function main() {
    var now = Date.now();
    var dt = (now - lastTime) / 1000.0;

    update(dt);
    render();

    lastTime = now;
    requestAnimationFrame(main);
  }

  reset();
  main();

})();

