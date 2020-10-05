import React, { useState, useEffect } from 'react'

export default function App() {
  const [email, setEmail] = useState('not fetched yet')

  useEffect(() => {
    const url = `${window._env.APP_URL}/users/1`
    console.log('fetching user from', url)

    window
      .fetch(url)
      .then(r => r.json())
      .then(user => {
        console.log('fetched user %o', user)
        setEmail(user.email)
      })
  })

  return (
    <div>
      <p>Fetched user {email}</p>
    </div>
  )
}
