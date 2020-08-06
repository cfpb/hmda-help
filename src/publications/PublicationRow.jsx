import React, { useState, useEffect } from 'react'
import LoadingIcon from '../Loading'
import { LABELS, TOPICS } from './constants'
import { fetchData } from '../utils/api'
import { DownloadButton } from './DownloadButton'
import { RegenerateButton } from './RegenerateButton'

const defaultState = {
  waiting: false,
  error: false,
  message: null
}

const regenMsg = (label) => 'Begin the regeneration process for ' + label + '?'

export const PublicationRow = ({
  notFound,
  fetched,
  institution,
  token,
  type,
  url,
  error
}) => {
  const label = LABELS[type]
  const topic = TOPICS[type]

  const { lei, respondentName, activityYear: year } = institution
  const latestURL = `/v2/filing/institutions/${lei}/filings/${year}/submissions/latest`
  const headers = { Authorization: `Bearer ${token}` }

  const [state, setState] = useState(defaultState)
  const [seqNum, setSeqNum] = useState(null)

  const updateState = newState => setState((oldState) => ({...oldState, ...newState }))
  const saveError = message => updateState({ waiting: false, error: true, message})

  // Determine if we are able to trigger a Regeneration
  useEffect(() => {
    fetchSequenceNumber(latestURL, { headers }, setSeqNum)
  }, [headers, setSeqNum, latestURL])

  const handleRegeneration = () => {
    if (window.confirm(regenMsg(label))) {
      updateState({ ...defaultState, waiting: true })

      triggerRegeneration(saveError, updateState, {
        seqNum,
        topic,
        lei,
        year,
        label,
        headers,
      })
    }
  }

  return (
    <tr>
      <td>{year}</td>
      <td>{respondentName}</td>
      <td>{label}</td>
      <td>
        {!fetched ? (
          <LoadingIcon />
        ) : error ? (
          error
        ) : (
          <DownloadButton url={url} />
        )}
      </td>
      <td>
        <RegenerateButton
          onClick={handleRegeneration}
          error={state.error}
          message={state.message}
          waiting={state.waiting}
          disabled={[null, undefined].indexOf(seqNum) > -1}
        />
      </td>
    </tr>
  )
}

// Sequence Number is required for Regeneration
function fetchSequenceNumber(url, options, setResult) {
  return fetchData(url, options)
    .then(({ error, response }) => {
      if (error) return {}
      return response.json()
    })
    .then((json) => {
      const sequenceNumber = json && json.id && json.id.sequenceNumber
      setResult(sequenceNumber)
    })
}

// Send a Kafka topic
function triggerRegeneration(onError, onSuccess, data) {
  const { seqNum, topic, lei, year, headers, label } = data
  const regenerationUrl = `/v2/admin/publish/${topic}/institutions/${lei}/filings/${year}/submissions/${seqNum}`

  // Trigger Publication regeneration
  return fetchData(regenerationUrl, { method: 'POST', headers })
    .then(({ error, message }) => {
      if (error) {
        onError(message)
        return
      }

      onSuccess({
        waiting: false,
        error: false,
        message: `Regeneration of ${year} ${label} triggered!`
      })
    })
    .catch((err) => onError(`Some other error: ${err}`))
}