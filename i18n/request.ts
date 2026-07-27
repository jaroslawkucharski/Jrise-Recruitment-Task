import { getRequestConfig } from "next-intl/server";
import { messages } from "@/i18n/messages";

export default getRequestConfig(async () => {
  return {
    locale: "pl",
    messages,
  };
});
