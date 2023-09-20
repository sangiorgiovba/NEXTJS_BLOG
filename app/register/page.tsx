"use client";

import Input from "@/components/input/Input";
import axios from "axios";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface InitialStateProps {
  name: string;
  email: string;
  password: string;
}

const initialState: InitialStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();

  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {});
  };

  return (
    <form className="text-center" onSubmit={onSubmit}>
      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Digite seu Nome"
          id="name"
          type="text"
          name="name"
          onChange={handleChange}
          value={state.name}
        />

        <Input
          placeholder="Digite seu Email"
          id="email"
          type="text"
          name="email"
          onChange={handleChange}
          value={state.email}
        />

        <Input
          placeholder="Digite sua Senha"
          id="password"
          type="text"
          name="password"
          onChange={handleChange}
          value={state.password}
          
        />
        <button
          type="submit"
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Cadastrar
        </button>
      </div>
      <div>
        <div>
          {" "}
          Voce ja e cadastrado? <Link className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" href="/login"> Entrar </Link>
        </div>
      </div>
    </form>
  );
}
