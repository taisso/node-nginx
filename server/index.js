import express from "express";
import { MysqlConnection } from "./db.js";

const app = express();
const port = 8080;
const mysqlConnection = new MysqlConnection();
mysqlConnection.connect();

const insertPeople = (queryFunc) => {
  const sql = `INSERT INTO people (name) VALUES('Pedro'), ('Ana'), ('Bia')`;
  return queryFunc(sql)
}

const getPeopleList = async (queryFunc) => {
  const selectSql = "SELECT * FROM people";
  return queryFunc(selectSql).then((results) => getFormatPeople(results));
};

const getFormatPeople = (results) => {
  let data = "<ul>";
  results.forEach(({ name }) => {
    data += "<li>" + name + "</li>";
  });
  data += "</ul>";
  return data;
};

app.get("/", async (_req, res) => {
  const query = mysqlConnection.getQuery();
  insertPeople(query)

  return getPeopleList(query).then((data) => {
    mysqlConnection.end();
    return res.send(`
      <h1>Full Cycle Rocks!</h1>
      </br>
      ${data}
   `);
  });
});

app.listen(port, () => console.log("Server started"));
