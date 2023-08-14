const {UserList} = require("../FakeData")
const _ = require("lodash");
const resolvers = {
    Query: {
        users() {
            if(UserList) return {users : UserList}
            return {message : 'An error occured :('}
        },
        user (parent, args) {
            const name = args.name;
            const user = _.find(UserList,{name: name});
            return user;
        }
    },
    User: {
        getAges(){
            return _.filter(UserList, (user) => user.age < 22)
        }
    },
    Mutation: {
        createUser : (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId + 1;
            UserList.push(user);
            return user;
        }
    },
    UserResultUnion: {
        __resolveType (obj) {
            if(obj.users) return "UserSuccessResult"
            if(obj.message) return "UserErrorResult"
            return null
        }
    }
}
module.exports = {resolvers}