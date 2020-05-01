import { merge, pick } from 'lodash';
import assertErr from 'assert-err';
import { Kind } from 'graphql/language';
import { GraphQLScalarType } from 'graphql';
import { gql } from 'apollo-server-express';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

import {
    typeDef as organizerTypeDef,
    resolvers as organizerResolvers
} from './organizer.gql';

const typeDef = gql`
    type Query {
        _empty: String
        hello: String
    }

    type Location {
        id: ID!
        name: String!
        country: String!
        city: String!
        latitude: Float!
        longitude: Float!
    }

    scalar Date

    scalar PhoneNumber

    type Mutation {
        _empty: String
    }
`;

const _resolvers = {
    Query: {
        hello: () => 'Hello world!'
    },
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            const date = new Date(value);
            assertErr(
                !isNaN(date.getTime()),
                TypeError,
                'Field error: value is an invalid Date'
            );
            return date.getTime(); // value from the client
        },
        serialize(value) {
            const date = new Date(value);
            assertErr(
                !isNaN(date.getTime()),
                TypeError,
                'Field error: value is an invalid Date'
            );
            return date.getTime(); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return new Date(ast.value); // ast value is always in string format
            }
            return null;
        }
    }),

    PhoneNumber: new GraphQLScalarType({
        name: 'PhoneNumber',
        description: 'PhoneNumber custom scalar type',
        parseValue(value) {
            const phoneNumber = parsePhoneNumberFromString(value);
            assertErr(
                !!phoneNumber,
                TypeError,
                'Field error: value is an invalid PhoneNumber'
            );
            return phoneNumber.number; // value from the client
        },
        serialize(value) {
            const phoneNumber = parsePhoneNumberFromString(value);
            assertErr(
                !!phoneNumber,
                TypeError,
                'Field error: value is an invalid PhoneNumber'
            );
            return pick(phoneNumber, [
                'nationalNumber',
                'number',
                'countryCallingCode',
                'country'
            ]); // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.STRING) {
                const phoneNumber = parsePhoneNumberFromString(ast.value);
                assertErr(
                    !!phoneNumber,
                    TypeError,
                    'Field error: value is an invalid PhoneNumber'
                );
                return phoneNumber.number; // ast value is always in string format
            }
            return null;
        }
    })
};

export const typeDefs = [typeDef, organizerTypeDef];

export const resolvers = merge(_resolvers, organizerResolvers);
