import { baseUrl } from '../../config'

export default function LibCurl(url, post, onResult) {
  fetch(baseUrl + url, {
    method: post ? 'POST' : 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: post ? JSON.stringify(post) : undefined
  })
    .then((res) => res.json())
    .then((output) => {
      onResult(output)
    }).catch((err) => {
      console.log(err)
    })
}