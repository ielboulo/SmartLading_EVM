const { ethers } = require('ethers');

const convertDateToTimestamp = (dateStr) => {
    if (!dateStr) return 0;
    const [day, month, year] = dateStr.split('/').map(num => parseInt(num, 10));
    const date = new Date(year, month - 1, day);
    if (isNaN(date.getTime())) {
        console.error('Invalid date format. Please use dd/mm/yyyy');
        return 0;
    }
    const timestamp = Math.floor(date.getTime() / 1000);
    console.log('Original date:', dateStr);
    console.log('Parsed date:', date.toLocaleDateString());
    console.log('Converted timestamp:', timestamp);
    return timestamp;
};

const testDateConversion = () => {
    const testDates = [
        '25/03/2024',
        '01/12/2023',
        '31/01/2024'
    ];
    testDates.forEach(date => {
        console.log('\nTesting date:', date);
        const timestamp = convertDateToTimestamp(date);
        const backToDate = new Date(timestamp * 1000);
        console.log('Converted back to date:', backToDate.toLocaleDateString());
    });
};

const generateDocumentHash = (documentData) => {
    try {
        // Create a string from all document fields
        const documentString = JSON.stringify({
            billOfLadingNumber: documentData.billOfLadingNumber,
            shipFrom: documentData.shipFrom,
            shipTo: documentData.shipTo,
            shipDate: documentData.shipDate,
            carrier: documentData.carrier,
            cargo: documentData.cargo,
            valueUsd: documentData.valueUsd,
            docMetadata: documentData.docMetadata
        });

        // Using ethers v6 syntax for encoding and hashing
        const messageBytes = ethers.toUtf8Bytes(documentString);
        const hash = ethers.keccak256(messageBytes);
        
        console.log('Document string:', documentString);
        console.log('Generated hash:', hash);
        
        return hash;
    } catch (error) {
        console.error('Error generating document hash:', error);
        throw error;
    }
};

// Run tests
console.log("=== Running Date Conversion Tests ===");
testDateConversion();

console.log("\n=== Running Document Hash Test ===");
const documentData = {
    billOfLadingNumber: "BL123456",
    shipFrom: "Port A",
    shipTo: "Port B",
    shipDate: "25/03/2024",
    carrier: "Carrier X",
    cargo: "Container goods",
    valueUsd: "50000",
    docMetadata: "Additional info"
};

const hash = generateDocumentHash(documentData);

module.exports = {
    convertDateToTimestamp,
    generateDocumentHash,
    testDateConversion
};