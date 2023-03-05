import { getCookie, setCookie } from "cookies-next";

import { requestForToken } from "@/services/Firebase";

export const tokenHandler = () => {
  const fcmToken = getCookie("fcm_token") as string;

  if (fcmToken === "" || !fcmToken) {
    requestForToken().then((currentToken) => {
      if (currentToken !== fcmToken) setCookie("fcm_token", currentToken);
    });
  }
};
