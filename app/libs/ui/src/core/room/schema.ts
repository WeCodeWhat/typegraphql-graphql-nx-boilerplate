import { gql } from '@apollo/client';

export const GET_ROOMS = gql`
  query GetRooms {
    getRooms {
      id
      name
      createdAt
      ownerId
      members {
        id
        email
        name
      }
      messages {
        message
        createdAt
        sender {
          name
        }
      }
    }
  }
`;

export const GET_ROOM = gql`
  query GetRoom($id: String!) {
    getRoom(id: $id) {
      name
      createdAt
      ownerId
      members {
        id
        email
        name
      }
      messages {
        message
        createdAt
        sender {
          name
        }
      }
    }
  }
`;
