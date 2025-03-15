import { gql } from '@apollo/client';

export const GET_MAIN_CHARACTERS = gql`
  query getMainCharacters {
    characters(page: 1) {
      results {
        id
        name
        image
      }
    }
  }
`;