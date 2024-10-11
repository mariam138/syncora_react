import React from 'react'
import { useRouteError } from 'react-router-dom'

function ErrorPage() {

    const error = useRouteError();
    console.log(error)
  return (
      <div>
          <h1>Error Page</h1>
          <p>{error.statusText || error.message}</p>
    </div>
  )
}

export default ErrorPage