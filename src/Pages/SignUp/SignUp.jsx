import { Link, useLocation, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import { useForm } from "react-hook-form";
import RegisterAnime from "../../assets/Register-Anime.json";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
// import Social from "../../components/social/Social";
import useAxios from "../../hooks/useAxios";
import Social from "../../components/Social/Social";

const SignUp = () => {
  const { createUser, profileUpdate } = useAuth();
  const axiosSecure = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    createUser(data.email, data.password)
      .then((res) => {
        
        profileUpdate(data.name, data.photo).then(() => {
          const userData = {
            name: data.name,
            email: data.email,
            role: "guest",
          };
          axiosSecure.post("/users", userData).then((res) => {
            console.log(res.data);
            if (res.data) {
              toast.success("sign up successfully!");
              navigate(
                location?.state?.from?.pathname
                  ? location?.state?.from?.pathname
                  : "/",
                { replace: true }
              );
            }
          });
        });
      })
      .catch((err) => {
        console.log(err.message);
        toast.error(err.message);
      });
  };
  return (
    <div className="overflow-hidden  flex flex-col-reverse md:flex-row max-w-7xl mx-auto  p-3 md:p-16">
      <div className="md:w-1/2 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-3xl md:text-4xl text-center font-medium text-gray-700">
          Sign Up!
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              placeholder="Type your name..."
              className="input input-bordered"
            />
            {errors.name && (
              <span className="text-red-600">Name is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>
            <input
              {...register("photo", { required: true })}
              type="text"
              placeholder="Photo URL"
              className="input input-bordered"
            />
            {errors.photo && (
              <span className="text-red-600">Photo is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              placeholder="Type your email..."
              className="input input-bordered"
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 16,
                pattern:
                  /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
              })}
              name="password"
              placeholder="Password"
              className="input input-bordered"
            />
            {errors.password?.type === "required" && (
              <span className="text-red-500">Password is required</span>
            )}
            {errors.password?.type === "minLength" && (
              <span className="text-red-500">
                Password must be 6 characters.
              </span>
            )}
            {errors.password?.type === "maxLength" && (
              <span className="text-red-500">
                Password must be less then 16 characters.
              </span>
            )}
            {errors.password?.type === "pattern" && (
              <span className="text-red-500">
                Password must be have a capital letter , a small letter and also
                have a special characters.
              </span>
            )}
          </div>

          <input
            className="bg-[#1d3557] btn btn-block text-white hover:bg-[#457b9d] mt-4"
            type="submit"
            value="Sign Up"
          />
        </form>
        <p className="text-blue-700 mt-2 text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:font-bold hover:underline"
          >
            login please
          </Link>
        </p>
        <div className="divider divider-neutral">OR</div>
        <Social></Social>
      </div>
      <div className="md:w-1/2">
        <Lottie animationData={RegisterAnime}></Lottie>
      </div>
    </div>
  );
};

export default SignUp;


// //////

// import { useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import Lottie from "lottie-react";
// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";
// import { FaRegEye, FaRegEyeSlash, FaCloudUploadAlt } from "react-icons/fa";
// import RegisterAnime from "../../assets/Register-Anime.json";
// import toast from "react-hot-toast";
// import useAuth from "../../hooks/useAuth";
// import useAxios from "../../hooks/useAxios";
// import Social from "../../components/Social/Social";

// const SignUp = () => {
//   const { createUser, profileUpdate } = useAuth();
//   const axiosSecure = useAxios();
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showPassword, setShowPassword] = useState(false);
//   const [fileName, setFileName] = useState("No file chosen");

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     // Note: data.photo[0] e file thakbe. 
//     // Real project e eita ImgBB te upload kore URL ta profileUpdate e dite hobe.
//     try {
//       const res = await createUser(data.email, data.password);
      
//       // Assume data.photo[0] is being handled or used as a placeholder
//       await profileUpdate(data.name, "https://i.ibb.co/default-avatar.png");
      
//       const userData = {
//         name: data.name,
//         email: data.email,
//         role: "guest",
//       };

