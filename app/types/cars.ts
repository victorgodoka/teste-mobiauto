export type Marca = {
  codigo: string;
  nome: string;
}

export type Modelos = {
  codigo: number;
  nome: string;
}

export type Anos = {
  codigo: number;
  nome: string;
}

export type Veiculo = {
  TipoVeiculo: number
  Valor: string
  Marca: string
  Modelo: string
  AnoModelo: number
  Combustivel: string
  CodigoFipe: string
  MesReferencia: string
  SiglaCombustivel: string
}
