const catchAsync = require("./../utils/catchAsync");
const Schoolarship = require("./../models/schoolarshipModel");

exports.getAllEntrySchoolarship = catchAsync(async (req, res, next) => {
  const schoolarships = await Schoolarship.find();
  res.status(201).json({
    status: "success",
    results: schoolarships.length,
    data: {
      schoolarships,
    },
  });
});

exports.createEntry = catchAsync(async (req, res, next) => {
  const newEntry = await Schoolarship.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      newEntry,
    },
  });
});

exports.updateEntry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const schoolarship = await Schoolarship.findByIdAndUpdate(id, req.body, {
    //this option with new set to true returns the updated tour
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { schoolarship },
  });
});

exports.deleteEntry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const deletedEntry = await Schoolarship.findByIdAndDelete(id);
  if (!deletedEntry)
    return res.status(201).json({
      status: "success",
      data: {
        message: "No Schoolarship found ",
      },
    });
  res.status(201).json({
    status: "success",
    data: {
      deletedEntry,
    },
  });
});

exports.getEntryByName = catchAsync(async (req, res, next) => {
  const firstname = req.params.name;
  const entry = await Schoolarship.find({ firstname: firstname });
  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.getEntryByRegNo = catchAsync(async (req, res, next) => {
  const regno = req.params.regno;
  const entry = await Schoolarship.find({ registrationNo: regno });
  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.sortByDate = catchAsync(async (req, res, next) => {
  const entry = await Schoolarship.aggregate([
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.sortByFresh = catchAsync(async (req, res, next) => {
  const entry = await Schoolarship.aggregate([
    {
      $sort: {
        type: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.sortByRenewal = catchAsync(async (req, res, next) => {
  const entry = await Schoolarship.aggregate([
    {
      $sort: {
        type: -1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});

exports.sortByPaid = catchAsync(async (req, res, next) => {
  const entry = await Schoolarship.aggregate([
    {
      $sort: {
        paid: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      entry,
    },
  });
});
