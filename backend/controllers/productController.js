const Product = require("../models/productmodel");
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncError = require("../middleware/catchAsyncError");
const ApiFeatures = require("../utils/apiFeatures");


//Create Product -- Admin
exports.createProducts = catchAsyncError(async (req,res,next)=>{
    const product  = await Product.create(req.body);
    res.status(201).json({
        success:true,
        product
    })//201 created
});


//Get All Product
exports.getAllProducts = catchAsyncError(async (req, res)=>{

    const resultPerPage = 5;
    const productCount = await Product.countDocuments();

    const apiFeature = new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultPerPage);
    const products = await apiFeature.query;
    res.status(200).json({  
        success:true,
        products
    });
});


//Get Product Detail
exports.getProductDetail = catchAsyncError(async (req,res,next) =>{
    const product = await Product.findById(req.params.id);

    if (!product){
       return next(new ErrorHandler("Product not found",404));
    }

    res.status(200).json({
        success: true,
        product,
        productCount
    })

});


//Update Product --Admin
exports.updateProduct = catchAsyncError(async (req,res,next)=>{
    let product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler("Product not found",404));
     }
        product = await Product.findByIdAndUpdate(req.params.id,req.body,{
            new : true,
            runValidators: true,
            useFindAndModify: false
        });
        res.status(200).json({
            success:"true",
            product
        })
});


//Delete Product
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
    
    const product = await Product.findById(req.params.id);

    if (!product){
        return next(new ErrorHandler("Product not found",404));
     }

    await product.deleteOne();

    return res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    });
});