'use client'
import { ReactNode } from "react";
import { StompSessionProvider } from "react-stomp-hooks";

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <StompSessionProvider url={"http://localhost:8080/ws"}>
      {children}
    </StompSessionProvider>
  );
};

export default Provider;
