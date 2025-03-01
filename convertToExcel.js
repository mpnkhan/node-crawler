const fs = require('fs');
const path = require('path');
const xlsx = require('xlsx');

// Paths
const INPUT_FILE = path.join('output', 'output.json'); // Path to the input JSON file
const MAPPING_FILE = path.join('output', 'AutoDescriptions.json'); // Path to the mapping JSON file
const OUTPUT_FILE = path.join('output', 'output.xlsx'); // Path to the output Excel file

// Function to load JSON data from a file
function loadJsonData(filePath) {
  try {
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error reading or parsing ${filePath}:`, error.message);
    return null;
  }
}

// Function to flatten the JSON data and map additional fields
function flattenData(data, mappingData) {
  const flattened = [];
  for (const item of data) {
    const { url, violations } = item;
    for (const violation of violations) {
      const { id, description, nodes, failureSummary, impact } = violation;
      for (const node of nodes) {
        // Find the corresponding mapping entry
        const mappingEntry = mappingData.find((entry) => entry.RuleID === id);
        flattened.push({
          ID: id, // Custom header: ID
          PageURL: url, // Custom header: PageURL
          Description: description, // Custom header: Description
          "Affected Code": node.html, // Custom header: Affected Code
          "Failure Summary": node.failureSummary || failureSummary, // Custom header: Failure Summary
          Impact: impact, // Custom header: Impact
          Checkpoint: mappingEntry ? mappingEntry.Checkpoint : 'N/A', // Custom header: Checkpoint
          Level: mappingEntry ? mappingEntry.Level : 'N/A', // Custom header: Level
          Details: node.target ? node.target.join(', ') : 'N/A', // Custom header: Details
        });
      }
    }
  }
  return flattened;
}

// Function to save data as an Excel file
function saveAsExcel(data, filePath) {
  // Create a new workbook
  const workbook = xlsx.utils.book_new();

  // Convert the data to a worksheet
  const worksheet = xlsx.utils.json_to_sheet(data);

  // Add the worksheet to the workbook
  xlsx.utils.book_append_sheet(workbook, worksheet, 'Accessibility Violations');

  // Write the workbook to the file
  xlsx.writeFile(workbook, filePath);
  console.log(`Excel file saved to ${filePath}`);
}

// Main function
function main() {
  try {
    // Load the input JSON data
    const inputData = loadJsonData(INPUT_FILE);
    if (!inputData) return;

    // Load the mapping JSON data
    const mappingData = loadJsonData(MAPPING_FILE);
    if (!mappingData) return;

    // Flatten the data and map additional fields
    const flattenedData = flattenData(inputData, mappingData);

    // Save the flattened data as an Excel file
    saveAsExcel(flattenedData, OUTPUT_FILE);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Run the program
main();