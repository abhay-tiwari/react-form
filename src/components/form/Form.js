import React, { useState } from 'react';

const Form = () => {

    const [phone, setPhone] = useState(0);
    const [age, setAge] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({ name: '', age: '', email: '', emailFormat: '' });
    const [isFormSubmit, setFormSubmit] = useState(false);
    let isFormValid = true;

    let formData = {
        name: '',
        age: 0,
        email: '',
        phone: 0
    };

    const handleNameInputChange = (e) => {
        e.preventDefault();
        setName(e.target.value);
    }

    const handleEmailInputChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const handleAgeInputChange = (e) => {
        e.preventDefault();
        setAge(e.target.value);
    }

    const handlePhoneInputChange = (e) => {
        e.preventDefault();
        setPhone(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (handleFormValidation() == false) {
            return;
        }

        formData = {
            name: name,
            age: age,
            email: email,
            phone: phone
        };

        setFormSubmit(true);

    }

    const handleFormValidation = () => {
        isFormValid = true;

        if (name == '') {
            isFormValid = false;

            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    name: 'Name cannot be empty.'
                }
            ));
        }
        else {
            setErrors(prevErrors => (
                {
                    ...prevErrors,
                    name: ''
                }
            ));
        }

        if (email == '') {
            setErrors({ ...errors, email: 'Email cannot be empty' });
            isFormValid = false;
        }
        else {
            setErrors({ ...errors, email: '' });
        }

        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!emailRegex.test(String(email).toLowerCase())) {
            setErrors({ ...errors, emailFormat: 'Email should be valid.' })
            isFormValid = false;
        }

        else {
            setErrors({ ...errors, emailFormat: '' });
        }

        if (age < 0 || age > 150) {
            setErrors({ ...errors, age: 'Age should be in range from 0 to 150/' });
            isFormValid = false;
        }

        else {
            setErrors({ ...errors, age: '' });
        }

        return isFormValid;

        setTimeout(() => {
            console.log(errors);
        }, 1000);
    }


    const handleReset = () => {
        setName('');
        setEmail('');
        setAge(0);
        setPhone(0);
        setFormSubmit(false);
        setErrors({});
    };


    return (
        <div className='form-container'>
            <div className='form-header'>
                <h3 className='form-heading'>
                    User Info Form
                </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <div className='input-container'>
                    <div className='errors text-danger'>{errors['name']}</div>
                    <label className='input-label'>Name</label>
                    <input type='text' className='form-control' value={name} onChange={handleNameInputChange} />
                </div>

                <div className='input-container'>
                    {(!isFormValid && errors['age'] != '') ? <div className='errors text-danger'>{errors['age']}</div> : ''}
                    <label className='input-label'>Age</label>
                    <input type='number' max='200' min='0' className='form-control' placeholder='Age' value={age} onChange={handleAgeInputChange} />
                </div>

                <div className='input-container'>
                    {(!isFormValid && errors['email'] != '') ? <div className='errors text-danger'>{errors['email']}</div> : ''}

                    {(!isFormValid && errors['emailFormat']) != '' ? <div className='errors text-danger'>{errors['emailFormat']}</div> : ''}
                    <label className='input-label'>Email</label>
                    <input type='email' className='form-control' value={email} onChange={handleEmailInputChange} />
                </div>

                <div className='input-container'>
                    <label className='input-label'>Phone</label>
                    <input type='text' className='form-control' value={phone} onChange={handlePhoneInputChange} />
                </div>

                <input type='submit' className='btn btn-primary' />
                <button className='btn btn-secondary reset-btn' onClick={handleReset}>Reset</button>
            </form>
            {
                isFormSubmit == true ? (<div className='form-data'>
                    <ul className='form-data-list'>
                        <li className='form-data-list-item'>Name: {name}</li>
                        <li className='form-data-list-item'>Age: {age}</li>
                        <li className='form-data-list-item'>Phone: {phone}</li>
                        <li className='form-data-list-item'>Email: {email}</li>
                    </ul>
                </div>) : ''}
        </div>);
}

export default Form;