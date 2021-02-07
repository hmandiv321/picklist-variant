const { addEdi, replaceEdi } = require('./form');
// initial load
console.log("Loading..............................................................\n")


// inputs
const configDataFromContainer = {
  // has to be defaulted to emtpy array
  edis: [
    { documentTypeKey: 6, description: 'Remittance Advice', statusKey: 0 },
    { documentTypeKey: 4, description: 'ASN', statusKey: 0 },
    // {documentTypeKey: 1, description: 'Invoice', statusKey: 0 },
    // {documentTypeKey: 5,  description: 'Claim', statusKey: 0 },
    // { documentTypeKey: 2, description: 'PO', statusKey: 0 },
    { documentTypeKey: 3, description: 'PO Acknowledgement Status', statusKey: 0 },
  ],
  // has to be defaulted to emtpy array
  documentTypes: [
    { documentTypeKey: 1, description: 'Invoice' },
    { documentTypeKey: 2, description: 'PO' },
    { documentTypeKey: 3, description: 'PO Acknowledgement Status' },
    { documentTypeKey: 4, description: 'ASN' },
    { documentTypeKey: 5, description: 'Claim' },
    { documentTypeKey: 6, description: 'Remittance Advice' }
  ],
  statuses: [
    { key: 0, value: 'Test' }
  ]
}

// has to be defaulted to emtpy array
let edis = [...configDataFromContainer.edis].map((doc) => ({ ...doc, value: doc.documentTypeKey, label: doc.description }));
console.log("Initial Existing Document Types:- \n", edis, "\n")

// has to be defaulted to emtpy array
const documentTypes = [...configDataFromContainer.documentTypes].map((doc) => ({ ...doc, value: doc.documentTypeKey, label: doc.description }));

const deleteEdi = [addEdi, replaceEdi];
const ediToEdit = {
  documentTypeKey: 4,
  description: 'ASN',
  statusKey: 0,
  value: 4,
  label: 'ASN',
};

// derived from both edis and documentTypes
const getAvailableDocumentTypes = () => documentTypes.filter(
  (documentType) =>
    // returns true for document type that does not exist in edis
    edis.filter(
      (edi) =>
        documentType.documentTypeKey === edi.documentTypeKey
    ).length === 0
);
console.log("Initial Available Document Types:- \n", getAvailableDocumentTypes(), "\n")

const isDocumentAvailable = (edi) =>
  getAvailableDocumentTypes().some(
    (availableDocumentType) => availableDocumentType.documentTypeKey === edi.documentTypeKey
  );

const update = (edi) => [
  ...edis,
  ...getAvailableDocumentTypes().filter((doc) => doc.documentTypeKey === edi.documentTypeKey).map((doc) => ({ ...doc, statusKey: edi.statusKey }))
]

const saveEDI = () => edis.map((doc) => ({ documentTypeKey: doc.value, description: doc.label, statusKey: doc.statusKey }));
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

console.log(`USER SHOULD BE ABLE TO ADD: ${isDocumentAvailable(addEdi)}`, "\n")

edis = update(addEdi);

console.log("New Existing Document Types:- \n", edis, "\n")
console.log("New Available Document Types:- \n", getAvailableDocumentTypes(), "\n")
console.log("User Saves EDIS....\n")
console.log("EDIS:- ", saveEDI(), "\n")
/////////////////////////////////////////////////////////////////////////////////////
//EDIT\\
/////////////////////////////////////////////////////////////////////////////////////
// have to figure ux flow and control as to how a user will edit
// this is just to check how the data can be switched automatically
// user edits a document type
console.log(".....................................................................\n")
console.log("USER EDITS A DOCUMENT TYPE\n")
console.log(`Replaces ${JSON.stringify(ediToEdit)}\n`)
console.log(`Adds ${JSON.stringify(replaceEdi)}\n`)
console.log(".....................................................................\n")

edis = update(replaceEdi)

console.log("New Existing Document Types:- \n", edis, "\n")
console.log("New Available Document Types:- \n", getAvailableDocumentTypes(), "\n")
console.log("User Saves EDIS....\n")
console.log("EDIS:- ", saveEDI(), "\n")
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

// remove multiple documentTypes
edis = edis.filter(
  (edi) =>
    // returns true for document type to delete that does not exist in edis
    deleteEdi.filter(
      (documentTypesToDelete) =>
        edi.documentTypeKey === documentTypesToDelete.documentTypeKey
    ).length === 0
);

console.log("New Existing Document Types:- \n", edis, "\n")
console.log("New Available Document Types:- \n", getAvailableDocumentTypes(), "\n")
console.log("User Saves EDIS....\n")
console.log("EDIS:- ", saveEDI(), "\n")

/////////////////////////////////////////////////////////////////////////////////////