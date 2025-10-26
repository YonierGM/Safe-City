import { useState } from "react";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

export function PasswordInput({ label, register, name, errors, placeholder = "••••••••" }) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <>
            <label htmlFor={name} className="block text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    {...register(name)}
                    id={name}
                    placeholder={placeholder}
                    className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute inset-y-0 right-2 flex items-center px-2 text-gray-500 cursor-pointer"
                >
                    {showPassword ? <FaRegEyeSlash className="h-5 w-5" /> : <FaRegEye className="h-5 w-5" />}
                </button>
            </div>
            {errors?.[name] && (
                <p className="text-red-400 text-xs">{errors[name]?.message}</p>
            )}
        </>
    );
};
