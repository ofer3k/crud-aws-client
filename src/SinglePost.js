import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Nav from './Nav'

const SinglePost=(props)=>{
    const [post,setPost]=useState({})

    useEffect(()=>{
        axios.get(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/posts/${props.match.params.slug}`)
        .then(res=>setPost(res.data))
        .catch(err=>alert(err))
    })
return(<div className='container'>
<Nav/>
<br/>
<h1>{post.title}</h1>
<p className='lead'>{post.content}</p>
        <p>Author <span style={{color:'black'}} className='badge'>{post.user}</span>Published on{' '}<span style={{color:'black'}} className='badge'>{new Date(post.createdAt).toLocaleString()}</span> </p>
       
</div>)
}
export default SinglePost