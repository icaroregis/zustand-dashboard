import { FormEvent } from 'react';
import { useAuthStore } from '../../stores';

export const LoginPage = () => {
  const loginUser = useAuthStore((state) => state.loginUser);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const { username, password, remember } = event.target as HTMLFormElement;
    const { username, password, remember } = event.target as typeof event.target & {
      username: { value: string };
      password: { value: string };
      remember: { checked: boolean };
    };
    console.log(username.value, password.value, remember.checked);
    loginUser(username.value, password.value);

    // username.value = '';
    // password.value = '';
    // remember.checked = false;
  };

  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Login</h1>

      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-gray-600">
            Email
          </label>
          <input
            id="username"
            type="text"
            name="username"
            autoComplete="username"
            aria-describedby="username-help"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-600">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password"
            autoComplete="current-password"
            aria-describedby="password-help"
          />
        </div>

        <div className="mb-4 flex items-center">
          <input
            id="remember"
            type="checkbox"
            name="remember"
            className="text-blue-500"
          />
          <label
            htmlFor="remember"
            className="text-gray-600 ml-2">
            Remember Me
          </label>
        </div>

        <div className="mb-6 text-blue-500">
          <a
            href="#"
            className="hover:underline"
            aria-label="Esqueceu sua senha? Clique aqui para recuperar">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="bg-indigo-600">
          Login
        </button>
      </form>
      <div className="mt-6 text-blue-500 text-center">
        <a
          href="#"
          className="hover:underline"
          aria-label="Não tem uma conta? Clique aqui para se cadastrar">
          Sign up Here
        </a>
      </div>
    </>
  );
};
