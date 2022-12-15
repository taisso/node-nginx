import mysql from "mysql";
import { promisify } from "util"

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

export class MysqlConnection {
  #connection = null;

  constructor() {
    this.#connection = mysql.createConnection(config);
  }

  getQuery() {
    return promisify(this.#connection.query.bind(this.#connection));
  }

  end() {
    this.#connection.end();
  }
}
