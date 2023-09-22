import formatTodosForAI from "./formatTodosForAI";

const fetchSuggestion = async (board: Board) => {
  const todos = formatTodosForAI(board);

  console.log("FORMATTED TODOS TO SEND: ", todos);

  const res = await fetch("/api/generateSummary", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ todos }),
  });


  const GPTdata = await res.json();

  console.log("GPTdata: ", GPTdata);
  const { content } = GPTdata;

  console.log(content);

  return content;
};

export default fetchSuggestion;

