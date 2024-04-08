import { orderManager } from "../../data/mongo/manager.mongo.js";
import { Router } from "express";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const one = await orderManager.create(data);
    return res.status(201).json({
      statusCode: 201,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    let filter = {};
    if (req.query.user_id) {
      filter = { user_id: req.query.user_id };
    }
    const all = await orderManager.read({ filter });
    return res.status(200).json({
      statusCode: 200,
      response: all,
    });
  } catch (error) {
    return next(error);
  }
});

router.get("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const one = await orderManager.readOne(oid);
    return res.status(200).json({
      statusCode: 200,
      response: one,
    });
  } catch (error) {
    return next(error);
  }
});

router.put("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const updates = req.body;

    // Verificar si la orden existe
    const order = await orderManager.readOne(oid);
    if (!order) {
      return res.status(404).json({
        statusCode: 404,
        message: "Orden no encontrada",
      });
    }

    // Aplicar las actualizaciones a la orden
    const updatedOrder = await orderManager.update(oid, updates);
    return res.status(200).json({
      statusCode: 200,
      response: updatedOrder,
    });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:oid", async (req, res, next) => {
  try {
    const { oid } = req.params;
    const response = await orderManager.destroy(oid);
    return res.status(200).json({
      statusCode: 200,
      response,
    });
  } catch (error) {
    return next(error);
  }
});

// Método para obtener el reporte de facturación
router.get("/bills/:uid", async (req, res, next) => {
  try {
    const { uid } = req.params;
    const report = await orderManager.reportBill(uid);
    return res.status(200).json({
      statusCode: 200,
      response: report,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
