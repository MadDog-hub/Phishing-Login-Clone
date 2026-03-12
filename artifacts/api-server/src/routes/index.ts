import { Router, type IRouter } from "express";
import healthRouter from "./health";
import phishRouter from "./phish";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/phish", phishRouter);

export default router;
