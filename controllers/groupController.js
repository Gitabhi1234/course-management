const groupModel = require("../models/group-model");
const ownerModel = require("../models/owner-model");
const userModel = require("../models/user-model");
const messageModel=require("../models/message-model")

module.exports.createGroup = async function (req, res) {
    try {
        let user = await ownerModel.findOne();
        let { name, group_id, description, } = req.body;

        let group = await groupModel.create({
            name,
            description,
            createdBy: user._id,
            members: [user.id],
            group_id,
        });
     

        req.flash("success", "Group created successfully");
        return res.redirect("/home");
    } catch (err) {
        res.status(500).send("Error creating group: " + err.message);
    }
};

module.exports.joinGroup = async function (req, res) {
    try {
        let { name, group_id } = req.body;
        let user = await userModel.findOne();
        const student=user._id;
        let group = await groupModel.findOne({name});
        if (group.name != name) {
            req.flash("success", "Group not found");
            return res.redirect("/homeUser");
        }
        if (group.group_id != group_id) {
            req.flash("success", "Invalid group ID");
            return res.redirect("/homeUser");
        }
        if (group.members.includes(student)) {
            req.flash("success", "You are already a member of this group");
            return res.redirect("/homeUser");
        }

        group.members.push(student);
        await group.save();
        req.flash("success", "Successfully joined the group");
        return res.redirect("/homeUser");
    } catch (err) {
        res.status(500).send("Error joining group: " + err.message);
    }
};
exports.chatgroup=async (req, res) => {
    try {
        let name=req.params.groupname;
        let user = await userModel.findOne();
        let groups = await groupModel.find();
      const group = await groupModel.find({name});
      if (!group) {
        req.flash("success", "Group not found");
        
        return res.redirect("/homeUser");
      }
  
      const messages = await messageModel.find({ group: group._id }).populate('user', 'name');
      
      res.render('chat', {
        group,
        messages,
        user, 
        groups,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
