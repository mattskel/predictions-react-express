export function setPredictions(data) {

  // process.env doesn't work in react (unless you are using create-react-app)
  // React runs on the browser so cannot keep our secrets
  // This is why we use proxy servers... https://unicorn-utterances.com/posts/keeping-api-keys-secret-in-react-apps
  // From react we should instead request the proxy server
  // The proxy server can then go onto make the request with the secret
  return fetch('/api/predictions/form/submit', {
    method: 'post',
    // body: JSON.stringify({ values: [[team, brownlow]] }),
    body: JSON.stringify(data),
    headers: {'Content-Type': 'application/json'}
  })
    .then(response => response.text());
}

export function getQuestions() {
  return fetch('/api/predictions/form/questions', {
    method: 'get',
  })
    .then(response => response.text())
}