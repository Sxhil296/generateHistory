// import openai from 'openai';
import { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPEN_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateParagraph = async (input) => {
  const response = await openai.Completion.create({
    engine: 'davinci',
    prompt: `Generate a historical paragraph about "${input}"`,
    max_tokens: 100,
    n: 1,
    stop: '\n',
  });
  return response.choices[0].text.trim();
};

const generateImage = async (input) => {
  const response = await openai.Image.create({
    model: 'image-alpha-001',
    prompt: `Generate an image related to ${input} in history`,
  });
  return response.data.url;
};

export default async (req, res) => {
  const { input } = req.query;
  const [paragraph, image] = await Promise.all([generateParagraph(input), generateImage(input)]);
  res.status(200).json({ paragraph, image });
};
