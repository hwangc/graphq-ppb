import {
  GraphQLSchema,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt
} from "graphql";
import fetch from "node-fetch";

const BASE_URL = "http://localhost:3001/api/shopify/orders";

const fetchByURL = relativeURL => {
  return fetch(`${BASE_URL}${relativeURL}`).then(res => res.json());
};

const fetchOrdersByURL = relativeURL => {
  return fetchByURL(relativeURL);
};

const fetchOrderByURL = relativeURL => {
  return fetchByURL(relativeURL);
};

const ItemType = new GraphQLObjectType({
  name: "Item",
  description: "Item that included in the order",
  fields: () => ({
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    productID: {
      type: GraphQLString,
      resolve: item => item.product_id
    }
  })
});

const OrderType = new GraphQLObjectType({
  name: "Order",
  description: "Order that somebody ordered",
  fields: () => ({
    firstName: {
      type: GraphQLString,
      resolve: order => order.billing_address.first_name
    },
    lastName: {
      type: GraphQLString,
      resolve: order => order.billing_address.last_name
    },
    email: {
      type: GraphQLString
    },
    id: {
      type: GraphQLString
    },
    totalPrice: {
      type: GraphQLString,
      resolve: order => order.total_price
    },
    items: {
      type: new GraphQLList(ItemType),
      resolve: order => order.line_items
    }
  })
});

const QueryType = new GraphQLObjectType({
  name: "Query",
  description: "The Root of all queries",
  fields: () => ({
    allOrders: {
      type: new GraphQLList(OrderType),
      args: {
        limit: { type: GraphQLString },
        fields: { type: GraphQLString }
      },
      resolve: (root, args) =>
        fetchOrdersByURL(`?limit=${args.limit}&fields=${args.fields}`) // fetch the index of order from the rest api
    },
    order: {
      type: OrderType,
      args: {
        id: { type: GraphQLString }
      },
      resolve: (root, args) => fetchOrderByURL(`/${args.id}.json`) // fetch the order with id args.id
    }
  })
});

const schema = new GraphQLSchema({
  query: QueryType
});

export { schema };
