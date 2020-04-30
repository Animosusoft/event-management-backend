import ajv from '.';

const createOrganizerSchema = {
    properties: {
        name: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        },
        phone: {
            type: 'string',
            isNotEmpty: true,
            isPhoneNumber: true,
            errorMessage: {
                isNotEmpty: 'value can not be empty',
                isPhoneNumber: 'invalid phone number'
            }
        },
        email: { format: 'email' },
        type: {
            enum: ['organization', 'person'],
            default: 'person'
        },
        business_identity: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        },
        business_identity_type: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        },
        password: {
            type: 'string',
            minLength: 7,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        }
    },
    additionalProperties: false,
    required: ['name', 'phone', 'email', 'password']
};

const updateOrganizerSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        },
        email: { format: 'email' },
        type: {
            enum: ['organization', 'person'],
            default: 'person'
        },
        business_identity: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        },
        business_identity_type: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'value can not be empty' }
        }
    },
    additionalProperties: false
};

const createOrganizerValidate = ajv.compile(createOrganizerSchema);
export const createOrganizerValidator = (data: any) => {
    const valid = createOrganizerValidate(data);
    if (valid) return { valid, data };
    return { valid, error: createOrganizerValidate.errors };
};

const updateOrganizerValidate = ajv.compile(updateOrganizerSchema);
export const updateOrganizerValidator = (data: any) => {
    const valid = updateOrganizerValidate(data);
    if (valid) return { valid, data };
    return { valid, error: updateOrganizerValidate.errors };
};
