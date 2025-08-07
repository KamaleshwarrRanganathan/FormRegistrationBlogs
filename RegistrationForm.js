import React, { useState, useEffect, useRef } from 'react';

const RegistrationForm = ({ addUser }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    description: '',
    rating: 0,
  });
  const [errors, setErrors] = useState({});
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [step]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleRating = (star) => {
    setFormData(prev => ({ ...prev, rating: star }));
    setErrors(prev => ({ ...prev, rating: '' }));
  };

  const validateStep = () => {
    const newErrors = {};
    const { firstName, lastName, email, phone, description, rating } = formData;

    if (step === 1 && !firstName) newErrors.firstName = "First name is required.";
    if (step === 2 && !lastName) newErrors.lastName = "Last name is required.";
    if (step === 3 && !email) newErrors.email = "Email is required.";
    if (step === 4) {
      if (!phone) newErrors.phone = "Phone number is required.";
      else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits.";
    }
    if (step === 5 && !description) newErrors.description = "Description is required.";
    if (step === 6 && rating === 0) newErrors.rating = "Please select a rating.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep(prev => Math.min(prev + 1, 6));
  };

  const prevStep = () => setStep(prev => Math.max(prev - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep()) {
      addUser(formData);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        description: '',
        rating: 0,
      });
      setStep(1);
      setErrors({});
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      nextStep();
    }
  };

  return (
    <form className="form-container" onSubmit={handleSubmit} data-aos="fade-up">
      {step === 1 && (
        <>
          <input
            ref={inputRef}
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 2 && (
        <>
          <input
            ref={inputRef}
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 3 && (
        <>
          <input
            ref={inputRef}
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {errors.email && <p className="error">{errors.email}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 4 && (
        <>
          <input
            ref={inputRef}
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 5 && (
        <>
          <textarea
            ref={inputRef}
            name="description"
            placeholder="Short Description"
            value={formData.description}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          {errors.description && <p className="error">{errors.description}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="button" onClick={nextStep}>Next</button>
        </>
      )}
      {step === 6 && (
        <>
          <label>Rate Us:</label>
          <div className="stars">
            {[1, 2, 3, 4, 5].map(star => (
              <span
                key={star}
                onClick={() => handleRating(star)}
                style={{ color: formData.rating >= star ? 'gold' : 'gray', cursor: 'pointer' }}
              >
                ★
              </span>
            ))}
          </div>
          {errors.rating && <p className="error">{errors.rating}</p>}
          <button type="button" onClick={prevStep}>Back</button>
          <button type="submit">Submit</button>
        </>
      )}
    </form>
  );
};

export default RegistrationForm;