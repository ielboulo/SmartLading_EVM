// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract BillOfLading {
    // Status enum for BL documents
    enum DocumentStatus {
        Created,
        Active,
        InTransit,
        Delivered,
        Cancelled
    }

    // Structure for Bill of Lading
    struct Document {
        uint256 bolNumber;
        string shipFrom;
        string shipTo;
        uint256 shipDate;
        string carrier;
        string cargoContent;
        uint256 valueUSD;
        DocumentStatus status;
        address owner;
        bytes32 documentHash;
        bool exists;
    }

    // State variables
    mapping(uint256 => Document) private documents; // bolNumber => Document
    uint256 private documentCount;
    
    // Events
    event DocumentStored(uint256 indexed bolNumber, address indexed owner, bytes32 documentHash);
    event OwnershipTransferred(uint256 indexed bolNumber, address indexed previousOwner, address indexed newOwner);
    event StatusChanged(uint256 indexed bolNumber, DocumentStatus newStatus);

    // Modifiers
    modifier onlyDocumentOwner(uint256 _bolNumber) {
        require(documents[_bolNumber].owner == msg.sender, "Not the document owner");
        require(documents[_bolNumber].exists, "Document does not exist");
        _;
    }

    modifier documentExists(uint256 _bolNumber) {
        require(documents[_bolNumber].exists, "Document does not exist");
        _;
    }

    // Store new document hash
    function storeDocumentHash(
        uint256 _bolNumber,
        string memory _shipFrom,
        string memory _shipTo,
        uint256 _shipDate,
        string memory _carrier,
        string memory _cargoContent,
        uint256 _valueUSD,
        bytes32 _documentHash
    ) public returns (bool) {
        require(!documents[_bolNumber].exists, "Document already exists");
        
        Document storage doc = documents[_bolNumber];
        doc.bolNumber = _bolNumber;
        doc.shipFrom = _shipFrom;
        doc.shipTo = _shipTo;
        doc.shipDate = _shipDate;
        doc.carrier = _carrier;
        doc.cargoContent = _cargoContent;
        doc.valueUSD = _valueUSD;
        doc.status = DocumentStatus.Created;
        doc.owner = msg.sender;
        doc.documentHash = _documentHash;
        doc.exists = true;

        documentCount++;
        
        emit DocumentStored(_bolNumber, msg.sender, _documentHash);
        return true;
    }

    // Verify document hash
    function verifyDocumentHash(uint256 _bolNumber, bytes32 _hash) 
        public 
        view 
        documentExists(_bolNumber)
        returns (bool) 
    {
        return documents[_bolNumber].documentHash == _hash;
    }

    // Get document count
    function getDocumentCount() public view returns (uint256) {
        return documentCount;
    }

    // Get document owner
    function getDocumentOwner(uint256 _bolNumber) 
        public 
        view 
        documentExists(_bolNumber)
        returns (address) 
    {
        return documents[_bolNumber].owner;
    }

    // Change document owner
    function changeDocumentOwner(uint256 _bolNumber, address _newOwner) 
        public 
        onlyDocumentOwner(_bolNumber)
        returns (bool) 
    {
        require(_newOwner != address(0), "Invalid new owner address");
        require(_newOwner != documents[_bolNumber].owner, "New owner same as current owner");

        address previousOwner = documents[_bolNumber].owner;
        documents[_bolNumber].owner = _newOwner;
        
        emit OwnershipTransferred(_bolNumber, previousOwner, _newOwner);
        return true;
    }

    // Get document status
    function getDocumentStatus(uint256 _bolNumber) 
        public 
        view 
        documentExists(_bolNumber)
        returns (DocumentStatus) 
    {
        return documents[_bolNumber].status;
    }

    // Set document status
    function setDocumentStatus(uint256 _bolNumber, DocumentStatus _newStatus) 
        public 
        onlyDocumentOwner(_bolNumber)
        returns (bool) 
    {
        require(_newStatus != documents[_bolNumber].status, "New status same as current status");
        
        documents[_bolNumber].status = _newStatus;
        
        emit StatusChanged(_bolNumber, _newStatus);
        return true;
    }

    // Get full document details
    function getDocument(uint256 _bolNumber) 
        public 
        view 
        documentExists(_bolNumber)
        returns (
            string memory,
            string memory,
            uint256,
            string memory,
            string memory,
            uint256,
            DocumentStatus,
            address,
            bytes32
        ) 
    {
        Document storage doc = documents[_bolNumber];
        return (
            doc.shipFrom,
            doc.shipTo,
            doc.shipDate,
            doc.carrier,
            doc.cargoContent,
            doc.valueUSD,
            doc.status,
            doc.owner,
            doc.documentHash
        );
    }
}