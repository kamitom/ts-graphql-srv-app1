import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

// 解析graphQL 查詢文檔
import gql from 'graphql-tag';
// 發起graphQL 查詢請求
import { useQuery, useMutation } from 'react-apollo-hooks';

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
const addNewUserMutation = gql`
  mutation($name:String!,$password:String!,$email:String,$phone:String) {
    newUser(name: $name, password: $name, email: $email, phone: $phone) {
      id
      name
      email
    }
  }
`



function App()  {
  
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  
  const { data, loading, error } = useQuery(queryAllUsers);


          const [onCreateUserMutation]  = useMutation(addNewUserMutation, {
            veriables: {
              //傳遞給後端的參數
              name,
              password,
              email,
              phone
            },
            update: (proxy, mutationResult) => {
              console.log("mutation result: ", mutationResult);
              alert('新增user成功');
            }
          });
  
  
  
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
  
  console.log("users data: ", data);
return <div>
       前端项目，测试调用graphql API
       <div>
         <form>
           <p>
             <input 
               type="text" 
               placeholder="用户名" 
               onChange={e=>{
                 setName(e.target.value);
               }}
             />
           </p>
           <p>
             <input 
               type="password" 
               placeholder="密码" 
               onChange={e=>{
                 setPassword(e.target.value);
               }}
             />
           </p>
           <p>
             <input 
               type="text" 
               placeholder="邮箱" 
               onChange={e=>{
                 setEmail(e.target.value);
                 
               }}
             />
           </p>
           <p>
             <input 
               type="text" 
               placeholder="phone" 
               onChange={e=>{
                  setPhone(e.target.value);
               }}
             />
           </p>
         </form>
         <button onClick={ onCreateUserMutation }>新增用户</button>
       </div>
   </div>



}


export default App;
