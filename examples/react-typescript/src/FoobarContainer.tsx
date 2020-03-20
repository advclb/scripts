import React, { ReactNode, Component } from "react";
import "./FoobarContainer.css";

export interface FoobarContainerProps {
  children: ReactNode;
}

interface FoobarContainerState {
  active?: boolean;
}

export default class FoobarContainer extends Component<
  FoobarContainerProps,
  FoobarContainerState
> {
  state: FoobarContainerState = { active: false };

  render() {
    const { children } = this.props;
    const { active } = this.state;
    return (
      <div className={active ? "foobar--active" : "foobar--inactive"}>
        {children}
      </div>
    );
  }
}
