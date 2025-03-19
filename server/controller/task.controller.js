import csv from "csvtojson";
import xlsx from "xlsx";
import User from "../models/user.model.js";
import Errorhandler from "../utils/errorHandler.js";

export const uploadTaskCSV = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    let data = [];
    const filePath = `upload/${req.file.filename}`;

    // Read file content
    if (req.file.mimetype === "text/csv") {
      data = await csv().fromFile(filePath);
    } else {
      const workbook = xlsx.readFile(filePath);
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      data = xlsx.utils.sheet_to_json(sheet);
    }

    // Validate file content
    if (data.length === 0) {
      return res.status(400).json({ error: "Invalid or empty file" });
    }
    if (
      !data[0].hasOwnProperty("FirstName") ||
      !data[0].hasOwnProperty("Phone") ||
      !data[0].hasOwnProperty("Notes")
    ) {
      return next(new Errorhandler("Invalid format of the CSV", 401));
    }

    // Fetch all agents from the database
    const agents = await User.find({ isAdmin: false });
    if (agents.length === 0) {
      return res.status(400).json({ error: "No agents found in the database" });
    }

    // Distribute tasks among agents
    for (const [idx, item] of data.entries()) {
      const agentIdx = idx % agents.length;
      if (!agents[agentIdx].tasks) {
        agents[agentIdx].tasks = [];
      }
      agents[agentIdx].tasks.push(item);
    }

    // Update agents in the database
    await Promise.all(
      agents.map((agent) =>
        User.findByIdAndUpdate(agent._id, { tasks: agent.tasks })
      )
    );

    res.status(200).json({
      success: true,

      agents,
    });
  } catch (error) {
    console.error(error);
    return next(new Errorhandler("Something went wrong", 500));
  }
};
