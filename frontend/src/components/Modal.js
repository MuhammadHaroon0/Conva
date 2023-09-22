import React, { useState } from 'react'
import useStore from '../store/store'

const Modal = () => {
  const addChat=useStore(state=>state.addChat)
  const currentUserID=useStore(state=>state.currentUserID)

    const [email,setEmail]=useState("");
    const handleChange = (e) => {
        setEmail(e.target.value)
      };

     const handleSubmit=()=>{
            // console.log();
            addChat({sender:currentUserID(),receiver:email,message:{text:"Messages to this chat are secured",from:currentUserID()}})
            setEmail("")
      }

  return (
    <div className="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">Add Friend</h1>
          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
          <div className="input-group mb-3">
  <span className="input-group-text" id="basic-addon1">Enter Email</span>
  <input type="email" name='email' onChange={(e)=>handleChange(e)} value={email} className="form-control" placeholder="abc@mail.com" aria-label="Username" aria-describedby="basic-addon1"/>
</div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn text-white bg-[#e88922]" data-bs-dismiss="modal">Close</button>
          <button type="button" className="btn text-white bg-orange" onClick={handleSubmit}>Add</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Modal
