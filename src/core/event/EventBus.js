import { ObjUtil } from "../../utils/ObjUtil";
import { EventDispatcher } from "./EventDispatcher";

export const EventBus = ObjUtil.single(EventDispatcher);