import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs, resolvers } from './graphql';
import { getUser } from './services';

const app = express();
app.set('port', process.env.PORT || 3000);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => {
        const token = req.headers.authorization || '';
        // try to retrieve a user with the token
        const user = getUser(token);
        // add the user to the context
        return { user };
    },
    introspection: true,
    playground: true
});
server.applyMiddleware({ app });

app.use((req, res, next) => {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(
    (
        err: { status: number; message: string },
        req: any,
        res: {
            locals: { error: any };
            status: (arg0: any) => void;
            send: (arg0: object) => void;
        },
        next: any
    ) => {
        res.locals.error = err;
        const status = err.status || 500;
        res.status(status);
        res.send({
            message: err.message,
            error: err
        });
    }
);

app.listen(app.get('port'), (err: any) => {
    if (err) {
        // tslint:disable-next-line: no-console
        return console.error(err);
    }

    // tslint:disable-next-line: no-console
    console.log(
        `🚀 Server ready at http://localhost:${app.get('port')}${
            server.graphqlPath
        }`
    );
    // tslint:disable-next-line: no-console
    return console.log(
        `server is listening on  http://localhost:${app.get('port')}`
    );
});
