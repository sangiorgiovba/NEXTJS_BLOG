"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/input/Input";
import ImageUpload from "@/components/ImageUpload";
import axios from "axios"
import { toast } from 'react-hot-toast'

interface InitialStateProps {
  name: string;
  imageSrc: string;
  description: string;
}

const initialState: InitialStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function page() {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const [isLoading,setIsLoading] = useState(false)

  const setCustomValue = (id:any, value:any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };


  function handleChange(event:ChangeEvent<HTMLInputElement> ) {
    setState({ ...state, [event.target.name]: event.target.value });
}

const onSubmit = (event:FormEvent) => {

    setIsLoading(true)

    event.preventDefault()

    axios.post('/api/blogs',state)
    .then(() => {
        toast.success('CRIADO COM SUCESSO')
        router.refresh()
        router.push('/')
       
    })

    .catch((err) => {
        throw new Error(err)
        toast.error('ERROR AO CRIAR ESTE POST') 
    }).finally(() => {
        setIsLoading(false)
    })
    router.refresh()
}

  return (
    <form onSubmit={onSubmit}  className="w-[600px] h-[700px] mx-auto py-12">
      <div>
      <ImageUpload value={state.imageSrc} onChange={(value) => setCustomValue('imageSrc',value)}/>
      </div>

      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Titulo"
          id="name"
          type="text"
          value={state.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          big
          placeholder="Descricao do post"
          id="description"
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <div></div>
        <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4
           focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600
           dark:hover:bg-green-700 dark:focus:ring-green-800" type="submit">
          Enviar
        </button>
      </div>
    </form>
  );
}
