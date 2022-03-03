import { Component, ErrorInfo, ReactNode } from 'react';

interface State {
  isError?: boolean;
}

interface Props {
  children?: ReactNode;
}

class PinterestErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { isError: false };
  }

  componentDidCatch(_: Error, __: ErrorInfo) {
    console.error(`Uncaught error in component: ${_}, ${__}`);
  }

  refreshPage() {
    window.location.reload();
  }

  render(): ReactNode {
    const { isError } = this.state;
    if (isError) {
      <h1>Sorry, there was an error</h1>;
    }
    return this.props.children;
  }
}

export default PinterestErrorBoundary;
