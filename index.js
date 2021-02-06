// initial load
  console.log("Loading..............................................................\n")

  // inputs

  const edis = [
    {documentTypeKey: 4,  description: 'ASN' },
    { documentTypeKey: 1, description: 'Invoice' },
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

  // derived from edis 
  let existingDocumentTypes = [...edis];
  console.log("Initial Existing Document Types:- \n",existingDocumentTypes,"\n")

  // derived from both existingDocumentTypes and documentTypes
  const getAvailableDocumentTypes = () => documentTypes.filter(
    (documentType) =>
      existingDocumentTypes.filter(
        (existingDocumentType) =>
          documentType.label === existingDocumentType.label
      ).length === 0
  );
  console.log("Initial Available Document Types:- \n",getAvailableDocumentTypes(),"\n")

  const saveEDI = () => existingDocumentTypes.map((doc)=>({documentTypeKey: doc.value, description:                             doc.label}));
/////////////////////////////////////////////////////////////////////////////////////
                                  // ADD \\
/////////////////////////////////////////////////////////////////////////////////////

  // user adds a new documentType
  // can add document only when they are available
  // have to figure ux flow and control as to how a user will add
  // this is just to check how the data can grow automatically
  const addEdi = { value: 2, label: 'PO' };
  console.log(".....................................................................\n")
  console.log("USER TRIES TO ADD A NEW DOCUMENT TYPE TO THE EXISTING DOCUMENT TYPES\n")
  console.log(`${JSON.stringify(addEdi)}\n`)
  console.log(".....................................................................\n")

  const checkIfDocumentIsAvailable = (existingDocumentType) =>
    getAvailableDocumentTypes().some(
      (availableDocumentType) => availableDocumentType.label === existingDocumentType.label
    );

  console.log(`USER SHOULD BE ABLE TO ADD: ${checkIfDocumentIsAvailable(addEdi)}`,"\n")

  existingDocumentTypes = checkIfDocumentIsAvailable(addEdi) ? [
    ...existingDocumentTypes,
    addEdi
  ] : [...existingDocumentTypes]

  console.log("New Existing Document Types:- \n",existingDocumentTypes,"\n")
  console.log("New Available Document Types:- \n",getAvailableDocumentTypes(),"\n")
  console.log("User Saves EDIS....\n")
  console.log("EDIS:- ",saveEDI(),"\n")
/////////////////////////////////////////////////////////////////////////////////////
                                //EDIT\\
/////////////////////////////////////////////////////////////////////////////////////

  // user edits a document type
  console.log(".....................................................................\n")
  console.log("USER EDITS A NEW DOCUMENT TYPE\n")
  console.log("NEED TO FIGURE OUT HOW\n")
  console.log(".....................................................................\n")

/////////////////////////////////////////////////////////////////////////////////////
                                //DELETE\\
/////////////////////////////////////////////////////////////////////////////////////

  // ********************** ADD Support for multiple deletes **********************

  // user removes a document type
  // this removed document type should be available
  const deleteEdi = { value: 4, label: 'ASN' };
  console.log(".....................................................................\n")
  console.log("USER REMOVES A NEW DOCUMENT TYPE\n")
  console.log(`${JSON.stringify(deleteEdi)}\n`)
  console.log(".....................................................................\n")

  // remove a single document from existingDocumentTypes
  existingDocumentTypes = existingDocumentTypes.filter((doc) => doc.value !== deleteEdi.value);
  // add document to availableDocumentTypes ?

  console.log("New Existing Document Types:- \n",existingDocumentTypes,"\n")
  console.log("New Available Document Types:- \n",getAvailableDocumentTypes(),"\n")
  console.log("User Saves EDIS....\n")
  console.log("EDIS:- ",saveEDI(),"\n")

/////////////////////////////////////////////////////////////////////////////////////
