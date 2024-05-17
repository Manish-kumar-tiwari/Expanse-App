const DataUriParse=require('datauri/parser.js');
const path = require('path');

const CreateDataUri=(file)=>{
        const parser=new DataUriParse();
        const extension=path.extname(file.originalname);
        return parser.format(extension,file.buffer);
}

module.exports=CreateDataUri;

