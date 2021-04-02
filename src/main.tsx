// Hyperstatic runtime
import { hyperstatic, onRouteChanged, Options } from 'hyperstatic'

// Root view
import Loader from '/components/core/Loader'
import App from '/components/core/App'
import { highLight } from '/effects'

const routes = {
  '/': import('./pages/HomePage'),
  // '/concepts': import('./pages/MainConceptsPage'),
  '/docs': import('./pages/DocsPage'),
  '/counter': import('./pages/CounterPage'),
  '/characters': import('./pages/CharacterList'),
  '/characters/:id': import('./pages/CharacterDetails'),
  '/:splat*': import('./pages/NotFoundPage')
}

// All of these are optional
const options: Options = {
  baseUrl: '/', // Path prefix
  loader: Loader, // Custom loading indicator in case of slow networks
  // eagerLoad: false
}

hyperstatic({
  routes,
  options,
  init: [{}, highLight()],
  view: App,
  node: document.getElementById('app'),
  subscriptions: (state) => {
    console.log('State: ', state)
    return [
      onRouteChanged((state) => [state, highLight()])
    ]
  }
})
