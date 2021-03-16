import React, { useState,useEffect } from 'react'
import axios from 'axios'
import Nav from './Nav'

const UpdatePost=(props)=>{
const [state,setState]=useState({
    title:'',
    content:'',
    slug:'',
    user:''
})
const {title,content,slug,user}=state

    useEffect(()=>{
        axios.get(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/posts/${props.match.params.slug}`)
        .then(res=>{
            const {title,content,slug,user}=res.data
            setState({...state,title,content,slug,user})
        })
        .catch(err=>alert(err))
    },[])

    const handleChange=(name)=>(event)=>{
        setState({...state,[name]:event.target.value })
    }
    // submit handler
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.put(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/post/${slug}`,{title,content,user})
        .then(res=>{
            const {title,content,user}=res.data
            // empty the state
            setState({...state,title,content,slug,user})
            // show success alert
            alert(`Post titled ${title} was updated`)
        })
        .catch(err=>{
            console.log(err.response)
            alert(err.response.data.error)
        })
    }


    const showUpdateForm=()=>(
    <form onSubmit={handleSubmit}>
            <div className='form-group'>
            <label className='text-muted'>Title</label>
            <input onChange={handleChange("title")} value={title} type='text' className='form-control' placeholder='Title' required/>
            
            <label className='text-muted'>Content</label>
            <textarea onChange={handleChange("content")} value={content} className='form-control' placeholder='content' required/>
            
            <label className='text-muted'>User</label>
            <input onChange={handleChange("user")} value={user} type='text' className='form-control' placeholder='Your name' required/>
  
            <div>
                <button className='btn btn-primary'>Update</button>
            </div>
        </div>
    </form>
    )
return(<div className='container'>
<Nav/>
<br/>
<h1>UPDATE POST</h1>
      {showUpdateForm()}       
</div>)
}
export default UpdatePost