//       const dbResponse = await axiosSecure.post("/users", userData);
//       if (dbResponse.data) {
//         toast.success("Welcome aboard! Registration complete.");
//         navigate(location?.state?.from?.pathname || "/", { replace: true });
//       }
//     } catch (err) {
//       toast.error(err.message);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
//       <motion.div 
//         initial={{ opacity: 0, scale: 0.95 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="flex flex-col md:flex-row max-w-5xl w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-[2rem] overflow-hidden border border-white"
//       >
        
//         {/* Left Side: Animation */}
//         <div className="w-full md:w-1/2 bg-slate-900 flex items-center justify-center p-10">
//           <div className="w-full max-w-sm">
//             <Lottie animationData={RegisterAnime} loop={true} />
//             <div className="text-center mt-6">
//                <h3 className="text-blue-400 text-xl font-medium italic">"The future of tech starts here."</h3>
//             </div>
//           </div>
//         </div>

//         {/* Right Side: Form */}
//         <div className="w-full md:w-1/2 p-8 lg:p-12">
//           <div className="mb-8">
//             <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
//             <p className="text-slate-500 mt-2 font-medium">Please enter your details to sign up.</p>
//           </div>

//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Name */}
//             <div className="form-control">
//               <label className="text-sm font-bold text-slate-700 ml-1 mb-1">Full Name</label>
//               <input
//                 {...register("name", { required: "Name is required" })}
//                 className="input input-bordered bg-slate-50 border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all rounded-xl"
//                 placeholder="Mehedi Hassan"
//               />
//             </div>

//             {/* Direct Photo Upload (New Improvement) */}
//             <div className="form-control">
//               <label className="text-sm font-bold text-slate-700 ml-1 mb-1">Profile Picture</label>
//               <label className="relative flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-slate-300 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-blue-400 cursor-pointer transition-all">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                   <FaCloudUploadAlt className="text-slate-400 text-2xl mb-1" />
//                   <p className="text-xs text-slate-500 font-medium">{fileName}</p>
//                 </div>
//                 <input 
//                   type="file" 
//                   className="hidden" 
//                   {...register("photo", { 
//                     required: "Photo is required",
//                     onChange: (e) => setFileName(e.target.files[0]?.name || "No file chosen")
//                   })} 
//                 />
//               </label>
//               {errors.photo && <span className="text-red-500 text-xs mt-1">{errors.photo.message}</span>}
//             </div>

//             {/* Email */}
//             <div className="form-control">
//               <label className="text-sm font-bold text-slate-700 ml-1 mb-1">Email</label>
//               <input
//                 {...register("email", { required: "Email is required" })}
//                 type="email"
//                 className="input input-bordered bg-slate-50 border-slate-200 rounded-xl"
//                 placeholder="mail@example.com"
//               />
//             </div>

//             {/* Password */}
//             <div className="form-control">
//               <label className="text-sm font-bold text-slate-700 ml-1 mb-1">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   {...register("password", { 
//                     required: "Password required",
//                     minLength: { value: 6, message: "Min 6 chars" } 
//                   })}
//                   className="input input-bordered w-full bg-slate-50 border-slate-200 rounded-xl pr-12"
//                   placeholder="••••••••"
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600"
//                 >
//                   {showPassword ? <FaRegEyeSlash size={18} /> : <FaRegEye size={18} />}
//                 </button>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl shadow-lg shadow-blue-200 mt-4 transition-all transform hover:scale-[1.02] active:scale-95"
//             >
//               Sign Up Free
//             </button>
//           </form>

//           <div className="mt-8">
//             <div className="divider text-slate-400 text-xs uppercase tracking-widest font-bold">Or Connect With</div>
//             <Social />
//             <p className="text-center mt-6 text-slate-600 text-sm font-medium">
//               Joined us before?{" "}
//               <Link to="/login" className="text-blue-600 font-bold hover:text-blue-800 underline-offset-4 hover:underline">
//                 Login
//               </Link>
//             </p>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default SignUp;