// model.js
const brain = require('brain.js');

// Define a simple feedforward neural network
const net = new brain.NeuralNetwork({
  hiddenLayers: [3],   // you can adjust layer sizes
  activation: 'sigmoid' // options: 'sigmoid', 'relu', 'leaky-relu', 'tanh'
});

// Export the network so train.js can use it
module.exports = net;
