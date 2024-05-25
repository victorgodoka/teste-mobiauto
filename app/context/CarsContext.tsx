"use client";
import { createContext, useEffect, useState } from "react";
import { Anos, Marca, Modelos, Veiculo } from "../types/cars";
import api from "../services/api";

interface CarsContextProps {
  marcas: Marca[];
  modelos: Modelos[];
  anos: Anos[];
  veiculo: Veiculo;
  getModelos: (codigo: string) => Promise<void>;
  getAnos: (codigo: string, modelo: string | number) => Promise<void>;
  getVeiculo: (
    codigo: string,
    modelo: string | number,
    ano: string | number
  ) => Promise<void>;
}

export const CarsContext = createContext<CarsContextProps>({} as CarsContextProps);

export const CarsProvider =  ({ children }: { children: React.ReactNode }) => {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelo] = useState<Modelos[]>([]);
  const [anos, setAno] = useState<Anos[]>([]);
  const [veiculo, setVeiculo] = useState<Veiculo>({} as Veiculo);

  const getMarcas = async () => {
    const path = "carros/marcas";
    const response = await api.get(path);
    setMarcas(response.data)
  }

  const getModelos = async (codigo: string) => {
    const path = `carros/marcas/${codigo}/modelos`;
    const response = await api.get(path);
    setModelo(response.data.modelos);
  }

  const getAnos = async (codigo: string, modelo: string | number) => {
    const path = `carros/marcas/${codigo}/modelos/${modelo}/anos`;
    const response = await api.get(path);
    setAno(response.data);
  }

  const getVeiculo = async (
    codigo: string,
    modelo: string | number,
    ano: string | number
  ) => {
    const path = `carros/marcas/${codigo}/modelos/${modelo}/anos/${ano}`;
    const response = await api.get(path);
    setVeiculo(response.data);
  };

  useEffect(() => {
    getMarcas()
  }, [])

  return (
    <CarsContext.Provider value={{ marcas, getModelos, modelos, getAnos, anos, getVeiculo, veiculo }}>
      {children}
    </CarsContext.Provider>
  );
}