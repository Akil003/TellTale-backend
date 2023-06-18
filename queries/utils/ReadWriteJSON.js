const fs = require('fs');

// Function to read JSON data from a file
function readJSONFile(filePath) {
  try {
    const fileData = fs.readFileSync(filePath);
    const jsonData = JSON.parse(fileData);
    return jsonData;
  } catch (error) {
    console.error('Error reading JSON file:', error);
    return null;
  }
}

// Function to write JSON data to a file
function writeJSONFile(filePath, jsonData) {
  try {
    const jsonString = JSON.stringify(jsonData, null, 2);
    fs.writeFileSync(filePath, jsonString);
    console.log('JSON data written to file successfully.');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
}

module.exports = {readJSONFile, writeJSONFile}
