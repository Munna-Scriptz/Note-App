import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaUser } from 'react-icons/fa'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { Link } from 'react-router'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
    const [formData , setFormData] = useState({
        username: '',
        usernameError: 'username',
        usernameErrorCol: 'text-white',
        email: '',
        emailError: 'Email',
        emailErrorCol: 'text-white',
        password: '',
        passwordError: 'Password',
        passwordErrorCol: 'text-white',
        passwordConfirm: '',
        passwordConfirmError: 'Confirm Password',
        passwordConfirmErrorCol: 'text-white',
    })
    const auth = getAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const PasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    const EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{0,}$/
    // --------------Data Handler------------
    const HandleFormData = (e) => {
        e.preventDefault()
        if(!formData.username || !formData.email || !formData.password || !formData.passwordConfirm) return setFormData({...formData, usernameError: 'Please enter your username' , usernameErrorCol: 'text-red-500' , emailError: 'Please enter your email', emailErrorCol: 'text-red-500' , passwordError: 'Please enter your password', passwordErrorCol: 'text-red-500' , passwordConfirmError: 'Please confirm your password', passwordConfirmErrorCol: 'text-red-500'})
        if(!EmailRegex.test(formData.email)) return setFormData({...formData , emailError: 'Please enter a valid email' , emailErrorCol: 'text-red-500'})
        if(!PasswordRegex.test(formData.password)) return setFormData({...formData , passwordError: 'Choose a strong password' , passwordErrorCol: 'text-red-500'})
        if(formData.password != formData.passwordConfirm) return setFormData({...formData , passwordConfirmError: 'Password does not match' , passwordConfirmErrorCol: 'text-red-500'})
        console.log('Form submitted successfully!')

        // ------------Firebase Auth 
        createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
            // Signed up 
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
    }
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] relative">
        {/* Blurry back effect */}
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

        {/* Form Box */}
        <div className="w-full max-w-lg p-8 rounded-xl bg-[#1a1a1a]/90 border border-gray-800 shadow-xl backdrop-blur-md relative z-10">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
            Create Account
            </h2>

            <form onSubmit={HandleFormData} className="space-y-5">
            {/* -----------Username------------- */}
            <div>
                <label className={`block text-gray-300 text-sm mb-1 ${formData.usernameErrorCol}`}>{formData.usernameError}</label>
                <div className="relative">
                <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                    onChange={(e)=>setFormData((prev)=>({...prev , username: e.target.value , usernameErrorCol: 'text-white',}))}
                    type="text"
                    placeholder="Enter username"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#121212] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-purple-400"
                />
                </div>
            </div>
            {/* -----------Email------------- */}
            <div>
                <label className={`block text-gray-300 text-sm mb-1 ${formData.emailErrorCol}`}>{formData.emailError}</label>
                <div className="relative">
                <FaEnvelope className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                    type="email"
                    onChange={(e)=>setFormData((prev)=>({...prev , email: e.target.value , emailErrorCol: 'text-white',}))}
                    autoComplete='username'
                    placeholder="Enter email"
                    className="w-full pl-10 pr-4 py-3 rounded-lg bg-[#121212] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-purple-400"
                />
                </div>
            </div>
            {/* -----------Password------------- */}
            <div>
                <label className={`block text-gray-300 text-sm mb-1 ${formData.passwordErrorCol}`}>{formData.passwordError}</label>
                <div className="relative">
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                    type={showPassword ? "text" : "password"}
                    onChange={(e)=>setFormData((prev)=>({...prev , password: e.target.value , passwordErrorCol: 'text-white',}))}
                    placeholder="Enter password"
                    autoComplete='new-password'
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#121212] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-purple-400"
                />
                <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
            </div>
            {/* -----------Confirm Password------------- */}
            <div>
                <label className={`block text-gray-300 text-sm mb-1 ${formData.passwordConfirmErrorCol}`}>{formData.passwordConfirmError}</label>
                <div className="relative">
                <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-500" />
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    autoComplete='new-password'
                    onChange={(e)=>setFormData((prev)=>({...prev , passwordConfirm: e.target.value , passwordConfirmErrorCol: 'text-white',}))}
                    placeholder="Confirm password"
                    className="w-full pl-10 pr-12 py-3 rounded-lg bg-[#121212] text-white placeholder-gray-500 border border-gray-700 focus:outline-none focus:border-purple-400"
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 focus:outline-none cursor-pointer"
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>
            </div>
            {/* -----------Submit Button------------- */}
            <button
                    type="submit"
                    className="w-full cursor-pointer py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg text-white font-semibold shadow-md hover:scale-[1.02] transition-all relative overflow-hidden"
                    >
                    <span className="relative z-10">Sign Up</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-lg opacity-50 animate-pulse"></div>
            </button>
            {/* -----------Forget Pass & Login------------- */}
            <div className="flex justify-between text-sm text-gray-400 mt-4">
                <Link to={'/'} className="hover:text-purple-400">Forgot Password?</Link>
                <Link to={'/'} className="hover:text-purple-400">Login</Link>
            </div>
            </form>
        </div>
        </div>
    </>
  )
}

export default Register