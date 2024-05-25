"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CarsContext } from "./context/CarsContext";
import { Marca, Modelos, Anos } from "./types/cars";
import { Button, Paper } from "@mui/material";

export default function Page() {
  const { marcas, getModelos, modelos, getAnos, anos, getVeiculo, veiculo } =
    React.useContext(CarsContext);

  const [marca, setMarca] = React.useState<Marca>({} as Marca);
  const [modelo, setModelo] = React.useState<Modelos>({} as Modelos);
  const [ano, setAno] = React.useState<Anos>({} as Anos);

  React.useEffect(() => {
    setModelo({} as Modelos)
    setAno({} as Anos)
  }, [marca])

  React.useEffect(() => {
    marca.codigo && getModelos(marca.codigo);
  }, [marca]);

  React.useEffect(() => {
    marca.codigo && modelo.codigo && getAnos(marca.codigo, modelo.codigo);
  }, [modelo]);

  const handleClick = () => {
    marca.codigo &&
      modelo.codigo &&
      ano.codigo && getVeiculo(marca.codigo, modelo.codigo, ano.codigo);
  };

  return (
    <Box>
      <Box className="flex flex-wrap items-center justify-center my-8 p-8">
          <h2 className="text-3xl w-full text-center font-bold">
            Tabela Fipe
          </h2>
          <p>Consulte o valor de um veículo de forma gratuita</p>
      </Box>
      <Paper
        elevation={4}
        className="px-4 py-8 w-full max-w-3xl m-auto flex items-center justify-center flex-wrap flex-col"
      >
        <Box sx={{ maxWidth: 480, minWidth: 280 }}>
          <FormControl fullWidth>
            <InputLabel id="marca-label">Marca</InputLabel>
            <Select
              labelId="marca-label"
              id="marca"
              value={marca.nome}
              label="Marca"
              onChange={(ev) =>
                setMarca(marcas.find((m) => m.codigo === ev.target.value)!)
              }
            >
              <MenuItem value="" disabled></MenuItem>
              {marcas.map((marca, i) => (
                <MenuItem value={marca.codigo} key={i}>
                  {marca.nome}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {modelos.length > 0 && (
            <FormControl fullWidth className="mt-4">
              <InputLabel id="modelo-label">Modelo</InputLabel>
              <Select
                labelId="modelo-label"
                id="modelo"
                value={modelo.nome}
                label="Modelo"
                onChange={(ev) =>
                  setModelo(
                    modelos.find((m) => `${m.codigo}` === `${ev.target.value}`)!
                  )
                }
              >
                <MenuItem value="" disabled></MenuItem>
                {modelos.map((_modelo, i) => (
                  <MenuItem value={_modelo.codigo} key={i}>
                    {_modelo.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {anos.length > 0 && (
            <FormControl fullWidth className="mt-4">
              <InputLabel id="ano-label">Ano</InputLabel>
              <Select
                labelId="ano-label"
                id="ano"
                value={ano.nome}
                label="Ano"
                onChange={(ev) =>
                  setAno(
                    anos.find((m) => `${m.codigo}` === `${ev.target.value}`)!
                  )
                }
              >
                <MenuItem value="" disabled></MenuItem>
                {anos.map((_ano, i) => (
                  <MenuItem value={_ano.codigo} key={i}>
                    {_ano.nome}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Box>

        <Button
          className="mt-4"
          variant="contained"
          disabled={!marca.codigo || !modelo.codigo || !ano.codigo}
          onClick={handleClick}
        >
          Consultar Preços
        </Button>
      </Paper>

      {veiculo.Marca && (
        <Box className="flex flex-wrap items-center justify-center my-8 bg-[#dcf5f2] p-8">
          <h2 className="text-1xl w-full text-center font-bold">
            Tabela Fipe: Preço {veiculo.Marca} {veiculo.Modelo}{" "}
            {veiculo.AnoModelo}
          </h2>
          <p className="text-4xl bg-[#00a38c] rounded-full my-4 px-4 py-2 text-white">
            {veiculo.Valor}
          </p>
          <p className="text-sm text-gray-400 w-full text-center">Este é o preço de compra do veículo</p>
        </Box>
      )}
    </Box>
  );
}
