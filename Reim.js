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
        model: "text-davinci-002",
        prompt: "Was reimt sich auf Schleim?",
        max_tokens: 10,
        });
    const rhyme = response.choices[0].text;
    console.log(rhyme);
    res.send(`
    <html>
      <body>
        <p>The rhyme for "Summe" is: ${rhyme}</p>
      </body>
    </html>
    `);
  } catch (err) {
    console.log(err);
  }
});
app.listen(process.env.PORT||3000)
