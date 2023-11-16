const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});

const rooms = {};

//connected user
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  //join room event, if room not exit, create a new room
  socket.on('join_room', (room) => {
    if (!rooms[room]) {
      rooms[room] = [];
    }
    //push the user and the choice to the room array
    rooms[room].push({ id: socket.id, choice: undefined });
    //User join the room
    socket.join(room);

    //Check the number of user
    if (rooms[room].length === 2) {
      //Create a new users array with only user ID
      const users = rooms[room].map(user => user.id);
      //That room emit a event which is room ready, and pass the users data(ID)
      io.to(room).emit('room_ready', users);
    }
  });

  function resetChoices(room) {
    rooms[room] = [];
  }

  socket.on('choose_movie', ({ likedCards, dislikedCards, maybeCards, room }) => {
    if (rooms[room]) {
      const user = rooms[room].find(user => user.id === socket.id);

      if (user) {
        user.choice = {
          likedCards: likedCards || [],
          dislikedCards: dislikedCards || [],
          maybeCards: maybeCards || [],
        };

        if (rooms[room].every(user => user.choice !== undefined)) {
          const choices = rooms[room].map(user => user.choice);
          const sortedCards = combineAndSortScores(choices);
          io.to(room).emit('match_result', sortedCards);
          resetChoices(room);
        }
      }
    }
  });


  function combineAndSortScores(choices) {
    // Initialize combinedScores object
    const combinedScores = {};

    // Iterate through each user's choices
    choices.forEach(userChoices => {
      // Iterate through liked, disliked, and maybe cards
      Object.keys(userChoices).forEach(cardType => {
        // Iterate through each card in the current card type
        userChoices[cardType].forEach(card => {
          const cardId = card.id;
          const score = getScoreByCardType(cardType); // Get the score based on the card type
          combinedScores[cardId] = (combinedScores[cardId] || 0) + score;
        });
      });
    });

    // Convert combinedScores object to an array of objects
    const sortedCardsWithScores = Object.keys(combinedScores)
        .map(cardId => ({ id: cardId, score: combinedScores[cardId] }))
        .sort((a, b) => b.score - a.score);

    return sortedCardsWithScores;
  }

// Helper function to get score based on card type
  function getScoreByCardType(cardType) {
    // Assign scores based on card type (modify as needed)
    switch (cardType) {
      case 'likedCards':
        return 5; // Liked card score
      case 'dislikedCards':
        return 0; // Disliked card score
      case 'maybeCards':
        return 3; // Maybe card score
      default:
        return 0; // Default score
    }
  }


  // socket.on('disconnect', () => {
  //   for (const room in rooms) {
  //       //Remove the current user(socket.id) form the list when trigger disconnect
  //     rooms[room] = rooms[room].filter(u => u.id !== socket.id);
  //     if (rooms[room].length === 0) {
  //       delete rooms[room];
  //     }
  //   }
  // });


});

server.listen(3001, () => {
    console.log('SERVER IS RUNNING');
});
