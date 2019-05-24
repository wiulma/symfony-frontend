import React from 'react';

import './_styles.scss';

interface HeaderProps {
  title: string
}

export class ContentHeader extends React.Component<HeaderProps, {}> {

  constructor(props: HeaderProps) {
    super(props);
  }

  render() {
    return (
      <div className="header-container w-100">
        <h3>{this.props.title}</h3>
      </div>
    );
  }
}