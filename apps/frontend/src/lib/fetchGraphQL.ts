import { backendUrl } from "./constants";

export const fetchGraphQl = async (query: string, variables = {}) => {
  const response = await fetch(`${backendUrl}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  //GraphQL returns the data or errors in this fromat, if errors it gives us an error object, if success it gives us a data object
  const result = await response.json();
  if (result.errors) {
    console.error("GraphQL errors:", result.errors);
    throw new Error("GraphQL query failed");
  }

  return result.data;
};
