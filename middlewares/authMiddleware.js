// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que el encabezado Authorization esté presente y tenga formato válido
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verifica y decodifica el token usando la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Puedes almacenar el ID o la info del admin en req para usarla luego
    req.admin = decoded;

    next(); // Pasa al siguiente middleware o ruta protegida
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};
