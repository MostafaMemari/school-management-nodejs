// model , populate

const advancedResult = (model, populate) => {
  return async (req, res, next) => {
    let Query = model.find();
    // convert query string to number
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const skip = (page - 1) * limit;
    const total = await model.countDocuments();
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // Filtering / searching
    if (req.query.name) {
      Query = Query.find({
        name: { $regex: req.query.name, $options: "i" },
      });
    }

    // poppulate
    if (populate) {
      Query = Query.populate(populate);
    }

    // pagination result
    const pagination = {};
    // add next
    if (endIndex < total) pagination.next = { page: page + 1, limit };
    // add prev
    if (startIndex > 0) pagination.prev = { page: page - 1, limit };

    const results = await Query.find().limit(limit).skip(skip).select("-password");

    res.result = {
      total,
      pagination,
      results: results.length,
      status: "success",
      message: "results fetched Successfully",
      data: results,
    };

    next();
  };
};

module.exports = {
  advancedResult,
};
