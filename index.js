// initial load
  console.log("Loading..............................................................\n")

  // inputs
  const edis = [
    {documentTypeKey: 4,  description: 'ASN' },
    {documentTypeKey: 1, description: 'Invoice' },
    {documentTypeKey: 5,  description: 'Claim' },
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
  console.log("Initial Existing Document Types:- \n",existingDocumentTypes,"\n")

  // derived from both existingDocumentTypes and documentTypes
  const getAvailableDocumentTypes = () => documentTypes.filter(
    (documentType) =>
      // returns true for document type that does not exist in existingDocumentTypes
      existingDocumentTypes.filter(
        (existingDocumentType) =>
          documentType.value === existingDocumentType.value
      ).length === 0
  );
  console.log("Initial Available Document Types:- \n",getAvailableDocumentTypes(),"\n")

  const checkIfDocumentIsAvailable = (existingDocumentType) =>
    getAvailableDocumentTypes().some(
      (availableDocumentType) => availableDocumentType.value === existingDocumentType.value
    );
  
  const edit = (currentDocumentType, newDocumentType) => {
    !checkIfDocumentIsAvailable(currentDocumentType) &&
     checkIfDocumentIsAvailable(newDocumentType)
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

  // user adds a new documentType
  // can add document only when they are available
  // have to figure ux flow and control as to how a user will add
  // this is just to check how the data can grow automatically
  console.log(".....................................................................\n")
  console.log("USER TRIES TO ADD A NEW DOCUMENT TYPE TO THE EXISTING DOCUMENT TYPES\n")
  console.log(`${JSON.stringify(addEdi)}\n`)
  console.log(".....................................................................\n")

  console.log(`USER SHOULD BE ABLE TO ADD: ${checkIfDocumentIsAvailable(addEdi)}`,"\n")

  existingDocumentTypes = checkIfDocumentIsAvailable(addEdi) ? [
    ...existingDocumentTypes,
    addEdi
  ] : existingDocumentTypes

  console.log("New Existing Document Types:- \n",existingDocumentTypes,"\n")
  console.log("New Available Document Types:- \n",getAvailableDocumentTypes(),"\n")
  console.log("User Saves EDIS....\n")
  console.log("EDIS:- ",saveEDI(),"\n")
/////////////////////////////////////////////////////////////////////////////////////
                                //EDIT\\
/////////////////////////////////////////////////////////////////////////////////////
  // have to figure ux flow and control as to how a user will edit
  // this is just to check how the data can be switched automatically
  // user edits a document type
  console.log(".....................................................................\n")
  console.log("USER EDITS A DOCUMENT TYPE\n")
  console.log(`Replaces ${JSON.stringify(editEdi)}\n`)
  console.log(`Adds ${JSON.stringify(getAvailableDocumentTypes()[0])}\n`)
  console.log(".....................................................................\n")

  edit(editEdi, getAvailableDocumentTypes()[0]);

  console.log("New Existing Document Types:- \n",existingDocumentTypes,"\n")
  console.log("New Available Document Types:- \n",getAvailableDocumentTypes(),"\n")
  console.log("User Saves EDIS....\n")
  console.log("EDIS:- ",saveEDI(),"\n")
/////////////////////////////////////////////////////////////////////////////////////
                                //DELETE\\
/////////////////////////////////////////////////////////////////////////////////////

  // have to figure ux flow and control as to how a user will delete
  // this is just to check how the data can shrink automatically
  // user removes a document type
  // this removed document type should be available
  console.log(".....................................................................\n")
  console.log("USER REMOVES DOCUMENT TYPE/s\n")
  console.log(`${JSON.stringify(deleteEdi)}\n`)
  console.log(".....................................................................\n")

  // remove a single document from existingDocumentTypes
    // existingDocumentTypes = existingDocumentTypes.filter((doc) => doc.value !== deleteEdi.value);
  // remove multiple documentTypes
    existingDocumentTypes = existingDocumentTypes.filter(
      (existingDocumentType) =>
        // returns true for document type that does not exist in existingDocumentTypes
        deleteEdi.filter(
          (documentTypesToDelete) =>
            existingDocumentType.value === documentTypesToDelete.value
        ).length === 0
    );
  // add document to availableDocumentTypes ?

  console.log("New Existing Document Types:- \n",existingDocumentTypes,"\n")
  console.log("New Available Document Types:- \n",getAvailableDocumentTypes(),"\n")
  console.log("User Saves EDIS....\n")
  console.log("EDIS:- ",saveEDI(),"\n")

/////////////////////////////////////////////////////////////////////////////////////