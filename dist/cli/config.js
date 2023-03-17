import { envSchema } from 'env-schema';
const environmentVariablesSchema = {
    type: 'object',
    required: ['URL'],
    properties: {
        URL: {
            type: 'string'
        }
    }
};
export const config = envSchema({
    schema: environmentVariablesSchema,
    dotenv: false
});
//# sourceMappingURL=config.js.map