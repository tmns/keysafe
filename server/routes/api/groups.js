import express from "express";

import { Group } from "../../models/Group";
import validateGroupInput from "../../validation/group";
import validateKeyInput from "../../validation/key";
import { sessionChecker } from "../../utils/auth";

const router = express.Router();

// @route GET api/groups
// @desc Get all groups
// @access Private
router.get("/", sessionChecker, async (req, res) => {
  try {
    const groups = await Group.find({ createdBy: req.session.userId });
    res.json(groups);
  } catch (err) {
    res.status(404).json({ nogroupsfound: "No groups found" });
  }
});

// @route GET api/groups/:id
// @desc Get single group
// @access Private
router.get("/:id", sessionChecker, async (req, res) => {
  const group = await Group.findOne({
    _id: req.params.id,
    createdBy: req.session.userId
  });

  if (group == null) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  res.json(group);
});

// @route POST api/groups
// @desc Create a group
// @access Private
router.post("/", sessionChecker, async (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const newGroup = new Group({
    name: req.body.name,
    createdBy: req.session.userId
  });

  try {
    const group = await newGroup.save();
    res.json(group);
  } catch (err) {
    console.log(err);
  }
});

// @route PUT api/groups/:id
// @desc Update a group
// @access Private
router.put("/:id", sessionChecker, async (req, res) => {
  const { errors, isValid } = validateGroupInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const group = await Group.findOne({
    _id: req.params.id,
    createdBy: req.session.userId
  });

  if (group == null) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  group.name = req.body.name;

  try {
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (err) {
    console.log(err);
  }
});

// @route DELETE api/groups/:id
// @desc Delete a group
// @access Private
router.delete("/:id", sessionChecker, async (req, res) => {
  const group = await Group.findOne({
    _id: req.params.id,
    createdBy: req.session.userId
  });

  if (group == null) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  try {
    await group.remove();
    res.json({ success: true });
  } catch (err) {
    return res.status(400).json(err);
  }
});

// @route POST api/groups/key/:group_id
// @desc Create a new key
// @access Private
router.post("/key/:group_id", sessionChecker, async (req, res) => {
  const { errors, isValid } = validateKeyInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  const group = await Group.findOne({
    _id: req.params.group_id,
    createdBy: req.session.userId
  });

  if (!group) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  const newKey = {
    title: req.body.title,
    username: req.body.username,
    password: req.body.password,
    url: req.body.url
  };

  group.keys.unshift(newKey);

  const groupWithKeyAdded = await group.save();
  res.json(groupWithKeyAdded);
});

// @route PUT api/groups/key/:group_id/:key_id
// @desc Updates a key
// @access Private
router.put("/key/:group_id/:key_id", sessionChecker, async (req, res) => {
  const group = await Group.findOne({
    _id: req.params.group_id,
    createdBy: req.session.userId
  });

  if (!group) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  let key = group.keys.filter(
    key => key._id.toString() == req.params.key_id
  )[0];

  if (!key) {
    return res.status(404).json({ nokeyfound: "No key found with that id" });
  }

  key.title = req.body.title != "" ? req.body.title : key.title;
  key.username = req.body.username != "" ? req.body.username : key.username;
  key.password = req.body.password != "" ? req.body.password : key.password;
  key.url = req.body.url != "" ? req.body.url : key.url;

  try {
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (err) {
    console.log(err);
  }
});

// @route DELETE /api/groups/key/:group_id/:key_id
// @desc Delete a key
// @access Private
router.delete("/key/:group_id/:key_id", sessionChecker, async (req, res) => {
  const group = await Group.findOne({
    _id: req.params.group_id,
    createdBy: req.session.userId
  });

  if (!group) {
    return res
      .status(404)
      .json({ nogroupfound: "No group found with that id" });
  }

  if (
    group.keys.filter(key => key._id.toString() == req.params.key_id).length ==
    0
  ) {
    return res.status(404).json({ nokeyfound: "No key found with that id" });
  }

  const indexToRemove = group.keys
    .map(key => key._id.toString())
    .indexOf(req.params.key_id);

  group.keys.splice(indexToRemove, 1);

  try {
    const updatedGroup = await group.save();
    res.json(updatedGroup);
  } catch (err) {
    console.log(err);
  }
});

export default router;
