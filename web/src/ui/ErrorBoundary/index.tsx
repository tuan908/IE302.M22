import { Component, ErrorInfo, Fragment, ReactNode } from 'react';

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

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(`Uncaught error in component: ${error}, ${errorInfo}`);
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    const { isError } = this.state;
    if (isError) {
      return <h1>Sorry, there was an error</h1>;
    }
    return <Fragment>{this.props.children}</Fragment>;
  }
}

export default PinterestErrorBoundary;
