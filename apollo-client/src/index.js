
import ApolloBoost, { gql } from 'apollo-boost';

const client = new ApolloBoost({
  uri: 'http://localhost:4000'
})

const getUsers = gql`
  query($first:Int) {
    users(first: $first) {
      id
      name
      email
      password
    }
  }
`

client.query({
  query: getUsers
}).then((res) => {
  console.log(res.data);
  let html = '';

  res.data.users.forEach((element) => {
    html += `
      <div>
        <h3>${element.email}</h3>
      </div>
    `
  });

  document.getElementById('users').innerHTML = html;

})