# Problem Encountered

## GraphQL folder structure

There is **no** best structure, but to make it scalable, either group by `resolvers`, `typeDef`, `Queries`, `Mutations` (later `Subscriptions`) or by different `models`.

[![Example Structures](https://ws4.sinaimg.cn/large/006tNbRwgy1fxn3ccb9z0j312w0twaen.jpg)](https://spectrum.chat/graphql/general/recommendations-for-scale-able-graphql-folder-structure-nodejs~c3936202-f2df-47cc-af96-1d829d34f1d3)

## Relational Model

Do not have to use Mongoose `populate` for relational subdocument, can just search in that collection.

## ID Typing

Defining `_id` as `String` explicitly can seem easy, but it requires `default` value field manually set in Mongoose Schema.

> Searching by `ObjectId` can be achieved by providing `String`

## Handling ObjectId in GraphQL

To circumvent the error `ID cannot represent value: { _bsontype: \"ObjectID\"}` caused by having to define `_id` field as `ID` or `String` where it should be `ObjectId` in MongoDB, just define it as `String`, and add the following snippet to `app.js` to **override** the default behavior of Mongoose.

``` Javascript
const { ObjectId } = mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
```

## Resolver Coding

When coding the **top-level** Query resolvers, which is **Root Resolvers**, the ***first*** argument should be `undefined`. Can note it as `_` or `root` (whatever).

``` Javascript
Query: {
    getLevel: async (_, param) => await LevelModel.findOne(param)
},
```

And when querying **subdocuments**, which is nested query, the ***first*** argument will be result obtained from **parent** query.

``` Javascript
Level: {
    recipe: async (level) => await RecipeModel.findById(level.recipe)
}
```

## Wiring Up

`makeExecutableSchema` can combine arrays of `typeDefs` and `resolvers` to create a schema, which can be later used in `ApolloServer` creation.

``` Javascript
const schema = makeExecutableSchema({
    typeDefs: [Root, LevelType],
    resolvers: [resolvers, LevelResolvers],
})
const server = new ApolloServer({ schema });
```