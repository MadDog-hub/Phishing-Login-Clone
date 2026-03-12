import { Router, type IRouter } from "express";
import healthRouter from "./health";
import phishRouter from "./phish";
import emailRouter from "./email";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/phish", phishRouter);
router.use("/phish", emailRouter);

export default router;
