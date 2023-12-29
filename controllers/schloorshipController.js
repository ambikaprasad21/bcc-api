const catchAsync = require("./../utils/catchAsync");
const Schoolarship = require("./../models/schoolarshipModel");

exports.getAllEntrySchoolarship = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.find().sort({ _id: -1 });
  res.status(201).json({
    status: "success",
    results: doc.length,
    data: {
      heading: "All Schoolarship Form Data Table",
      doc,
    },
  });
});

exports.createEntry = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.updateEntry = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const doc = await Schoolarship.findByIdAndUpdate(id, req.body, {
    //this option with new set to true returns the updated tour
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: { doc },
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
  const doc = await Schoolarship.find({ firstname: firstname });
  if (doc.length === 0) {
    return res.status(200).json({
      status: "success",
      data: {
        heading: `No Data Found For Name: ${firstname} `,
        doc,
      },
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      heading: `Data For Name: ${firstname}`,
      doc,
    },
  });
});

exports.getEntryByRegNo = catchAsync(async (req, res, next) => {
  const regno = req.params.regno;
  const doc = await Schoolarship.find({ registrationNo: regno });
  if (doc.length === 0) {
    return res.status(200).json({
      status: "success",
      data: {
        heading: `No Data Found For Registration Number: ${regno}`,
        doc,
      },
    });
  }
  res.status(200).json({
    status: "success",
    data: {
      heading: `Data For Registration Number: ${regno}`,
      doc,
    },
  });
});

exports.sortByDate = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.aggregate([
    {
      $sort: {
        date: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      heading: "Sorted By Date",
      doc,
    },
  });
});

exports.sortByFresh = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.aggregate([
    {
      $sort: {
        type: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      heading: "Sorted By Fresh",
      doc,
    },
  });
});

exports.sortByRenewal = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.aggregate([
    {
      $sort: {
        type: -1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      heading: "Sorted By Renewal",
      doc,
    },
  });
});

exports.sortByPaid = catchAsync(async (req, res, next) => {
  const doc = await Schoolarship.aggregate([
    {
      $sort: {
        paid: 1,
      },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      heading: "Sorted By Payment",
      doc,
    },
  });
});
