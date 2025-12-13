export const productvalidator = (req, res, next) => {
    const { title, description, code, price, status, stock, category } = req.body;
    console.log(req.body);
    if (!title || !description || !code || !price || status == null || !stock || !category) {
        return res.status(400).json({ error: 'Faltan rellenar campos, todos son obligatorios.' });
    }
    next();
}