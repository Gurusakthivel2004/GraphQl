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
    }

    type Query {
        users: [User!]!
        user (id: ID!) : User!
    }
    
`
module.exports = {typeDefs}