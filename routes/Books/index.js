import express from "express";
import pkg from "duckdb";
const app = express();
app.use(express.json());

import booksDetailsRoutes from "./BooksDetailsRoutes.js";

app.use('/books-details', booksDetailsRoutes);

export default app;