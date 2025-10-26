import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/registerSchema";
import { Aside } from "../components/Aside";
import { Link, useNavigate } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { PasswordInput } from "../components/PasswordInput";
import { Spinner } from "../../shared/Spinner";

export function Register() {

  const { registerHook, loading, error } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    const result = await registerHook(data);
    if (result) {
      reset();
      navigate("/login");
    }
  };

  const asideContent = {
    title: "Únete a la comunidad que cuida tu ciudad.",
    description: "Regístrate en SafeCity y sé parte de una red ciudadana que reporta, valida y comparte información de seguridad en tiempo real.",
    phrase: "Tu voz cuenta para una ciudad más segura.",
    urlImage: "/image-register.webp",
  };



  return (
    <div>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          <Aside {...asideContent} />

          <div>
            <div className="w-full mx-auto lg:max-w-xl sm:px-8 bg-white rounded-lg p-6 shadow-xl dark:bg-gray-800">
              <div className="mb-8 header-register gap-2 flex flex-col">
                <div className="logo mx-auto w-8">
                  <img src="/logo-login.webp" alt="" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white text-center">
                  Safe City.
                </h2>
                <p className="text-base font-normal text-gray-400 dark:text-white text-center">Crea tu cuenta para reportar incidentes</p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nombres</label>
                    <input type="text" {...register("name")} name="name" id="name" className="bg-gray-50 border px-3 py-1 text-base border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jhon Doe" required />

                    {errors.name && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Apellidos</label>
                    <input type="text" {...register("last_name")} name="last_name" id="last_name" className="bg-gray-50 border border-gray-300 px-3 py-1 text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Smith Williams" required />

                    {errors.last_name && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.last_name.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Correo electrónico</label>
                  <input type="email" {...register("email")} name="email" id="email" className="bg-gray-50 border border-gray-300 px-3 py-1 text-base text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="tucorreo@ejemplo.com" required />

                  {errors.email && <p className="text-shadow-amber-800 text-red-400 text-xs">{errors.email.message}</p>}
                </div>
                <div>
                  <PasswordInput
                    label="Contraseña"
                    name="password"
                    register={register}
                    errors={errors}
                  /></div>
                <div>
                  <PasswordInput
                    label="confirmar Contraseña"
                    name="password_confirmation"
                    register={register}
                    errors={errors}
                  />
                </div>
                <button type="submit" disabled={loading} className="w-full px-5 py-2 m-0 text-base font-medium text-center text-white bg-black rounded-lg hover:opacity-95 focus:ring-4 focus:ring-black sm:w-full dark:bg-black dark:hover:bg-black dark:focus:ring-black cursor-pointer">
                  {loading ? (
                    <div className="flex items-center justify-center h-5">
                      <Spinner color="#FFFFFF" size="5" />
                    </div>
                  ) : (
                    "Crear cuenta"
                  )}
                </button>
                <div className="mt-6 text-center flex flex-col gap-2">
                  <p className="text-md font-normal text-gray-400 dark:text-white">¿Ya tienes una cuenta?</p>

                  <Link type="submit" to="/login" className="w-full py-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 cursor-pointer">Iniciar sesión</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}