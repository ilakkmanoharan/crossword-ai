
import axios from "axios";
import { supabase } from "./supabase";

const API_KEY = "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";

export const getCrosswordClues = async (topic) => {
  const prompt = `Generate a crossword puzzle with 5 clues for the topic: ${topic}. Format: {clue: "question", answer: "answer"}`;
  
  const response = await axios.post("https://api.openai.com/v1/completions", {
    model: "gpt-4",
    prompt,
    max_tokens: 200,
    temperature: 0.7,
  }, {
    headers: { Authorization: `Bearer ${API_KEY}` }
  });

  return JSON.parse(response.data.choices[0].text.trim());
};

export const saveCrossword = async (topic, clues) => {
  const { data, error } = await supabase
    .from("crosswords")
    .insert([{ topic, clues }]);
  if (error) console.error(error);
};
