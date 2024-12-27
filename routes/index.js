import express from "express";
const router = express.Router();

import booksDetailsIndex from './Books/index.js'

router.use('/', booksDetailsIndex);

export default router;