import plMessages from "@/messages/pl.json";

export type Messages = Record<string, string>;

export const messages = plMessages satisfies Messages;
