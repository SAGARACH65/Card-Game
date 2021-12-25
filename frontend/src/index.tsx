import { ApolloProvider } from '@apollo/client';
import ReactDOM from 'react-dom';

import './styles/index.css';

import App from 'App';
import { DEFAULT_LANGUAGE } from 'constants/common';
import ConnectedIntlProvider from 'components/ConnectedIntlProvider';

import client from './apolloConfig';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ConnectedIntlProvider locale={DEFAULT_LANGUAGE}>
      <App />
    </ConnectedIntlProvider>
  </ApolloProvider>,
  document.getElementById('root')
);
