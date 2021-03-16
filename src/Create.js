import React ,{useState} from 'react'
import axios from 'axios'
import Nav from './Nav' 

const Create=()=>{
    // state
    const [state,setState]=useState({
      title:'',
      content:'',
      user:''  
    })
    // destructure
    const {title,content,user}=state
    // onchange event handler
    const handleChange=(name)=>(event)=>{
        setState({...state,[name]:event.target.value })
    }
    // submit handler
    const handleSubmit=(e)=>{
        e.preventDefault()
        axios.post(`http://crud-aws-server.eba-mv3quiax.us-east-2.elasticbeanstalk.com/api/post`,{title,content,user})
        .then(res=>{
            // empty the state
            setState({...state,title:'',content:'',user:''})
            // show success alert
            alert(`Post titled ${res.data.title} was created`)
        })
        .catch(err=>{
            console.log(err.response)
            alert(err.response.data.error)
        })
    }

    return (<div className='container p-5'> 
    <Nav/>
    <br/>
    <h1>Create post</h1>
    <br/>
    <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label className='text-muted'>Title</label>
            <input onChange={handleChange("title")} value={title} type='text' className='form-control' placeholder='Title' required/>
            
            <label className='text-muted'>Content</label>
            <textarea onChange={handleChange("content")} value={content} className='form-control' placeholder='content' required/>
            
            <label className='text-muted'>User</label>
            <input onChange={handleChange("user")} value={user} type='text' className='form-control' placeholder='Your name' required/>
  
            <div>
                <button className='btn btn-primary'> Create</button>
            </div>
        </div>
    </form>
  </div>)
}
export default Create;
