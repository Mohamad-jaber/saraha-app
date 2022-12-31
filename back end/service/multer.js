import multer from 'multer'
import { nanoid } from 'nanoid'
import fs from 'fs'
import path from 'path'
import {dirname} from 'path'
import { fileURLToPath } from 'url'
const __dirname = dirname(fileURLToPath(import.meta.url));
export const DetectError = (err,req,res,next)=>{

    if(err){
        res.status(400).json({message:'multer error',err});
    }else{
        next();
    }
}

export const validationTypes = {
    image: ['image/jpeg','image/png','image/jpg'],
    pdf:['application/pdf']
}

export  function myMulter(customePath,customValidation){
    
    console.log(customePath);
    if(!customePath){
        customePath='genaral'
    }

    const fullPath = path.join(__dirname,`../uploads/${customePath}`)
    if(!fs.existsSync(fullPath)){
        fs.mkdirSync(fullPath)
    }

    const storage = multer.diskStorage({
        destination:  function (req, file, cb) {
            cb(null, `uploads/${customePath}`)
          },
          filename:function(req,file,cb){
            cb(null,nanoid() +Date.now() + '_'+file.originalname);
          }
        })
        function fileFilter(req,file,cb){
            if(customValidation.includes(file.mimetype)){
                cb(null,true);
            }else{
                cb('invalid image format',false);
            }
        }
        const upload =  multer({dest:fullPath,fileFilter,storage});
        return upload;
}