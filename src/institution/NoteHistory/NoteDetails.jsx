import React, { useEffect } from 'react'

const NoteDetails = ({ className, diff, id, isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        document
          .getElementById(id)
          .scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }, 300)
    }
  }, [isOpen, id])

  return (
    <div id={id} className={className}>
      <DiffTable json={diff} />
    </div>
  )
}

const DiffTable = ({ json }) => {
  const keys = json && Object.keys(json)
  if (!keys || (keys.length === 1 && keys.indexOf('notes') === 0))
    return <NoChanges />
  
  if (json.LEI) return <NoChanges text="Start of History" />

  return (
    <>
      <table className='diff-table'>
        <DiffTableHeader />
        <DiffTableBody json={json} />
      </table>
      <pre className='json'>{JSON.stringify(json, null, 2)}</pre>
    </>
  )
}

const DiffTableHeader = () => (
  <thead>
    <tr>
      <td>Field</td>
      <td>Old Value</td>
      <td>New Value</td>
    </tr>
  </thead>
)

const DiffTableBody = ({ json }) => {
  return (
    <tbody>
      {Object.keys(json).map((key, idx) => {
        if (key === 'notes') return null
        const current = json[key]

        if (current && current.newVal) {
          return (
            <tr key={`${key}-${idx}`}>
              <td>{key}</td>
              <td>{checkForNone(current.oldVal)}</td>
              <td>{current.newVal}</td>
            </tr>
          )
        }
        else if (typeof current !== 'string') {
          return Object.keys(current).map(nestedKey => {
            const nestedCurrent = json[key][nestedKey]
            return (
              <tr key={`${key}-${idx}`}>
                <td>{key} {nestedKey}</td>
                <td>{checkForNone(nestedCurrent.oldVal)}</td>
                <td>{nestedCurrent.newVal}</td>
              </tr>
            )
          })
        }
        else return null
    })}
    </tbody>
  )
}

function checkForNone(val) {
  if([null, undefined].indexOf(val) > -1) return '<none>'
  return val
}

const NoChanges = ({ text = 'No Changes' }) => {
  return <div className="no-changes">{text}</div>
}

export default NoteDetails