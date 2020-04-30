import ajv from '.';

const createLocationSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'name property can not be empty' }
        },
        country: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'country property can not be empty' }
        },
        city: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'city can not be empty' }
        },
        latitude: { type: 'number' },
        longitude: { type: 'number' }
    },
    additionalProperties: false,
    required: ['country', 'city', 'name', 'latitude', 'longitude']
};

const updateLocationSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'name property can not be empty' }
        },
        country: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'country property can not be empty' }
        },
        city: {
            type: 'string',
            isNotEmpty: true,
            errorMessage: { isNotEmpty: 'city can not be empty' }
        },
        latitude: { type: 'number' },
        longitude: { type: 'number' }
    },
    additionalProperties: false
};

const createLocationValidate = ajv.compile(createLocationSchema);
export const createLocationValidator = (data: any) => {
    const valid = createLocationValidate(data);
    if (valid) return { valid, data };
    return { valid, error: createLocationValidate.errors };
};

const updateLocationValidate = ajv.compile(updateLocationSchema);
export const updateLocationValidator = (data: any) => {
    const valid = updateLocationValidate(data);
    if (valid) return { valid, data };
    return { valid, error: updateLocationValidate.errors };
};
