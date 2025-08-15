import React, { useState } from 'react'
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { Link } from 'react-router';
import { HashLoader } from 'react-spinners';

const Login = () => {
    // -------Loader 
    const [loader , setLoader] = useState(false)
    // -------showPassword 
    const [showPassword, setShowPassword] = useState(false);
    // --------Data 
    const [formData , setFormData] = useState({
        email: '',
        emailError: 'Your Email',
        emailErrorCol: 'text-white',
        password: '',
        passwordError: 'Your Password',
        passwordErrorCol: 'text-white',
    })
    // ------------FormData Handler----------
    const HandleFormData = (e) =>{
        e.preventDefault()
        if(!formData.email || !formData.password) return setFormData({...formData, emailError: 'Please Enter Your Email', emailErrorCol: 'text-red-500',})

        console.log('hello')
    }
  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-[#0d0d0d] relative">
        {/* Blurry back effect */}
        {/* ------------loader----------- */}
        <div id='LoaderBG' className={`${loader? 'visible' : 'hidden'} w-full h-screen bg-[#00000080] absolute top-0 left-0 z-999 flex items-center justify-center`}>
            <HashLoader size={70} color='#F564A9'/>
        </div>
        <div className="absolute w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-[300px] h-[300px] bg-pink-500/20 rounded-full blur-3xl bottom-10 right-10 animate-pulse"></div>

        {/*-------------- Form Box------------------- */}
        <div className="w-full max-w-lg p-8 rounded-xl bg-[#1a1a1a]/90 border border-gray-800 shadow-xl backdrop-blur-md relative z-10">
            <h2 className="text-3xl font-bold text-white text-center mb-6">
            Login
            </h2>
            <form onSubmit={HandleFormData} className="space-y-5">
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
                <Link to={'/Register'} className="hover:text-purple-400">New user? Create a account</Link>
            </div>
            </form>
        </div>
        </div>
    </>
  )
}

export default Login