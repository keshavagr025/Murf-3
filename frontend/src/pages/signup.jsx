import React, { useState } from 'react';
import { Eye, EyeOff, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [] });

  const checkPasswordStrength = (password) => {
    let score = 0;
    const feedback = [];

    if (password.length >= 8) {
      score++;
      feedback.push({ text: '8+ characters', valid: true });
    } else feedback.push({ text: '8+ characters', valid: false });

    if (/[A-Z]/.test(password)) {
      score++;
      feedback.push({ text: 'Uppercase letter', valid: true });
    } else feedback.push({ text: 'Uppercase letter', valid: false });

    if (/[a-z]/.test(password)) {
      score++;
      feedback.push({ text: 'Lowercase letter', valid: true });
    } else feedback.push({ text: 'Lowercase letter', valid: false });

    if (/[0-9]/.test(password)) {
      score++;
      feedback.push({ text: 'Number', valid: true });
    } else feedback.push({ text: 'Number', valid: false });

    if (/[^A-Za-z0-9]/.test(password)) {
      score++;
      feedback.push({ text: 'Special character', valid: true });
    } else feedback.push({ text: 'Special character', valid: false });

    return { score, feedback };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const updated = type === 'checkbox' ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: updated }));

    if (name === 'password') {
      setPasswordStrength(checkPasswordStrength(value));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password
      })
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || 'Registration failed');
      return;
    }

    alert('Registration successful!');
    // Optionally redirect to login
    window.location.href = '/login';

  } catch (error) {
    console.error('Registration error:', error);
    alert('Something went wrong. Please try again.');
  }
};


  const strengthColor = ['bg-red-400', 'bg-yellow-400', 'bg-blue-400', 'bg-green-400'];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md space-y-6 border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />

        {/* Password */}
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Strength Bar */}
        {formData.password && (
          <div>
            <div className="w-full bg-gray-200 h-2 rounded-full mb-2">
              <div
                className={`h-2 rounded-full ${strengthColor[passwordStrength.score - 1] || 'bg-red-400'}`}
                style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
              ></div>
            </div>
            <div className="space-y-1">
              {passwordStrength.feedback.map((item, i) => (
                <div key={i} className="flex items-center text-sm">
                  {item.valid ? <Check size={14} className="text-green-500 mr-2" /> : <X size={14} className="text-gray-400 mr-2" />}
                  <span className={item.valid ? 'text-green-600' : 'text-gray-500'}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 ${
              formData.confirmPassword && formData.password !== formData.confirmPassword
                ? 'border-red-500 focus:ring-red-500'
                : 'focus:ring-blue-500'
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-2.5 text-gray-500"
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {formData.confirmPassword && formData.password !== formData.confirmPassword && (
          <p className="text-red-500 text-sm">Passwords do not match</p>
        )}

        {/* Terms */}
        <label className="flex items-center space-x-2 text-sm text-gray-600">
          <input
            type="checkbox"
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="accent-blue-500"
            required
          />
          <span>
            I agree to the <a href="#" className="text-blue-600 underline">Terms</a> and <a href="#" className="text-blue-600 underline">Privacy Policy</a>
          </span>
        </label>

        {/* Submit */}
        <button
          type="submit"
          disabled={!formData.agreeToTerms || formData.password !== formData.confirmPassword}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50"
        >
          Sign Up
        </button>

        {/* Redirect */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};
export default signup;
