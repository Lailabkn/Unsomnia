import { NextApiRequest } from "next";
import { NextApiResponseWithLocals } from "../../../types/types";
import {createRouter} from "next-connect";
import loginStatus from "../../../middleware/loginStatus";
import extractJWT from "../../../middleware/extractJWT";
import { deleteAlarm } from "../../../controller/alarm.controller";

const router = createRouter<NextApiRequest, NextApiResponseWithLocals>()
router.use(extractJWT).use(loginStatus(true)).delete(deleteAlarm);

export default router.handler();