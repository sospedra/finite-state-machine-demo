/* global fetch */
export const fetchUser = async () => {
  const response = await fetch('https://randomuser.me/api/')
  const payload = await response.json()
  const raw = payload.results.shift()

  return {
    name: `${raw.name.first} ${raw.name.last}`,
    gender: raw.gender === 'female' ? '🤷🏽‍♀️‍' : '🤷🏻‍♂️'
  }
}
