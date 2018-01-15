import InlineChoice from "./inline-choice.jsx";
import React from "react";
import ReactDOM from "react-dom";
import {dispatchModelSetEvent, dispatchSessionChangeEvent} from "./event-helper";

export default class RootInlineChoice extends HTMLElement {

  constructor() {
    super();
    this._model = null;
    this._session = null;
    this._rerender = () => {
      if(this._model && this._session) {
        let elem = React.createElement(InlineChoice, {
          model : this._model,
          session : this._session,
          onChoiceChange : this._handleChoiceChange.bind(this)
        });
        ReactDOM.render(elem, this);
      }
    };
  }

  set model(m) {
    this._model = m;
    let checkModelDefined = this._model !== undefined;
    dispatchModelSetEvent(this.dispatchEvent, {hasModel:checkModelDefined});
    this._rerender();
  }

  set session(s) {
    this._session = s;
    dispatchSessionChangeEvent(this.dispatchEvent, {});
    this._rerender();
  }

  get session() {
    return this._session;
  }

  _handleChoiceChange(selectedChoice) {
    this.session.selectedChoice = selectedChoice;
    dispatchSessionChangeEvent(this.dispatchEvent, {selectedChoice : selectedChoice});
    this._rerender();
  }

  connectedCallback() {
    this._rerender();
  }

}