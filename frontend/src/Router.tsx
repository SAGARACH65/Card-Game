import { Route, BrowserRouter, Switch } from 'react-router-dom';

import GameController from 'components/game/GameController';
import * as routes from 'constants/routes';

const RouterView = () => (
  <BrowserRouter>
    <Switch>
      <Route path={routes.GAME_PAGE} component={GameController} />
    </Switch>
  </BrowserRouter>
);

export default RouterView;
