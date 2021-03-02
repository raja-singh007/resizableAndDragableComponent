const mongoose = require('mongoose');
const responseObjectClass = require('../helpers/responseObjectClass');
const catchAsync = require('../helpers/catchAsync');
const AppError = require('../helpers/AppError');
const compData = require('../models/components')
const newResponseObject = new responseObjectClass();

//****CRUD 
//Create
const dataAdd = catchAsync(async(req,res,next)=>{
    let {
        name,
        email,
        phone,
        compCategory,
    }= req.body;
    let compObj = {
        name,email,phone,compCategory
    }
    let dataSave = await new compData(compObj).save();
    if(!dataSave) return next(new AppError('Data was not saved!!',409));

    const returnObj = newResponseObject.create({
    success: true,
    code: 200,
    message: 'Saved Succesfully',
    data: dataSave,
  });
  return res.send(returnObj);
});

const dataDel = catchAsync(async(req,res,next)=>{
    let{query:{compCategory}}= req;

    const data = await compData.deleteMany({compCategory});
    if(!data) return next(new AppError('data not deleted',409))
    
    const returnObj = newResponseObject.create({
    success: true,
    code: 200,
    message: 'Deleted Successfully',
  });
  return res.send(returnObj);
});

const dataGet = catchAsync(async(req,res,next)=>{
    let{query:{compCategory}}= req;

    const data = await compData.find({compCategory}).lean();
    if(!data) return next(new AppError('data not found for this Component',404))
    console.log(data)
    const returnObj = newResponseObject.create({
    success: true,
    code: 200,
    message: 'Data Found',
    data: data,
  });
  return res.send(returnObj);
});

const dataUpdate = catchAsync(async(req,res,next)=>{
    let{body:{
        name,email,phone,dataId
    }}=req;

    let dataUpdate = await compData.findByIdAndUpdate({_id:dataId},{$set:{name,email,phone}});
    if (!dataUpdate) return next(new AppError('Update failed', 500));
    const returnObj = newResponseObject.create({
    success: true,
    code: 200,
    message: 'Data Updated',
  });
  return res.send(returnObj);
});

module.exports= {
  dataAdd,
  dataGet,
  dataDel,
  dataUpdate,
};