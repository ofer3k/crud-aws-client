import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Nav from './Nav' 
import axios from 'axios'

const App=()=>{
  const [posts,setPosts]=useState([])
  const fetchPosts=()=>{
    axios.get(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/posts`)
    .then(res=>{setPosts(res.data)})
    .catch(err=>alert(err))
  }
  useEffect(()=>{
    fetchPosts()
  },[])

const deleteConfirm=(slug)=>{
  let answer=window.confirm('Are you sure you want to delete this post?')
  if(answer){
    deletePost(slug)
  }
}

const deletePost=(slug)=>{
  axios.delete(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/posts/${slug}`)
  .then(res=>{
    alert(res.data.message)
    fetchPosts()
  })
  .catch(err=>alert('error deleting post'))
}

  return(
    <div className='container p-5'> 
 <Nav/>
 <br/>
  <h1>MERN crud</h1>
  <br/>
  {posts.map((post,i)=>(
    <div key={post._id} className='row' style={{borderBottom:'2px solid black'}}>
      <div className='col pt-3 pb-2'>
          <div className='row'>
            <div className='col-md-10'>
                  <Link to={`/posts/${post.slug}`}
                   ><h2>{post.title}</h2>
                 </Link>
              <p className='lead'>{post.content}</p>
              <p>Author <span style={{color:'black'}} className='badge'>{post.user}</span>Published on{' '}<span style={{color:'black'}} className='badge'>{new Date(post.createdAt).toLocaleString()}</span> </p>
            </div>
            <div className='col-md-2'>
            <Link  className='btn btn-sm btn-outline-warning' to={`/post/update/${post.slug}`}
                   >Update
                 </Link>
                 <button onClick={()=>{
                   deleteConfirm(post.slug)
                 }} style={{marginLeft:'4px'}} className='btn btn-sm btn-outline-danger ml-1'>Delte</button>
            </div>
          </div>
      </div>
    </div>
  ))}
</div>
  )
}
export default App;
