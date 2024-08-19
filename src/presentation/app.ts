import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { merge } from 'lodash';
import { ruruHTML } from 'ruru/server';
import { port } from '../config/env';
import productResolver from './graphql/resolvers/productResolver';
import userResolver from './graphql/resolvers/userResolver';
import schema from './graphql/schema/userSchema';

const app = express();

const mergedResolvers = merge(userResolver, productResolver);

app.all(
    '/graphql',
    createHandler({
        schema: schema,
        rootValue: mergedResolvers,
    }),
);

app.get('/', (_req: express.Request, res: express.Response) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
});
