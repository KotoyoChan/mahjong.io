const socket = io();

function joinRoom() {
  const room = document.getElementById("roomInput").value;
  if (room.trim() === '') return alert('Enter a room name!');
  socket.emit("join-room", room);
  document.getElementById("status").innerText = "Joining room...";
}

socket.on("room-update", (players) => {
  document.getElementById("status").innerText = `Players in room: ${players.length}/4`;
});

socket.on("start-game", (msg) => {
    document.getElementById("status").innerText = msg;
  
    const tileWall = shuffle(generateTiles());
  
    const playerNames = ['East', 'South', 'West', 'North'];
    const players = {};           // Holds final hands
    const playerBonuses = {};     // Holds bonus tiles drawn

    playerNames.forEach((player, index) => {
    const isEast = index === 0;
    const tileCount = isEast ? 14 : 13;
    const hand = [];
    const bonuses = [];

    while (hand.length < tileCount && tileWall.length > 0) {
        const tile = tileWall.shift();
        if (bonusTiles.includes(tile)) {
        bonuses.push(tile);
        } else {
        hand.push(tile);
        }
    }

    players[player] = hand;
    playerBonuses[player] = bonuses;
    });
  
    const bonusTiles = ['Plum', 'Orchid', 'Chrysanthemum', 'Bamboo',
        'Spring', 'Summer', 'Autumn', 'Winter',
        'Rat', 'Cat', 'Centipede', 'Rooster'];

    let bonusCount = 0;
    const bonusHits = [];

    // Display YOUR HAND (East)
    const handDiv = document.createElement('div');
    handDiv.innerHTML = `<h3>Your Hand (East):</h3>`;
    handDiv.className = 'tile-hand';

    players.East.forEach(tile => {
    const el = document.createElement('div');
    el.className = 'tile';

    const img = document.createElement('img');
    const filename = tile.replace(/ /g, '_') + '.png';
    img.src = `tiles/${filename}`;
    img.alt = tile;
    img.title = tile;
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'contain';

    el.appendChild(img);
    handDiv.appendChild(el);
    });
    document.body.appendChild(handDiv);

    // Display East's Bonus Tiles
    const bonusDiv = document.createElement('div');
    bonusDiv.innerHTML = `<h4>🎁 Bonus Tiles (${playerBonuses.East.length}):</h4><p>${playerBonuses.East.join(', ') || 'None'}</p>`;
    document.body.appendChild(bonusDiv);
});

// Generation of Mahjong Tiles
function generateTiles() {
    const suits = ['Character', 'Bamboo', 'Dot'];
    const tiles = [];
  
    suits.forEach(suit => {
      for (let i = 1; i <= 9; i++) {
        for (let j = 0; j < 4; j++) {
          tiles.push(`${i} ${suit}`);
        }
      }
    });
  
    const winds = ['East Wind', 'South Wind', 'West Wind', 'North Wind'];
    const dragons = ['Red Dragon', 'Green Dragon', 'White Dragon'];
  
    winds.forEach(w => tiles.push(...Array(4).fill(w)));
    dragons.forEach(d => tiles.push(...Array(4).fill(d)));
  
    const flowers = ['Plum', 'Orchid', 'Chrysanthemum', 'Bamboo'];
    const seasons = ['Spring', 'Summer', 'Autumn', 'Winter'];
    const animals = ['Rat', 'Cat', 'Centipede', 'Rooster'];
  
    tiles.push(...flowers, ...seasons); // Only one of each
    tiles.push(...animals); // One of each
  
    return tiles;
  }

  // Shuffling
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }