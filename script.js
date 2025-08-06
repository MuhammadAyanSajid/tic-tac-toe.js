document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const status = document.getElementById('status');
  const restartButton = document.getElementById('restart');
  
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let currentPlayer = '🐐';
  let gameActive = true;
  
  // Winning conditions
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6]             // diagonals
  ];
  
  // Initialize the game
  function initializeGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = '🐐';
    gameActive = true;
    status.textContent = `Player ${currentPlayer}'s turn`;
    
    // Clear the board
    document.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
      cell.style.backgroundColor = '';
    });
  }
  
  // Handle cell click
  function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = parseInt(cell.getAttribute('data-index'));
    
    // If cell already filled or game not active, ignore click
    if (gameBoard[cellIndex] !== '' || !gameActive) return;
    
    // Update game state
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    
    // Check for win or draw
    if (checkWin()) {
      status.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      highlightWinningCells();
      return;
    }
    
    if (checkDraw()) {
      status.textContent = "It's a draw!";
      gameActive = false;
      return;
    }
    
    // Switch player
    currentPlayer = currentPlayer === '🐐' ? '🍇' : '🐐';
    status.textContent = `Player ${currentPlayer}'s turn`;
  }
  
  // Check for win
  function checkWin() {
    return winConditions.some(condition => {
      const [a, b, c] = condition;
      return gameBoard[a] !== '' && 
             gameBoard[a] === gameBoard[b] && 
             gameBoard[a] === gameBoard[c];
    });
  }
  
  // Highlight winning cells
  function highlightWinningCells() {
    winConditions.forEach(condition => {
      const [a, b, c] = condition;
      if (gameBoard[a] !== '' && 
          gameBoard[a] === gameBoard[b] && 
          gameBoard[a] === gameBoard[c]) {
        document.querySelector(`[data-index="${a}"]`).style.backgroundColor = '#a5d6a7';
        document.querySelector(`[data-index="${b}"]`).style.backgroundColor = '#a5d6a7';
        document.querySelector(`[data-index="${c}"]`).style.backgroundColor = '#a5d6a7';
      }
    });
  }
  
  // Check for draw
  function checkDraw() {
    return gameBoard.every(cell => cell !== '');
  }
  
  // Event listeners
  board.addEventListener('click', handleCellClick);
  restartButton.addEventListener('click', initializeGame);
  
  // Initialize the game
  initializeGame();
});