import { GraphQLLayoutService } from '@sitecore-jss/sitecore-jss-nextjs';
import config from 'temp/config';
import clientFactory from 'lib/graphql-client-factory';

export const layoutService = new GraphQLLayoutService({
  clientFactory,
  siteName: config.sitecoreSiteName,
  /*
      GraphQL endpoint may reach its rate limit with the amount of Layout and Dictionary requests it receives and throw a rate limit error.
      GraphQL Dictionary and Layout Services can handle rate limit errors from the server and attempt a retry on requests.
      For this, specify the number of retries the GraphQL client will attempt. 
      It will only try the request once by default.
      */
  retries:
    (process.env.GRAPH_QL_SERVICE_RETRIES && parseInt(process.env.GRAPH_QL_SERVICE_RETRIES, 10)) ||
    0,
});