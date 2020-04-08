import React, { ReactNode } from "react";
import "./Foobar.css";

export type FoobarProps = {
  children: ReactNode;
};

export default function Foobar({ children }: FoobarProps) {
  return <div>{children}</div>;
}
