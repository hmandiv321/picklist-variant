// get configObject, spread data as needed to a local reference

    const configDataFromRunner = {
      edi: {
        documentTypeKey: 4,
        description: 'ASN',
        statusKey: 1,
        value: 4,
        label: 'ASN',
      },
      // has to be defaulted to emtpy array
      documentTypes: [
        { value: 1, label: 'Invoice' },
        { value: 2, label: 'PO' },
        { value: 3, label: 'PO Acknowledgement Status' },
        { value: 4, label: 'ASN' },
        { value: 5, label: 'Claim' },
        { value: 6, label: 'Remittance Advice' },
      ],
      statuses: [{ value: 0, label: 'Test' }],
    };


  module.exports = {
    addEdi: null || { documentTypeKey: 0 },
    replaceEdi : null || { documentTypeKey: 0 }
  };