import React from "react";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="footer">
        <p className="footer__copyright"> &#169; 2022 Mesto Russia</p>
      </footer>
    );
  }
}
