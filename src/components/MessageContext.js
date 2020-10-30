import React from "react";
const MessageContext = React.createContext();
export const MessageProvider = MessageContext.Provider;
export const MessageConsumer = MessageContext.Consumer;
export default MessageContext;
