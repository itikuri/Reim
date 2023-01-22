const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  
app.get("/", async (req, res) => {
    const response = await openai.createCompletion({
        model: "text-davinci-002",
        prompt: "Was reimt sich auf Schleim?",
        max_tokens: 10,
        });
    const rhyme = response.choices[0].text;
    res.send('The rhyme for "Schleim" is:');
   }
);
app.listen(process.env.PORT||3000)
