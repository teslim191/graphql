const axios = require("axios");
const _ = require('lodash')
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLSchema
} = require("graphql");
const Users = require("./models/Users");
const Posts = require("./models/Posts")




const PostType = new GraphQLObjectType({
  name: "Post",
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    body: { type: GraphQLString },
    userid: { type: GraphQLID },
    created_at: { type: GraphQLString },
    
    // to return a single author
    user: {
      type: UserType,
      resolve(parentValue, args){
        // return _.find(authors, { id: parentValue.authorid })
        return Users.findById(parentValue.userid)
      }
    },
  }),
});

const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    gender: { type: GraphQLString },
    // an author can have multiple books
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args){

        return Posts.find({ userid:parentValue.id })
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    post: {
      type: PostType,
      args: {
        id: { type: GraphQLID },
      },
      resolve(parentValue, args) {
        // return axios.get(`http://localhost:1000/users/registered-users/${args._id}`)
        // .then(res => res.data)
        // return _.find(books, { id: args.id})
        return Posts.findById(args.id)
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve(parentValue, args) {
        // return axios.get(`http://localhost:1000/users/registered-users/${args._id}`)
        // .then(res => res.data)
        // return _.filter(books)
        return Posts.find()
      },
    },
    user:{
      type: UserType,
      args: {
        id:{ type: GraphQLID }
      },
      resolve(parentValue, args){
        // return _.find(authors, { id: args.id})
        return Users.findById(args.id)
      }
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parentValue, args){
        return Users.find()
      }

    }
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        gender: { type: GraphQLString }
      },
      resolve(parentValue, args){
        let user = new Users({
          name: args.name,
          email: args.email,
          gender: args.gender
        })
        return user.save()
      }
    },

    addPost: {
      type: PostType,
      args: {
        title: { type: GraphQLString },
        body: { type: GraphQLString },
        userid: { type: GraphQLID },
      },
      resolve(parentValue, args){
        let post = new Posts({
          title: args.title,
          body: args.body,
          userid: args.userid
        })
        return post.save()
      }
    },

    editUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID }
      },
      // resolve(parentValue, )
    }

  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
