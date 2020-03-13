import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import 'bulma'
import Notifications, { notify } from 'react-notify-toast'

import Home from './components/common/Home'
import UserProfile from './components/auth/UserProfile'
import TeamShow from './components/teams/TeamShow'
import TeamCreate from './components/teams/TeamCreate'

const App = () => (
  <BrowserRouter>
    <>
      <Notifications />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/profile/:id" component={UserProfile} />
        <Route exact path="/teams/create" component={TeamCreate} />
        <Route exact path="/teams/:id" component={TeamShow} />
      </Switch>
    </>
  </BrowserRouter>
)

export default App