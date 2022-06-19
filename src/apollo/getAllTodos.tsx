
import { gql } from "@apollo/client";

// the following query only reads reactive variables from the apollo cache
export const GET_ALL_TODOS = gql`
  query GetAllTodos {
    todos @client { 
      id  
      text  
      completed
    }
  }
`