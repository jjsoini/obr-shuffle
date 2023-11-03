import "./style.css";
import OBR from "@owlbear-rodeo/sdk";
import { setupContextMenu } from "./contextMenu";

OBR.onReady(() => {
  setupContextMenu();
});
