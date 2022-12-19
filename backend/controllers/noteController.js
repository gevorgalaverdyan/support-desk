const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc get  ticket's notes
// @route GET /api/tickets/:id/notes
const getNotes = asyncHandler(async (req, res) => {
  //get user in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorised');
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes);
});

// @desc add  ticket's notes
// @route POST /api/tickets/:id/notes
const addNote = asyncHandler(async (req, res) => {
  //get user in jwt
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorised');
  }

  const note = await Note.create({
    text: req.body.text,
    usStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(200).json(note);
});

module.exports = {
  getNotes,
  addNote
};
