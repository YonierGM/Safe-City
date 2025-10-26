import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/loginSchema";

import { Link, useNavigate } from "react-router-dom";
import { Aside } from "../components/Aside";

import { useAuthContext } from "../../context/AuthContext";
import { PasswordInput } from "../components/PasswordInput";
import { Spinner } from "../../shared/Spinner";

export function Login() {

  const { login, loading } = useAuthContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    const token = await login(data.email, data.password);
    if (token) {
      reset();
      navigate("/home");
    }
  };

  const asideContent = {
    title: "Juntos hacemos la ciudad más segura.",
    description: "En SafeCity, conectamos ciudadanos y autoridades para crear comunidades más seguras. Reporta, valida y mantente informado en tiempo real.",
    phrase: "Alerta hoy, seguros mañana",
    urlImage: "/image-login.webp",
  };

  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900 h-dvh">
        <div className="mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <Aside {...asideContent} />
          <div>
            <div className="w-full mx-auto lg:max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <div className="header-login gap-2 flex flex-col">
                <div className="logo mx-auto w-8">
                  <img src="/logo-login.webp" alt="" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                  Safe City.
                </h2>
                <p className="text-base font-normal text-gray-400 dark:text-white text-center">Inicia sesión para reportar incidencias de seguridad</p>

              </div>

              <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2 m-0">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                  <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tucorreo@ejemplo.com" required />

                  {errors.email && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.email.message}</p>}
                </div>
                <div className="grid gap-2 m-0">
                  <PasswordInput
                    label="Contraseña"
                    name="password"
                    register={register}
                    errors={errors}
                  />
                  <div className="flex items-start">
                    <Link to="/forgot-password" className="text-xs font-normal text-black hover:underline dark:text-black">¿Olvidaste tu contraseña?</Link>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full px-5 py-2 m-0 text-base font-medium text-center text-white bg-black rounded-lg hover:opacity-95 focus:ring-4 focus:ring-black sm:w-full dark:bg-black dark:hover:bg-black dark:focus:ring-black cursor-pointer flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex items-center justify-center h-5">
                      <Spinner size="5" color="#FFFFFF" />
                    </div>
                  ) : (
                    "Iniciar sesión"
                  )}
                </button>

                <div className="text-center flex flex-col gap-2">
                  <p className="text-md font-normal text-gray-400 dark:text-white">¿No tienes una cuenta?</p>

                  <Link type="submit" to="/register" className="w-full py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">Regístrate</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}