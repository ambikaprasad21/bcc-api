const Notification = require("./../models/notificationModel");
const catchAsync = require("./../utils/catchAsync");

exports.getNotifi = catchAsync(async (req, res, next) => {
  const msg = await Notification.find().sort({ _id: -1 });
  res.status(201).json({
    status: "success",
    data: {
      msg,
    },
  });
});

exports.createNotifi = catchAsync(async (req, res, next) => {
  const msg = await Notification.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      msg,
    },
  });
});

exports.getNotifiById = catchAsync(async (req, res, next) => {
  const msg = await Notification.findById(req.params.id);
  res.status(201).json({
    status: "success",
    data: {
      msg,
    },
  });
});

exports.updateNotifiById = catchAsync(async (req, res, next) => {
  const msg = await Notification.findByIdAndUpdate(
    req.params.id,
    {
      read: req.body.read,
    },
    {
      new: true,
    }
  );

  res.status(201).json({
    status: "success",
    data: {
      msg,
    },
  });
});

exports.deleteNotifi = catchAsync(async (req, res, next) => {
  const msg = await Notification.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: {
      msg,
    },
  });
});
