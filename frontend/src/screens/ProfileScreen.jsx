import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'

// components
import FormContainer from '../components/FormContainer'
import { Form, Button, Image } from 'react-bootstrap'
import { toast } from 'react-toastify'
import Loader from '../components/Loader'

const ProfileScreen = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { authData } = useSelector(state => state.user)
    const user = authData[0]

    useEffect(() => {
        setName(user.name)
        setEmail(user.email)
    }, [user])

    const submitHandler = async (event) => {
        event.preventDefault()
        document.getElementById('name').setAttribute('disabled', '')
        document.getElementById('email').setAttribute('disabled', '')
        document.getElementById('action-btn').setAttribute('type', 'button')
        document.getElementById('action-btn').className = ''
        document.getElementById('action-btn').classList.add('btn', 'btn-outline-primary')
        document.getElementById('action-btn').innerText = 'Update Info'

        await fetch('http://localhost:5000/profile', {
            headers: { "Content-Type": "application/json" },
            method: "PATCH",
            body: JSON.stringify({ name, email })
        })

    }

    const clickHandler = async (e) => {
        if(e.target.type === 'submit') return
        e.preventDefault()
        document.getElementById('name').removeAttribute('disabled')
        document.getElementById('email').removeAttribute('disabled')
        e.target.setAttribute('type', 'submit')
        e.target.className = ''
        e.target.classList.add('btn', 'btn-outline-success')
        e.target.innerText = 'Save Info'
    }

  return (
    <FormContainer className='py-2'>
        <h2 className='text-center'>Update Profile</h2>

        <Form onSubmit={submitHandler} >
            <Form.Group className='my-2' controlId='name'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='text'
                    value={name}
                    disabled
                    onChange={(e) => setName(e.target.value)}
                />
            </Form.Group>
            <Form.Group className='my-2' controlId='email'>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type='text'
                    value={email}
                    disabled
                    onChange={(e) => setEmail(e.target.value)}
                />
            </Form.Group>
            <div className="d-flex justify-content-center mt-4">
            <Button type='button' id='action-btn' variant='outline-primary' onClick={clickHandler}>
                Update Info
            </Button>
            </div>
        </Form>
    </FormContainer>
  )
}

export default ProfileScreen