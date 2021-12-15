import { useEffect, useState } from 'react'

export function useForm(initialState: Object, cb = function  (fields: any) {}) {
  const [fields, setFields] = useState(initialState)

  useEffect(() => {
    cb(fields)
  }, [fields])
  return [
    fields,
    function ({ target }: { target: HTMLInputElement }) {
      const field = target.name
      const value = isNumeric(target.value) ? +target.value : target.value
      setFields({ ...fields, [field]: value })
    },
    setFields,
  ]
}

function isNumeric(str: String) {
  if (typeof str != 'string') return false // we only process strings!
  return (
    !isNaN(str as any) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str))
  ) // ...and ensure strings of whitespace fail
}
