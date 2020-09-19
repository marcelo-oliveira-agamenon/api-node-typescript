import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import Routes from "./routes/index";
class App {
  public express;
  public dotenv;

  public constructor() {
    this.express = express();
    this.dotenv = dotenv.config();
    this.middleware();
    this.routes();
  }

  private middleware(): void {
    this.express.use(express.json());
    this.express.use(cors());
  }

  private routes(): void {
    this.express.use(Routes);
  }
}

export default new App().express;
