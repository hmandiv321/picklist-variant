
  // inputs
  const edis = [
    // { documentTypeKey: 6, description: 'Remittance Advice' },
    {documentTypeKey: 4,  description: 'ASN' },
    {documentTypeKey: 1, description: 'Invoice' },
    // {documentTypeKey: 5,  description: 'Claim' },
    // { documentTypeKey: 2, description: 'PO' },
    {documentTypeKey: 3, description: 'PO Acknowledgement Status'},
  ].map((doc)=> ({value: doc.documentTypeKey, label: doc.description}));

  const documentTypes = [
    {documentTypeKey: 1,  description: 'Invoice' },
    {documentTypeKey: 2,  description: 'PO' },
    {documentTypeKey: 3, description: 'PO Acknowledgement Status'},
    {documentTypeKey: 4,  description: 'ASN' },
    {documentTypeKey: 5,  description: 'Claim' },
    { documentTypeKey: 6, description: 'Remittance Advice' }
  ].map((doc)=> ({value: doc.documentTypeKey, label: doc.description}));

  const addEdi = { value: 6, label: 'Remittance Advice' };
  const deleteEdi = [{ value: 6, label: 'Remittance Advice' },{value: 5,  label: 'Claim' }]; 
  const editEdi = { value: 1, label: 'Invoice' }; 

  // derived from edis 
  let existingDocumentTypes = [...edis];

  // derived from both existingDocumentTypes and documentTypes
  const getAvailableDocumentTypes = () => documentTypes.filter(
    (documentType) =>
      existingDocumentTypes.filter(
        (existingDocumentType) =>
          documentType.value === existingDocumentType.value
      ).length === 0
  );

  const isDocumentAvailable = (existingDocumentType) =>
    getAvailableDocumentTypes().some(
      (availableDocumentType) => availableDocumentType.value === existingDocumentType.value
    );

  const edit = (currentDocumentType, newDocumentType) => {
     isDocumentAvailable(newDocumentType)
      ? existingDocumentTypes = [
          ...existingDocumentTypes.filter(
            (doc) => doc.value !== currentDocumentType.value
          ),
          newDocumentType,
        ]
      : existingDocumentTypes;
  }

  const saveEDI = () => existingDocumentTypes.map((doc)=>({documentTypeKey: doc.value, description: doc.label}));
/////////////////////////////////////////////////////////////////////////////////////
                                  // ADD \\
/////////////////////////////////////////////////////////////////////////////////////

  existingDocumentTypes = isDocumentAvailable(addEdi) ? [
    ...existingDocumentTypes,
    addEdi
  ] : existingDocumentTypes;

/////////////////////////////////////////////////////////////////////////////////////
                                //EDIT\\
/////////////////////////////////////////////////////////////////////////////////////

  edit(editEdi, getAvailableDocumentTypes()[0]);

/////////////////////////////////////////////////////////////////////////////////////
                                //DELETE\\
/////////////////////////////////////////////////////////////////////////////////////

  // remove multiple documentTypes
    existingDocumentTypes = existingDocumentTypes.filter(
      (existingDocumentType) =>
        deleteEdi.filter(
          (documentTypesToDelete) =>
            existingDocumentType.value === documentTypesToDelete.value
        ).length === 0
    );

/////////////////////////////////////////////////////////////////////////////////////