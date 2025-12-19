//Express
import { Router } from "express";
const router = Router();

//Multer
import { upload } from "../middlewares/multer.js";
import { managerproductos } from "../managers/product.js";

router.get('/realtimeproducts', (req, res) => {
    res.render('form');
});

router.post('/realtimeproducts', upload.single('image'), async (req, res) => {

  const producto = {
    title: req.body.title,
    image: req.file ? `/${req.file.filename}` : ''
  };

  await managerproductos.addProducto(producto);

  req.app.get('io').emit('productos', await managerproductos.getProd());
});

export default router;