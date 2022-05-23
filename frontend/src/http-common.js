import axios from "axios";

export default axios.create({
  baseURL: "https://eu-central-1.aws.realm.mongodb.com/api/client/v2.0/app/booktracker-nmprl/graphql",
  headers: {
    "Content-type": "application/json"
  }
});