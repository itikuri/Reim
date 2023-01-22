const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();

// Use the API key from the environment variable
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
app.get("/", async (req, res) => {
  try {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: "Was reimt sich auf Schleim?",
        max_tokens: 20,
        });
    const rhyme = response.data.choices[0].text;
    res.send(`
        The rhyme for "Schleim" is: ${rhyme}</p>
    `);
  } catch (err) {
    console.log(err);
  }
});
app.listen(process.env.PORT||3000)
