import express from 'express';

import { Group } from '../../models/Group';
import validateGroupInput from '../../validation/group';
import { sessionChecker } from '../../utils/auth';

const router = express.Router();

// @route GET api/groups
// @desc Get all groups
// @access Private
router.get('/', sessionChecker, async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.session.userId });
    res.json(groups);
  } catch(err) {
    res.status(404).json({ nogroupsfound: 'No groups found' });
  }
})

// @route GET api/groups/:id
// @desc Get single group
// @access Private
router.get('/:id', sessionChecker, async (req, res) => {
  const group = await Group.findOne({ _id: req.params.id, createdBy: req.session.userId });

  if (group == null) {
    return res.status(404).json({ nogroupfound: 'No group found with that id' });
  }

  res.json(group);
})

// @route POST api/groups
// @desc Create a group
// @access Private
router.post('/', sessionChecker, async (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newGroup = new Group({ name: req.body.name, createdBy: req.session.userId });

  try {
    const group = await newGroup.save();
    res.json(group);
  } catch(err) {
    console.log(err);
  }
})

// @route PUT api/groups/:id
// @desc Update a group
// @access Private
router.put('/:id', sessionChecker, async (req ,res) => {
  const { errors, isValid } = validateGroupInput(req.body);
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const group = await Group.findOne({ _id: req.params.id, createdBy: req.session.userId });

  if (group == null) {
    return res.status(404).json({ nogroupfound: 'No group found with that id' });
  }

  group.name = req.body.name;

  try {
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch(err) {
    console.log(err);
  } 
})

// @route DELETE api/groups/:id
// @desc Delete a group
// @access Private
router.delete('/:id', sessionChecker, async (req, res) => {
  const group = await Group.findOne({ _id: req.params.id, createdBy: req.session.userId });

  if (group == null) {
    return res.status(404).json({ nogroupfound: 'No group found with that id' });
  }
  
  try {
    await group.remove();
    res.json({ success: true })  
  } catch (err) {
    return res.status(400).json(err);
  }
})

export default router;

