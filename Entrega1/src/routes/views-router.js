//Express
import { Router } from "express";
const router = Router();

//Multer
import { upload } from "../middlewares/multer.js";
import { managerproductos } from "../managers/productmanager.js";

router.get('/realtimeproducts', (req, res) => {
    res.render('form');
});

router.post('/realtimeproducts', upload.single('image'), async (req, res) => {
  await managerproductos.addProduct({
    ...req.body,
    image: req.file ? `${req.file.filename}` : null
  });
  const productos = await managerproductos.getProd();
  req.app.get('io').emit('productos', productos);
});

export default router;