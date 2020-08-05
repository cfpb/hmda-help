import React, { useState } from 'react'
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
}) => {
  const label = LABELS[type]
  const topic = TOPICS[type]
  const { lei, respondentName, activityYear: year } = institution

  const [state, setState] = useState(defaultState)
  const updateState = newState => setState((oldState) => ({...oldState, ...newState }))
  const saveError = message => updateState({ waiting: false, error: true, message})

  const handleRegeneration = () => {
    if (window.confirm(regenMsg(label))) {
      const latestURL = `/v2/filing/institutions/${lei}/filings/${year}/submissions/latest`
      const headers = { Authorization: `Bearer ${token}` }

      updateState({ ...defaultState, waiting: true })

      fetchLatestSubmission(latestURL, { headers }, saveError)
        .then((json) =>
          triggerRegeneration(saveError, updateState, {
            json,
            topic,
            lei,
            year,
            label,
            headers,
          })
        )
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
        ) : fetched && notFound ? (
          "No file"
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
        />
      </td>
    </tr>
  )
}

// Fetch the latest Filing to get the require Submission sequenceNumber
function fetchLatestSubmission(url, options, onError) {
  return fetchData(url, options)
  .then(({ error, response }) => {
    if (error) {
      onError('Error reaching the /latest endpoint')
      return {}
    }

    return response.json()
  })
}

// Send a Kafka topic
function triggerRegeneration(onError, onSuccess, data) {
  const { json, topic, lei, year, headers, label } = data
  const sequenceNumber = json && json.id && json.id.sequenceNumber
  const regenerationUrl = `/v2/admin/publish/${topic}/institutions/${lei}/filings/${year}/submissions/${sequenceNumber}`

  if (!sequenceNumber) {
    onError(`No Submissions exist for ${year}`)
    return
  }

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