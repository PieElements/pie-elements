import msg from './tt';
export default class extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `${msg} This is a stub config pane!`;
  }
}