import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {showToast} = useAppContext();

    const { register, watch, handleSubmit, formState: { errors } } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({
                message: "Account created successfully",
                type: "SUCCESS",
            })
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            })
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Create an Account</h2>
        <div className="flex flex-col md:flex-row gap-5">
            <label className="text-gray-700 text-sm font-bold flex-1">
                First Name
                <input
                    className="border rounded w-full py-1 px-2 font-normal text-gray-700"
                    type="text"
                    placeholder="First Name"
                    {...register("firstName", { required: "First Name is required" })}
                />
                {errors.firstName && (
                    <span className="text-red-500">{errors.firstName.message}</span>
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Last Name
                <input
                    className="border rounded w-full py-1 px-2 font-normal text-gray-700"
                    type="text"
                    placeholder="Last Name"
                    {...register("lastName", { required: "Last Name is required" })}
                />
                {errors.lastName && (
                    <span className="text-red-500">{errors.lastName.message}</span>
                )}
            </label>
        </div>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    className="border rounded w-full py-1 px-2 font-normal text-gray-700"
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span>
                )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    className="border rounded w-full py-1 px-2 font-normal text-gray-700"
                    type="password"
                    placeholder="Password"
                    {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters"} })}
                />
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span>
                )}
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    className="border rounded w-full py-1 px-2 font-normal text-gray-700"
                    type="password"
                    placeholder="Confirm Password"
                    {...register("confirmPassword", { validate: (value) => {
                        if(!value){
                            return "Confirm Password is required"
                        } else if(watch("password") !== value){
                            return "Passwords do not match"
                        }
                    }})}
                />
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span>
                )}
        </label>
        <span className="flex justify-between items-center">
            <span className="text-sm">
                Already have an account? <Link className="underline" to='/sign-in'>Login here</Link>
            </span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded">
                Create Account
            </button>
        </span>
    </form>
  )
}

export default Register
