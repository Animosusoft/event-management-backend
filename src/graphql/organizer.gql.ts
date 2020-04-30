import jwt from 'jsonwebtoken';
import { gql, UserInputError } from 'apollo-server-express';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { createOrganizerValidator } from '../schemas';
import { CONFIG } from '../config';
import { qurey } from '../datastores';

export const typeDef = gql`
    extend type Query {
        me: Organizer
        organizers: [Organizer!]!
    }
    type Organizer {
        organizer_id: ID!
        name: String
        phone: PhoneNumber!
        email: String
        type: String!
        token: String
        created_at: Date
        updated_at: Date
    }
    extend type Mutation {
        createOrganizer(
            name: String!
            phone: PhoneNumber!
            email: String
            type: String!
            business_identity: String
            business_identity_type: String
            password: String!
        ): Organizer
    }
`;

export const resolvers = {
    Query: {
        me: async (_root: any, args: any, _context: any, _info: any) => {
            let { user } = _context;
            return user;
        },
        organizers: async (
            _root: any,
            args: any,
            _context: any,
            _info: any
        ) => {
            const organizers = await qurey('SELECT * FROM tOrganizer');
            return organizers;
        }
    },
    Mutation: {
        createOrganizer: async (
            _root: any,
            args: any,
            _context: any,
            _info: any
        ) => {
            /**
             * validate Organizer data;
             * */
            const { error, valid, data } = createOrganizerValidator(args);
            if (!valid) throw new UserInputError('invalid user data', error);

            /**
             * hash Organizer password
             * */
            const hashPasword = bcrypt.hashSync(data.password, 12);
            data.password = hashPasword;

            /**
             * save Organizer to db
             * */
            const organizer_id = uuidv4();
            await qurey('INSERT INTO tOrganizer SET ?', {
                ...data,
                organizer_id
            });
            /**
             * query Organizer from db using organizer_id
             * */
            const organizer = await qurey(
                'SELECT * FROM tOrganizer WHERE organizer_id = ?',
                [organizer_id]
            );
            // generate auth token
            const token = jwt.sign(
                {
                    user: JSON.stringify(organizer[0])
                },
                CONFIG.jwt_encryption,
                {
                    expiresIn: CONFIG.jwt_expiration
                }
            );

            /**
             * return Organizer to client
             * */

            return {
                ...organizer[0],
                token
            };
        }
    },
    Organizer: {}
};
