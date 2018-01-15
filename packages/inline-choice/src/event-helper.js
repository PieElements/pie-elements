export function dispatchModelSetEvent(eventObj, data) {
  eventObj(new CustomEvent('model-set', {
    bubbles: true,
    composed: true,
    detail: data
  }));
}

export function dispatchSessionChangeEvent(eventObj, data) {
  eventObj(new CustomEvent('session-changed', {
    bubbles: true,
    composed: true,
    detail: data
  }));
}