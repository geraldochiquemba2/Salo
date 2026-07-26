import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import candidateRouter from "./candidate";
import recruiterRouter from "./recruiter";
import featuresRouter from "./features";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(candidateRouter);
router.use(recruiterRouter);
router.use(featuresRouter);

export default router;
