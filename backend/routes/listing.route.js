import  express from "express";
import { createListing, deleteListing, getListing, updateListing } from "../controller/listing.control.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/create',verifyToken, createListing)
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);

export default router;