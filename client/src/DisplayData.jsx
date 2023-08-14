import React, { Fragment } from 'react'
import { useQuery, gql, useLazyQuery, useMutation } from "@apollo/client"
import { useState } from 'react';

const QUERY_ALL_USERS = gql`
    query GetAllUsers {
        users {
            ... on UserSuccessResult {
                users {
                    ...UserDetails
                }
            }
            ... on UserErrorResult {
                message 
            }
        }
    }
    fragment UserDetails on User {
        name
        age
        id
        username
        native
    }
`

const QUERY_GET_USER = gql`
        query GetUser ($name : String!) {
            user(name : $name) {
                name
                age
                username
                native
            }
        }
`
const QUERY_CREATE_USER = gql`
        mutation CreateUser ($input : CreateUserInput!) {
            createUser(input : $input) {
                name
                id
            }
        }
`

export default function DisplayData() {
    const {data, error, loading, refetch} = useQuery(QUERY_ALL_USERS);
    const [handleSubmit, {data: userData, error: UserError}] = useLazyQuery(QUERY_GET_USER)
    const [handleCreate] = useMutation(QUERY_CREATE_USER);
    const [name,setName] = useState("")
    const [age,setage] = useState(0)
    const [username,setUsername] = useState("")
    const [native,setNative] = useState("")
    const [id,setId] = useState("")
    if(loading) return <h1>Loading...</h1>
    if(error) return <p>An error occurred</p>
    return (
        <div>
            <h2>Search User</h2>
            <input value={id} onChange={e => setId(e.target.value)} type='text' />
            <button onClick={() => {handleSubmit({variables : {name : id,}});setId("")}}>Search</button>
            {
                userData && (
                    <div>
                        <p>Name : {userData.user.name}</p>
                        <p>Age : {userData.user.age}</p>
                        <p>username : {userData.user.username}</p>
                        <p>Nationality : {userData.user.native}</p>
                        <hr></hr>
                    </div>
                )
            }
            {
                UserError ? <div><p>User does not exist :(</p></div> : <></>
            }
            <br />
            <h2>Create User</h2>
            <input value={name} onChange={e => setName(e.target.value)} type='text' placeholder='Name' />
            <input value={age} onChange={e => setage(e.target.value)} type='text' placeholder='Age' />
            <input value={username} onChange={e => setUsername(e.target.value)} type='text' placeholder='Username' />
            <input value={native} onChange={e => setNative(e.target.value)} type='text' placeholder='Native' />
            <button onClick={() => {handleCreate({variables : {input : {name,age:Number(age),username,native}}});setName("");setage("");setNative("");setUsername("");refetch()}}>Create User</button>
            <br />
            <hr />
            <h2>List of Users</h2>
            {
                data && data.users.users.map(user => {
                    return (<div key={user.id}>
                        <p>Id : {user.id}</p>
                        <p>Name : {user.name}</p>
                        <p>Age : {user.age}</p>
                        <p>username : {user.username}</p>
                        <p>Nationality : {user.native}</p>
                        <hr />
                    </div>)
                })
            }
            
        </div>
    )
}
