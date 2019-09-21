var fs = require('fs')
var CsvReadableStream = require('csv-reader')

var inputStream = fs.createReadStream('undata.csv', 'utf8')

const mongoose = require('mongoose')

const crimeDataSchema = new mongoose.Schema({
  country: String,
  year: String,
  count: String,
  rate: String,
  source: String,
  source_type: String
})

const CrimeDataModel = mongoose.model('CrimeData', crimeDataSchema)

const parsing = () => {
  inputStream
    .pipe(
      CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true })
    )
    .on('data', function (row) {
      console.log('A row arrived: ', arrayToJson(row, header))
      new CrimeDataModel(arrayToJson(row, header)).save()
    })
    .on('end', function (data) {
      console.log('No more rows!')
    })
}

const header = ['country', 'year', 'count', 'rate', 'source', 'source_type']
const arrayToJson = (arr, header) => {
  let out = {}
  for (let i = 0; i < header.length; i++) {
    out[header[i]] = arr[i]
  }
  return out
}

mongoose
  .connect(
    'mongodb://localhost:27017/checkr',
    { useNewUrlParser: true, useCreateIndex: true }
  )
  .then(() => {
    parsing()
  })
  .catch(err => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    // process.exit();
  })
