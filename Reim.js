const openai = require("openai");
const express = require("express");
const app = express();

// Use the API key from the environment variable
openai.apiKey = process.env.OPENAI_API_KEY;

app.get("/", async (req, res) => {
  const prompt = "Was reimt sich auf Summe";

  // Set the endpoint to text-davinci-002
  const options = {
    endpoint: "text-davinci-002",
    prompt: prompt,
    maxTokens: 100,
  };

  try {
//    const response = await openai.createCompletion(options);
//    const rhyme = response.choices[0].text;
    const rhyme = "testing";
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
app.listen(process.env.PORT || 3000)

