import Main from "./main.jsx"
import React from "react";
import ReactDOM from "react-dom";
import {ModelSetEvent, SessionChangedEvent} from "@pie-libs/pie-player-events";

export default class RootExtendedTextEntry extends HTMLElement {

  constructor(){
    super();
    this._model = null;
    this._session = null;
    this._rerender = () => {
      if(this._model && this._session) {
        let elem = React.createElement(Main, {
          model : this._model,
          session : this._session
        });
        ReactDOM.render(elem, this);
      }
    };
  }

  set model(m) {
    this._model = m;
    this.dispatchEvent(
      new ModelSetEvent(this.tagName.toLowerCase(), this.session, !!this._model)
    );
    this._rerender();
  }

  set session(s){
    this._session = s;
    this.dispatchEvent(
      new SessionChangedEvent(this.tagName.toLowerCase(), this.session)
    );
    this._rerender();
  }

  get session() {
    return this._session;
  }

  connectedCallback() {
    this._rerender();
  }
}
