import postgres from "postgres";
import { singleton } from "tsyringe";

export class DatabaseOptions {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;

  constructor({ host, port, user, password, database }: DatabaseOptions) {
    this.host = host;
    this.port = port;
    this.user = user;
    this.password = password;
    this.database = database;
  }
}

@singleton()
class Database {
  sql: postgres.Sql<{}>;

  constructor(private options: DatabaseOptions) {
    this.sql = postgres({
      host: options.host,
      database: options.database,
      username: options.user,
      password: options.password,
      port: options.port,
    });
  }
}

export default Database;
