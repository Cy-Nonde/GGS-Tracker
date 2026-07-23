// train.js
const net = require('./model.js');
const fs = require('fs');

// Example training data (replace with your own records)
const trainingData = [
  { input: [0], output: [0] },
  { input: [1], output: [1] },
  { input: [2], output: [1] }, // you can expand this
];

// Train the network
net.train(trainingData, {
  iterations: 2000,   // number of training cycles
  log: true,          // enable logging
  logPeriod: 100,     // log every 100 iterations
  learningRate: 0.3   // adjust for convergence speed
});

// Save the trained model
fs.writeFileSync('model.json', JSON.stringify(net.toJSON()));

// Test prediction
console.log('Prediction for 0.5:', net.run([0.5]));
