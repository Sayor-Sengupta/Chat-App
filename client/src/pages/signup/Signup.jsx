import React, { useState } from "react";
import GenderCheck from "./GenderCheck";
import { Link } from "react-router-dom";
import useSignUp from "../../hooks/useSignUp.js";

const SignUp = () => {
  const [ inputs,setInputs] = useState({
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    gender:''
  })
  const {loading,signup} = useSignUp()
  const handleCheckBoxChange=(gender)=>{
    setInputs({...inputs,gender})
  }
  const handleSubmit= async (e)=>{
    e.preventDefault()
    
    await signup(inputs)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up 
          {/* <span className="text-blue-500">ChatApp</span> */}
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="Ur Name"
              className="input input-bordered w-full max-w-xl"
              value={inputs.fullName}
              onChange={(e)=>setInputs({
                ...inputs,fullName:e.target.value
              })}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">User Name</span>
            </label>
            <input
              type="text"
              placeholder="Username"
              className="input input-bordered w-full max-w-xl"
              value={inputs.username}
              onChange={(e)=> setInputs({...inputs,username:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="Password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xl"
              value={inputs.password}
              onChange={(e)=> setInputs({...inputs,password:e.target.value})}
            />
          </div>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="Password"
              placeholder="Password"
              className="input input-bordered w-full max-w-xl"
              value={inputs.confirmPassword}
              onChange={(e)=> setInputs({...inputs,confirmPassword:e.target.value})}
            />
          </div>
          

          <GenderCheck onCheckBoxChange ={handleCheckBoxChange} selectedGender={inputs.gender} />

          <Link to = '/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
              Already have a account?
            </Link>

            <div>
            <button className="btn btn-block" disabled={loading}>{loading?<span className=" loading loading-spinner"></span>:"sign Up"}</button>
            </div>


        </form>
      </div>
    </div>
  );
};

export default SignUp;















// import React from "react";
// import GenderCheck from "./GenderCheck";
// import { Link } from "react-router-dom";

// const SignUp = () => {
//   return (
//     <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
//       <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//         <h1 className="text-3xl font-semibold text-center text-gray-300">
//           Sign Up <span className="text-blue-500">ChatApp</span>
//         </h1>

//         <form>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Full Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Ur Name"
//               className="input input-bordered w-full max-w-xl"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">User Name</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Username"
//               className="input input-bordered w-full max-w-xl"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Password</span>
//             </label>
//             <input
//               type="Password"
//               placeholder="Password"
//               className="input input-bordered w-full max-w-xl"
//             />
//           </div>
//           <div>
//             <label className="label p-2">
//               <span className="text-base label-text">Confirm Password</span>
//             </label>
//             <input
//               type="Confirm Password"
//               placeholder="Password"
//               className="input input-bordered w-full max-w-xl"
//             />
//           </div>

//           <GenderCheck/>

//           <Link to = '/login' className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block">
//               Already have a account?
//             </Link>

//             <div>
//             <button className="btn btn-block">SignUp</button>
//             </div>


//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

