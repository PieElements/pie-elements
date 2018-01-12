import InlineChoices from "./inline-choice.jsx";
import React from "react";
import ReactDOM from "react-dom";

export default class InlineChoice extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._rerender = () => {
      if(this._model && this._session) {
        let elem = React.createElement(InlineChoices, {
          model : this._model,
          session : this._session
        });
        ReactDOM.render(elem, this);

      }
    };
  }

  set model(m) {
    this._model = m;
    this._rerender();
  }

  set session(s) {
    this._session = s;
    this._rerender();
  }

  get session() {
    return this._session;
  }

  connectedCallback() {
    this._rerender();
  }

}