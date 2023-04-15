import {BrowserRouter, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import NotFound from './components/NotFound'
import SignUp from './components/SignUp'
import LoginForm from './components/LoginForm'
import ProtectedRoute from './components/ProtectedRoute'

const App = () => (
  <div className="App-Container">
    <BrowserRouter>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />
        <Route exact path="/signup" component={SignUp} />
        <Route exact path="/login" component={LoginForm} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </div>
)

export default App
