import React from "react";

interface IAddressContext {
  address: null | string;
  setAddress: (address: string) => void;
}

export const addressContext = React.createContext<IAddressContext>({
  address: null,
  setAddress: () => {}
});
