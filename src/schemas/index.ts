import Ajv from 'ajv';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
const ajv = new Ajv({
    allErrors: true,
    useDefaults: true,
    removeAdditional: 'all'
});

ajv.addKeyword('isNotEmpty', {
    type: 'string',
    validate: function (schema, data) {
        return typeof data === 'string' && data.trim() !== '';
    },
    errors: false
});

ajv.addKeyword('isPhoneNumber', {
    type: 'string',
    validate: function (_schema: any, data: string) {
        const phoneNumber = parsePhoneNumberFromString(data);
        if (phoneNumber) {
            return phoneNumber.isValid();
        }
        return false;
    }
});

export default ajv;

export * from './organizer.schema';
export * from './location.schema';
