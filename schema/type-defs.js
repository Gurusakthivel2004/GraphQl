const { gql } = require("apollo-server");

const typeDefs = gql`

    type User {
        id: ID!
        name: String!
        age: Int!
        username: String!
        native: Nationality!
        getAges: [User!]
    }

    enum Nationality {
        IN
        UK
        US
        ARG
    }

    input CreateUserInput {
        name: String!,
        age: Int = 12,
        username: String!,
        native: Nationality = IN
    }

    type Mutation {
        createUser(input: CreateUserInput!) : User!
    }

    type Query {
        users: [User!]!
        user (id: ID!) : User!
    }
    
`
module.exports = {typeDefs}