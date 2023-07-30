import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputMask from "react-input-mask";
import { validarCPF, validarCNPJ } from "./validacaoDocumento";

export default function ClientForm({ onNext, formData, defaultValue }) {
  const [endereco, setEndereco] = useState(defaultValue?.endereco || "");
  const [bairro, setBairro] = useState(defaultValue?.bairro || "");
  const [uf, setUf] = useState(defaultValue?.uf || "");
  const [cidade, setCidade] = useState(defaultValue?.cidade || "");
  const [nomeSocial, setNomeSocial] = useState(defaultValue?.nomeSocial || "");
  const [cnpj, setCnpj] = useState(defaultValue?.cnpj || "");
  const [tipoPessoa, setTipoPessoa] = useState(
    defaultValue?.tipoPessoa || "fisica"
  );
  const [nomeCompleto, setNomeCompleto] = useState(
    defaultValue?.nomeCompleto || ""
  );
  const [cpf, setCpf] = useState(defaultValue?.cpf || "");
  const [email, setEmail] = useState(defaultValue?.email || "");
  const [telefone, setTelefone] = useState(defaultValue?.telefone || "");
  const [ddd, setDdd] = useState(defaultValue?.ddd || "");
  const [dataNasc, setDataNasc] = useState(defaultValue?.dataNasc || "");
  const [cep, setCep] = useState(defaultValue?.cep || "");
  const [numeroEnd, setNumeroEnd] = useState(defaultValue?.numeroEnd || "");
  const [complemento, setComplemento] = useState(
    defaultValue?.complemento || ""
  );
  const [cpfError, setCpfError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [cepError, setCepError] = useState("");
  const [dataNascError, setDataNascError] = useState("");

  useEffect(() => {
    handleSaveData();
  }, [
    nomeSocial,
    nomeCompleto,
    cpf,
    cnpj,
    tipoPessoa,
    cidade,
    uf,
    bairro,
    endereco,
    email,
    telefone,
    ddd,
    dataNasc,
    cep,
    numeroEnd,
    complemento,
  ]);

  const handleSaveData = () => {
    onNext({
      nomeSocial,
      nomeCompleto,
      cpf,
      cnpj,
      tipoPessoa,
      cidade,
      uf,
      bairro,
      endereco,
      email,
      telefone,
      ddd,
      dataNasc,
      cep,
      numeroEnd,
      complemento,
    });
  };

  const handleTipoChange = (event) => {
    const tipoSelecionado = event.target.value;
    setTipoPessoa(tipoSelecionado);
    setNomeCompleto("");
    setCpf("");
    setNomeSocial("");
    setCnpj("");
  };

  const validateCpf = (value) => {
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    if (cpfRegex.test(value) && validarCPF(value)) {
      setCpf(value);
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  };

  const handleCpfChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      setCpf(value);
      if (value.length === 11) {
        validateCpf(value);
      } else {
        setCpfError("");
      }
    }
  };

  const validateCnpj = (value) => {
    const cnpjRegex = /^\d{14}$/;
    const cnpjDigitsOnly = value.replace(/\D/g, "");

    if (cnpjRegex.test(value) && validarCNPJ(cnpjDigitsOnly)) {
      setCnpj(value);
      setCnpjError("");
    } else {
      setCnpjError("CNPJ inválido");
    }
  };

  const handleCnpjChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 14) {
      setCnpj(value);
      if (value.length === 14) {
        validateCnpj(value);
      } else {
        setCnpjError("");
      }
    }
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmail(value);
      setEmailError("");
    } else {
      setEmailError("Email inválido");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const ufs = [
    "AC",
    "AL",
    "AM",
    "AP",
    "BA",
    "CE",
    "DF",
    "ES",
    "GO",
    "MA",
    "MG",
    "MS",
    "MT",
    "PA",
    "PB",
    "PE",
    "PI",
    "PR",
    "RJ",
    "RN",
    "RO",
    "RR",
    "RS",
    "SC",
    "SE",
    "SP",
    "TO",
  ];

  const fetchAddress = async (cep) => {
    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        setCepError("CEP inválido");
      }
      if (!data.erro) {
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setUf(data.uf);
        setCidade(data.localidade);
      }
    }
  };

  const validateCep = (value) => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (cepRegex.test(value)) {
      setCep(value);
      setCepError("");
    } else {
      setCepError("CEP inválido");
    }
  };

  const handleCepBlur = (value) => {
    const cepDigitsOnly = value.replace(/\D/g, "");
    fetchAddress(cepDigitsOnly);
  };

  const handleCepChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 8) {
      setCep(value);
      if (value.length === 8) {
        validateCep(value);
      } else {
        setCepError("");
      }
    }
  };

  const validateDataNasc = (value) => {
    const dataNascRegex =
      /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (dataNascRegex.test(value)) {
      const year = parseInt(value.substr(6, 4), 10);
      const currentYear = new Date().getFullYear();

      if (year > currentYear) {
        setDataNascError("Data de Nascimento inválida");
      } else {
        setDataNasc(value);
        setDataNascError("");
      }
    } else {
      setDataNascError("Data de Nascimento inválida");
    }
  };

  const handleDataNascChange = (event) => {
    const value = event.target.value;

    setDataNasc(value);
    validateDataNasc(value);
  };

  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth sx={{ borderRadius: "16px" }}>
            <InputLabel id="tipo-label">Tipo</InputLabel>
            <Select
              labelId="tipo-label"
              id="tipo"
              label="Tipo"
              value={tipoPessoa}
              onChange={handleTipoChange}
              fullWidth
              sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
            >
              <MenuItem value="fisica">Pessoa Física</MenuItem>
              <MenuItem value="juridica">Pessoa Jurídica</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {tipoPessoa === "fisica" ? (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nomeCompleto"
                name="nomeCompleto"
                label="Nome Completo"
                fullWidth
                onChange={(event) => setNomeCompleto(event.target.value)}
                sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="999.999.999-99"
                value={cpf}
                onChange={handleCpfChange}
              >
                {(inputProps) => (
                  <div>
                    <TextField
                      required
                      id="cpf"
                      name="cpf"
                      label="CPF"
                      fullWidth
                      inputProps={inputProps}
                      sx={{
                        borderRadius: "16px",
                        marginLeft: "10px",
                        width: "80%",
                      }}
                    />
                    {cpfError && (
                      <span
                        style={{
                          color: "red",
                          marginLeft: "10px",
                          display: "flex",
                        }}
                      >
                        {cpfError}
                      </span>
                    )}
                  </div>
                )}
              </InputMask>
            </Grid>
          </>
        ) : (
          <>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="nomeSocial"
                name="nomeSocial"
                label="Nome Social"
                fullWidth
                onChange={(event) => setNomeSocial(event.target.value)}
                sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputMask
                mask="99.999.999/9999-99"
                value={cnpj}
                onChange={handleCnpjChange}
              >
                {(inputProps) => (
                  <div>
                    <TextField
                      required
                      id="cnpj"
                      name="cnpj"
                      label="CNPJ"
                      fullWidth
                      inputProps={inputProps}
                      sx={{
                        borderRadius: "16px",
                        marginLeft: "10px",
                        width: "80%",
                      }}
                    />
                    {cnpjError && (
                      <span
                        style={{
                          color: "red",
                          marginLeft: "10px",
                          display: "flex",
                        }}
                      >
                        {cnpjError}
                      </span>
                    )}
                  </div>
                )}
              </InputMask>
            </Grid>
          </>
        )}
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Email"
            fullWidth
            value={email}
            onChange={handleEmailChange}
            sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
          />
          {emailError && (
            <span
              style={{
                color: "red",
                marginLeft: "10px",
                display: "flex",
              }}
            >
              {emailError}
            </span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputMask
            mask="(99) 99999-9999"
            value={telefone}
            onChange={(event) => setTelefone(event.target.value)}
          >
            {(inputProps) => (
              <TextField
                required
                id="telefone"
                name="telefone"
                label="Telefone"
                fullWidth
                inputProps={inputProps}
                sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
              />
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputMask
            mask="99"
            value={ddd}
            onChange={(event) => setDdd(event.target.value)}
          >
            {(inputProps) => (
              <TextField
                required
                id="dddPlanos"
                name="dddPlanos"
                label="DDD Planos"
                fullWidth
                inputProps={inputProps}
                sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
              />
            )}
          </InputMask>
        </Grid>

        <Grid item xs={12} sm={6}>
          <InputMask
            mask="99/99/9999"
            value={dataNasc}
            onChange={handleDataNascChange}
          >
            {(inputProps) => (
              <div>
                <TextField
                  required
                  id="dataNascimento"
                  name="dataNascimento"
                  label="Data de Nascimento"
                  fullWidth
                  inputProps={inputProps}
                  sx={{
                    borderRadius: "16px",
                    marginLeft: "10px",
                    width: "80%",
                  }}
                />
                {dataNascError && (
                  <span
                    style={{
                      color: "red",
                      marginLeft: "10px",
                      display: "flex",
                    }}
                  >
                    {dataNascError}
                  </span>
                )}
              </div>
            )}
          </InputMask>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InputMask
            mask="99999-999"
            onBlur={(event) => handleCepBlur(event.target.value)}
            value={cep}
            onChange={(event) => handleCepChange(event)}
          >
            {(inputProps) => (
              <TextField
                required
                id="cep"
                name="cep"
                label="CEP"
                fullWidth
                inputProps={inputProps}
                sx={{
                  borderRadius: "16px",
                  marginLeft: "10px",
                  width: "80%",
                }}
              />
            )}
          </InputMask>
          {cepError && (
            <span
              style={{
                color: "red",
                marginLeft: "10px",
                display: "flex",
              }}
            >
              {cepError}
            </span>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="endereco"
            name="endereco"
            label="Endereço"
            fullWidth
            value={endereco}
            onChange={(event) => setEndereco(event.target.value)}
            sx={{ borderRadius: "20px", marginLeft: "10px", width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="numero"
            name="numero"
            label="Número"
            fullWidth
            value={numeroEnd}
            onChange={(event) => setNumeroEnd(event.target.value)}
            sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="complemento"
            name="complemento"
            label="Complemento"
            fullWidth
            value={complemento}
            onChange={(event) => setComplemento(event.target.value)}
            sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="bairro"
            name="bairro"
            label="Bairro"
            fullWidth
            value={bairro}
            onChange={(event) => setBairro(event.target.value)}
            sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%" }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            sx={{ borderRadius: "16px", marginLeft: "10px", width: "80%", "@media (max-width: 800px)": { width: "80%" } }}
          >
            <InputLabel id="uf-label">UF</InputLabel>
            <Select
              labelId="uf-label"
              id="uf"
              label="UF"
              value={uf}
              onChange={(event) => setUf(event.target.value)}
              fullWidth
              sx={{ borderRadius: "16px" }}
            >
              {ufs.map((uf) => (
                <MenuItem key={uf} value={uf}>
                  {uf}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="cidade"
            name="cidade"
            label="Cidade"
            fullWidth
            value={cidade}
            onChange={(event) => setCidade(event.target.value)}
            sx={{
              borderRadius: "16px",
              marginLeft: "10px",
              width: "80%",
              marginBottom: "20px",
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
