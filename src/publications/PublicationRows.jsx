import React, { useEffect, useState } from 'react'
import { PublicationRow } from './PublicationRow'
import { fileExists } from '../utils/file'

const defaultPubState = { fetched: false, url: null, error: null }

const PublicationRows = ({ institution, token }) => {
  const [mlar, setMlar] = useState({ ...defaultPubState })
  const [irs, setIrs] = useState({ ...defaultPubState })
  const [loading, setLoading] = useState(true)
  const { lei, activityYear } = institution

  useEffect(() => {
    if (!loading) return
    const env = !!window.location.host.match(/^ffiec/) ? 'prod' : 'dev'
    const baseUrl = "https://s3.amazonaws.com/cfpb-hmda-public/"

    const irsUrl = `${baseUrl}${env}/reports/disclosure/${activityYear}/${lei}/nationwide/IRS.csv`
    const mlarUrl = `${baseUrl}${env}/modified-lar/${activityYear}/${lei}.txt`

    const targets = [
      { url: irsUrl, setter: setIrs },
      { url: mlarUrl, setter: setMlar },
    ]

    // Check if Publications exist
    targets.forEach(({ url, setter}) => {
      fileExists(url)
        .then(() =>
          setter(() => ({
            ...defaultPubState,
            fetched: true,
            url,
          }))
        )
        .catch((status) => {
          let error = status === 0 ? "CORS Error" : "No file"
          setter((state) => ({ ...state, fetched: true, error }))
        })
    })
  }, [lei, activityYear, loading])

  useEffect(() => {
    if (irs.fetched && mlar.fetched) setLoading(false)
  }, [irs, mlar, setLoading])

  return (
    <>
      <PublicationRow
        type="mlar"
        institution={institution}
        token={token}
        {...mlar}
      />
      <PublicationRow
        type="irs"
        institution={institution}
        token={token}
        {...irs}
      />
    </>
  )
}

export default PublicationRows