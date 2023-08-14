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
        username: String = "user@123",
        native: Nationality = IN
    }

    type Mutation {
        createUser(input: CreateUserInput!) : User!
    }

    type Query {
        users: UserResultUnion
        user (name: String!) : User!
    }

    type UserSuccessResult {
        users: [User!]!
    }

    type UserErrorResult {
        message: String!
    }

    union UserResultUnion = UserSuccessResult | UserErrorResult
    
`
module.exports = {typeDefs}