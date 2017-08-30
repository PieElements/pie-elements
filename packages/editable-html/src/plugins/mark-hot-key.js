import keycode from 'keycode';

export default function MarkHotkey(options) {
  // Change the options to take a `key`.
  const { type, key, isAltKey = false } = options

  return {
    onKeyDown: (event, data, state) => {
      // Change the comparison to use the key name.
      if (!event.metaKey || keycode(event.which) != key || event.altKey != isAltKey) return
      event.preventDefault()
      return state
        .transform()
        .toggleMark(type)
        .apply()
    }
  }
}