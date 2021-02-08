const configDataFromContainer = {
  edisInDB: [
    { documentTypeKey: 6, description: 'Remittance Advice', statusKey: 0 },
    { documentTypeKey: 4, description: 'ASN', statusKey: 0 },
    { documentTypeKey: 1, description: 'Invoice', statusKey: 0 },
    // { documentTypeKey: 5,  description: 'Claim', statusKey: 0 },
    // { documentTypeKey: 2, description: 'PO', statusKey: 0 },
    // { documentTypeKey: 3, description: 'PO Acknowledgement Status', statusKey: 0 },
  ],
  documentTypesInDB: [
    { documentTypeKey: 1, description: 'Invoice' },
    { documentTypeKey: 2, description: 'PO' },
    { documentTypeKey: 3, description: 'PO Acknowledgement Status' },
    { documentTypeKey: 4, description: 'ASN' },
    { documentTypeKey: 5, description: 'Claim' },
    { documentTypeKey: 6, description: 'Remittance Advice' }
  ],
  statusesInDB: [
    { key: 1, value: 'Test' }
  ]
}

module.exports = configDataFromContainer;
