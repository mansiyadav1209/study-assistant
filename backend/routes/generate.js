import express from "express";
import { generateStudyMaterial } from "../services/geminiService.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { notes } = req.body;

    if (!notes?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Notes are required.",
      });
    }

    // Generate flashcards + quiz in one API call
    const result = await generateStudyMaterial(notes);

    // Validate AI response
    if (
      !result ||
      !Array.isArray(result.flashcards) ||
      !Array.isArray(result.quiz)
    ) {
      return res.status(500).json({
        success: false,
        message: "Invalid AI response format.",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
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
      message: error.message || "Failed to generate study material.",
    });
  }
});

export default router;