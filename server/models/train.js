// train.js
const tf = require('@tensorflow/tfjs');
const { createModel } = require('./model');

async function train() {
  const model = createModel();

  // Example dummy data
  const xs = tf.randomNormal([100, 10]);
  const ys = tf.randomUniform([100, 1]).round();

  await model.fit(xs, ys, {
    epochs: 20,
    batchSize: 16,
    validationSplit: 0.2,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch + 1}: loss=${logs.loss.toFixed(4)}, acc=${logs.acc?.toFixed(4)}`);
      }
    }
  });

  await model.save('file://./saved-model');
  console.log("✅ Model trained and saved.");
}

train();