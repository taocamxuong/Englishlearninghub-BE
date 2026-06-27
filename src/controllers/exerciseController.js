import { Exercise } from "../models/index.js";

export const getExercises = async (req, res) => {
    const exercises = await Exercise.find();
    res.json({ success: true, data: { exercises: exercises }});
}