import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import {render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

test('renders without errors', ()=>{
    render(<ContactForm />)
 });
 
 test('renders the contact form header', ()=> {
     render(<ContactForm/>)
 
     const head = screen.queryByText('Contact Form')
 
     expect(head).toBeInTheDocument()
 });
 
 test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
     render(<ContactForm/>)
     const firstName = screen.getByLabelText(/first name/i)
     userEvent.type(firstName, 'aaa')
     const error = screen.queryByText(/error/i)
 });
 
 test('renders THREE error messages if user enters no values into any fields.', async () => {
     render(<ContactForm/>)
     const submit = screen.getByRole('button')
     userEvent.click(submit)
     const errors = screen.getAllByText(/error/i)
     expect(errors.length === 3)
 });
 
 test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
     render(<ContactForm/>)
     const firstName = screen.getByLabelText(/first name/i)
     const lastName = screen.getByLabelText(/last name/i)
     const submit = screen.getByRole('button')
     userEvent.type(firstName, 'aaaaa')
     userEvent.type(lastName, 'aaaaa')
     userEvent.click(submit)
     const error = screen.queryByText(/error/i)
 });
 
 test('renders "email must be a valid email address" if an invalid email is entered', async () => {
     render(<ContactForm/>)
     const email = screen.getByLabelText(/email/i)
     userEvent.type(email, 'aaaaa')
     const erText = screen.queryByText(/email must be a valid email address/i)
     expect(erText).toBeInTheDocument();
 });
 
 test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {
     render(<ContactForm/>)
     const submit = screen.getByRole('button')
     userEvent.click(submit)
     const erText = screen.queryByText(/lastName is a required field/i)
     expect(erText).toBeInTheDocument();
 });
 
 test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
     render(<ContactForm/>)
     const firstName = screen.getByLabelText(/first name/i)
     const lastName = screen.getByLabelText(/last name/i)
     const email = screen.getByLabelText(/email/i)
     const submit = screen.getByRole('button')
     userEvent.type(firstName, 'aaaaa')
     userEvent.type(lastName, 'bbbbb')
     userEvent.type(email, 'bob@bob.com')
     userEvent.click(submit)
     const firstNameText = screen.queryByText(/First Name:/i)
     const lastNameText = screen.queryByText('Last Name:')
     const emailText = screen.queryByText('Email:')
     const messageText = screen.queryByText('Message:')
     expect(firstNameText).toBeInTheDocument()
     expect(lastNameText).toBeInTheDocument()
     expect(emailText).toBeInTheDocument()
     expect(messageText).not.toBeInTheDocument()
 });
 
 test('renders all fields text when all fields are submitted.', async () => {
     render(<ContactForm/>)
     const firstName = screen.getByLabelText(/first name/i)
     const lastName = screen.getByLabelText(/last name/i)
     const email = screen.getByLabelText(/email/i)
     const message = screen.getByLabelText(/message/i)
     const submit = screen.getByRole('button')
     userEvent.type(firstName, 'aaaaa')
     userEvent.type(lastName, 'bbbbb')
     userEvent.type(email, 'bob@bob.com')
     userEvent.type(message, 'ccccc')
     userEvent.click(submit)
     const firstNameText = screen.queryByText(/First Name:/i)
     const lastNameText = screen.queryByText('Last Name:')
     const emailText = screen.queryByText('Email:')
     const messageText = screen.queryByText('Message:')
     expect(firstNameText).toBeInTheDocument()
     expect(lastNameText).toBeInTheDocument()
     expect(emailText).toBeInTheDocument()
     expect(messageText).toBeInTheDocument()
 });