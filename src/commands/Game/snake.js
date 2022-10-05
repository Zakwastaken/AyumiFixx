const Discord = require('discord.js')
const SnakeGame = require('snakecord');

const snakeGame = new SnakeGame({
    title: 'Snake',
    color: "#34eb95",
    timestamp: false,
    gameOverTitle: "Game Over!"
});
module.exports = {
  name: 'snake',
  category: 'Games',
  description: 'Snake Games!',
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

execute: async (message, args, client, prefix) => {
 return snakeGame.newGame(message);
  }
}