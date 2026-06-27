import { Vocabulary } from "../models/index.js";

export const getVocals = async (req, res) => {
    const vocals = await Vocabulary.find();
    res.json({ success: true, data: { vocals: vocals }});
}