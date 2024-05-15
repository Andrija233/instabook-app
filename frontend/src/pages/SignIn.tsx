import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from "../api-client"


export type SignInFormData = {
    email: string
    password: string
}

const SignIn = () => {
    const {showToast } = useAppContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const location = useLocation();
    const {register, formState: {errors}, handleSubmit} = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async () => {
            showToast({
                message: "Sign in successful",
                type: "SUCCESS",
            })
            await queryClient.invalidateQueries("validateToken");
            // if we are on the login page, redirect to the home page
            // if we are on any other page, redirect to the previous page
            navigate(location.state?.from?.pathname || "/");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    });

    return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
        <h2 className="text-3xl font-bold">Sign In</h2>
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
        <span className="flex justify-between items-center">
            <span className="text-sm">
                Not Registered? <Link className="underline" to='/register'>Create an account here</Link>
            </span>
            <button type="submit" className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl rounded">
                Login
            </button>
        </span>
    </form>
    )
}

export default SignIn
