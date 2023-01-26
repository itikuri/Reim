const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const app = express();
app.use(express.urlencoded({ extended: true })); // this line is required to process the textarea input

// Use the API key from the environment variable
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

app.get("/", (req, res) => {
  res.send(`
    <form action="/" method="post">
      <textarea rows="20" cols="70" name="prompt">generate as a response only a JSON object without any descriptive free text. the json object shall have this format: {"Qs": [ {}, {}, ...] } containing 2 multiple choice questions, where each question has the following format: {"Q": "string", "MC": ["string","string"], "A": "string"} with the following story: "Es war einmal ein Huhn. Das hatte nichts zu tun. Es legte jeden Tag ein Ei und Sonntags auch mal zwei.
      Das Huhn hieß Agatha und pickte Würmer. Der Sohn vom Bauern fing das Huhn und warf es in die Luft, sodass es zu Boden flattern musste."</textarea>
      <button type="submit">Submit</button>
    </form>
  `);
});

app.post("/", async (req, res) => {
  const prompt = req.body.prompt;
  try {
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 100,
        });
    const questions = response.data.choices[0].text;
    res.send(`
        <p>Questions:<br>${questions}</p>
    `);
  } catch (err) {
    console.log(err);
  }
});
app.listen(process.env.PORT||3000)
