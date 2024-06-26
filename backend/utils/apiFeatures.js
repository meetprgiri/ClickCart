class ApiFeatures {
    constructor(query,queryStr){
        this.query = query;
        this.queryStr = queryStr;
    };

    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: 'i',
            },
        }:{}

        this.query = this.query.find({ ...keyword })
        return this;
    };

    filter() {
        const queryCopy = { ...this.queryStr}; //spread operator... to actually copy or it gives refernce which also chagnes qerystr

        //Removing some fields for Category
        const removeField = ["keyword","page","limit"];

        removeField.forEach(key=>delete queryCopy[key]);

        //Filter for Price and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));//.parse to change string to object and stringigy for object to string

        //this.query=product.find()
        this.query = this.query.find(queryCopy);
        return this;
    };

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        
        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
};

module.exports = ApiFeatures;