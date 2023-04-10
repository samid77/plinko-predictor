const outputs = [];
// const predictionPoint = 300;
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel])
}

const distance = (pointA, pointB) => {
    return Math.abs(pointA - pointB)
}

const runAnalysis = () => {
  let testSetSize = 10
  const [testSet, trainingSet] = splitDataset(outputs, testSetSize);


  let numberCorrect = 0;
  for(let i=0; i < testSet.length; i++) {
    const bucket = knn(trainingSet, testSet[i][0]);
    if(bucket === trainingSet[i][3]) numberCorrect++;
    // console.log(`bucket: ${JSON.stringify(bucket, undefined, 2)} == testSet[i]: ${JSON.stringify(testSet[i][3], undefined, 2)}`)
    console.log(`Accuracy: ${numberCorrect/testSetSize}`)
  }
}

const knn = (dataSet, point) => {
  return _.chain(dataSet)
  .map(row => [distance(row[0], point), row[3]])
  .sortBy(row => row[0])
  .slice(0, k)
  .countBy(row => row[1])
  .toPairs()
  .sortBy(row => row[1])
  .last()
  .first()
  .parseInt()
  .value()
}

const splitDataset = (data, testCount) => {
  const shuffled = _.shuffle(data);
  const testSet = _.slice(shuffled, 0, testCount);
  const trainingSet = _.slice(shuffled, testCount);

  return [testSet, trainingSet];
}

