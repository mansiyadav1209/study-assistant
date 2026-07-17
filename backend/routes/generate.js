import express from "express";
import { generateFlashcards } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const { notes } = req.body;

        if (!notes?.trim()) {
            return res.status(400).json({
                message: "Notes are required."
            });
        }

        const result = await generateFlashcards(notes);

        res.json({
            success: true,
            data: result
        });

    } catch (error) {

       console.error("========== GOOGLE ERROR ==========");

        if (error.response) {
            console.error(JSON.stringify(error.response.data, null, 2));
        } else {
            console.error(error);
        }

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }

});

export default router;