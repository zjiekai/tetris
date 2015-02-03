(function() {

  var W = 10, H = 20, S = 20;
  var boardE, lastTime, board, elapsed;
  var blks = [];
  var curX, curY;
  var elapsed = 0.0, secPerDrop = 0.4;

  function reset() {
    var T = W * H;
    boardE = document.querySelector('#tetris');
    while( boardE.firstChild ) { 
      boardE.removeChild(board.firstChild);
    }
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

  function moveDown() {
    setBoard();
    var t = (curY+1) * W + curX;
    if ((curY < H-1) && (!board[t])) {
      curY += 1;
    } else {
      setBoard();
      curY = 0;
    }
    setBoard();
  }

  function moveLeft() {
    setBoard();
    if (curX > 0) {
      curX -= 1;
    }
    setBoard();
  }

  function moveRight() {
    setBoard();
    if (curX < W-1) {
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

