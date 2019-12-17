import React from 'react'
import FILING_PERIODS from '../constants/dates'
import Alert from '../Alert'
import { Link } from 'react-router-dom'

export const InstitutionNotFound = ({ notFound }) => {
  if (notFound.length !== FILING_PERIODS.length) return null

  return (
    <Alert
      type="error"
      heading="Institution not found"
      message="That institution doesn't exist. Would you like to add it?"
    >
      <>
        {notFound.sort(byYear).map((nf, idx) => (
          <Link
            key={idx}
            to={{
              pathname: `/add`,
              state: { institution: { lei: nf.lei, activityYear: nf.year } }
            }}
          >
            <br />
            {`Add ${nf.lei} for ${nf.year}`}
            <br />
          </Link>
        ))}
      </>
    </Alert>
  )
}

function byYear(a, b) {
  if (a.year === b.year) return 0
  if (a.year > b.year) return -1
  return 1
}
