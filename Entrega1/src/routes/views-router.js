 //Express
import { Router } from "express";
const router = Router();
 
router.get('/realtimeproducts', (req, res) => {
    res.render('form');
});

export default router;