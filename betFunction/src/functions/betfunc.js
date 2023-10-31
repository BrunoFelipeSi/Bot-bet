const executaColeta = require('./arbetyGetData.js')
const { app } = require('@azure/functions');

app.http('betfunc', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: async (request, context) => {
        context.log(`Http function processed request for url "${request.url}"`);

        return { body: `${executaColeta.pushArrayItens()}` };
    }
});

executaColeta.run()