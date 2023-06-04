import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez personnaliser l'affichage de l'erreur ici
      return (
        <div>
          <h1>Une erreur s'est produite.</h1>
          <p>{this.state.error.toString()}</p>
          <div>{this.state.errorInfo.componentStack}</div>
        </div>
      );
    }
    return this.props.children;
  }
}
