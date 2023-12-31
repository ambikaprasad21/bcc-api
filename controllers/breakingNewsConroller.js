const catchAsync = require("./../utils/catchAsync");
const BreakingNews = require("./../models/breakingNewsModel");

exports.getBreakNews = catchAsync(async (req, res, next) => {
  const news = await BreakingNews.find().sort({ _id: -1 });
  res.status(200).json({
    status: "success",
    data: {
      news,
    },
  });
});

exports.createBreakNews = catchAsync(async (req, res, next) => {
  const news = await BreakingNews.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      news,
    },
  });
});

exports.deleteBreakNews = catchAsync(async (req, res, next) => {
  await BreakingNews.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
  });
});
