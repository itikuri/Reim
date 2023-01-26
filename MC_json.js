const { Configuration, OpenAIApi } = require("openai");
const express = require("express");

const app = express();
app.use(express.urlencoded({ extended: true })); // this line is required to process the textarea input

// Use the API key from the environment variable
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

const ai_command = `generate as a response only a JSON object without any descriptive free text. the json object shall have this format: {"Qs": [ {}, {}, ...] } containing 2 multiple choice questions, where each question has the following format: {"Q": "string", "MC": ["string","string"], "A": "string"} with the following story: `
app.get("/", (req, res) => {
  res.send(`
    <p>Multiple Choice Fragen zu einer Geschichte</p>
    <form action="/" method="post">
      <textarea rows="20" cols="70" name="prompt"></textarea><br>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/", async (req, res) => {
  let story = req.body.prompt
  const prompt = ai_command + `"` + story + `"`;

  try {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        });
    const questions = response.data.choices[0].text;
    let Fragen = JSON.parse(questions);
    let Geschichte = {"Geschichte": story}
    let jsonObject = Object.assign({}, Geschichte, Fragen);
    let output = JSON.stringify(jsonObject, null, 4)
    res.send(`
        <pre>${output}</pre>
    `);
  } catch (err) {
    console.log(err);
  }
});
app.listen(process.env.PORT||3000)
