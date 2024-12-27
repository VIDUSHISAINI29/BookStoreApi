import {Router} from "express";
import { getBooksDetails } from "../../controllers/BooksDetailsController.js";

const router = Router();
router.get('/', getBooksDetails);
export default router;