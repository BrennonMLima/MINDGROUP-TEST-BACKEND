import * as express from "express";
import { Request, Response, NextFunction } from "express";
import protectedRoute from "../security/guard";
import { ProductService } from "../services/products.service";

const router = express.Router();

router.get(
  "/",
  protectedRoute,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const products = await ProductService.getAllProducts();
      return res.send({ products: products });
    } catch (error) {
      return res
        .status(500)
        .send({ message: "Erro ao consultar tabela de produto." });
    }
  }
);

router.get("/:id", protectedRoute, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await ProductService.getProductById(id);
    return res.send({ products: product });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Erro ao consultar tabela de produto." });
  }
});

router.post("/", protectedRoute, async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const product = await ProductService.createProduct(body);
    return res.status(201).send({ product: product });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao criar produto." });
  }
});

router.put("/:id", protectedRoute, async (req: Request, res: Response) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const product = await ProductService.updateProduct(id, body);
    return res.status(201).send({ products: product });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao editar produto." });
  }
});

router.delete("/:id", protectedRoute, async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await ProductService.deleteProduct(id);
    res.status(202).send({ message: "Produto excluído com sucesso." });
  } catch (error) {
    return res.status(500).send({ message: "Erro ao excluir produto." });
  }
});

export default router;
