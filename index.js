// import express from "express";
// import { graphqlHTTP } from "express-graphql";
// import schema from "./schema";
import express from "express";
import graphqlHTTP from "express-graphql";
import { schema } from "./schema";

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

app.listen(5000, () => {
  console.log("is listening 5000");
});
