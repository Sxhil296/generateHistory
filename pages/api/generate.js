// // import openai from 'openai';
// import { NextApiRequest, NextApiResponse } from "next";
// import { Configuration, OpenAIApi } from "openai";

// const configuration = new Configuration({
//   apiKey: process.env.OPEN_API_KEY,
// });
// const openai = new OpenAIApi(configuration);

// const generateParagraph = async (input) => {
//   const response = await openai.Completion.create({
//     // const completion = await openai.createCompletion({
//     engine: 'davinci',
//     prompt: `Generate a historical paragraph about "${input}"`,
//     max_tokens: 100,
//     n: 1,
//     stop: '\n',
//   });
//   return response.choices[0].text.trim();
// };

// const generateImage = async (input) => {
//   const response = await openai.Image.create({
//     model: 'image-alpha-001',
//     prompt: `Generate an image related to ${input} in history`,
//   });
//   return response.data.url;
// };

// export default async (req, res) => {
//   const { input } = req.query;
//   const [paragraph, image] = await Promise.all([generateParagraph(input), generateImage(input)]);
//   res.status(200).json({ paragraph, image });
// };







// const OpenAI = require('openai');
// const dotenv = require('dotenv');

// dotenv.config();

// const openai = new OpenAI(process.env.OPENAI_API_KEY);
// // console.log(process.env.OPENAI_API_KEY); 

// export default async function handler(req, res) {
//   const { input } = req.body;

//   try {
//     const paragraph = await generateParagraph(input);
//     const image = await generateImage(input);

//     res.status(200).json({ paragraph, image });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Something went wrong' });
//   }
// }

// const generateParagraph = async (input) => {
//   const response = await openai.completions.create({
//     engine: 'davinci',
//     prompt: `Generate a historical paragraph about "${input}"`,
//     max_tokens: 100,
//     n: 1,
//     stop: '\n',
//   });
//   return response.choices[0].text.trim();
// };

// const generateImage = async (input) => {
//   const response = await openai.images.create({
//     model: 'image-alpha-001',
//     prompt: `Generate an image related to ${input} in history`,
//   });
//   return response.data[0].url;
// };








import openai from 'openai';

const generateParagraphAndImage = async (input) => {
  const prompt = `In 100 words or less, write a paragraph about ${input} and generate an image related to history based on that input.`;
  
  try {
    // Get OpenAI API key from environment variables
    const apiKey = process.env.OPENAI_API_KEY;
    
    // Initialize OpenAI API client
    const client = new openai(apiKey);
    
    // Generate text using OpenAI GPT-3
    const response = await client.completions.create({
      engine: 'text-davinci-002',
      prompt,
      max_tokens: 100,
      n: 1,
      stop: '\n',
    });
    
    // Extract generated text from response
    const generatedText = response.data.choices[0].text;
    
    // Generate image using OpenAI DALL-E
    const imageResponse = await client.images.create({
      model: 'image-alpha-001',
      prompt,
      size: '512x512',
    });
    
    // Extract image URL from response
    const imageUrl = imageResponse.data.data.url;
    
    // Return generated text and image URL
    return { text: generatedText, imageUrl };
  } catch (error) {
    console.error(error);
    throw new Error('Failed to generate paragraph and image.');
  }
};

export default async function handler(req, res) {
  const { input } = req.query;

  try {
    const result = await generateParagraphAndImage(input);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).send(error.message);
  }
}
