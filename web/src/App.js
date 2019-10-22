import React from 'react';
import logo from './logo.svg';
import './App.css';

// 解析graphQL 查詢文檔
import gql from 'graphql-tag';
// 發起graphQL 查詢請求
import { useQuery } from 'react-apollo-hooks';

const queryAllUsers = gql`
  query($first:Int) {
    users(first: $first) {
      id
      name
      email
      password
    }
  }
`

function App() {

  const { data, loading, error } = useQuery(queryAllUsers);
  
  if (loading) {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          loading!!! 
        </p>
      </header>
    </div>
  }
  if (error) {
    return <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
          錯誤發生了!!
      </header>
    </div>
  }
  
  console.log(data);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          前端測試呼叫後端 graphQL API
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
