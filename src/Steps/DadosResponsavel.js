import React, { useState, useEffect } from "react";
import { Container, Box, Button, Typography, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import { validarCPF } from "../../components/validacaoDocumento";

export default function DadosResponsavel({ onNext, defaultValue }) {
  const [nomeResponsavel, setNome] = useState(
    defaultValue?.nomeResponsavel || ""
  );
  const [emailResponsavel, setEmailResponsavel] = useState(
    defaultValue?.emailResponsavel || ""
  );
  const [cpfResponsavel, setCpf] = useState(defaultValue?.cpfResponsavel || "");
  const [dataNascimentoResponsavel, setDataNascimento] = useState(
    defaultValue?.dataNascimentoResponsavel || ""
  );
  const [numeroCelularResponsavel, setNumeroCelular] = useState(
    defaultValue?.numeroCelularResponsavel || ""
  );
  const [cpfError, setCpfError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [dataNascError, setDataNascError] = useState("");

  useEffect(() => {
    handleSaveData();
  }, [
    nomeResponsavel,
    emailResponsavel,
    cpfResponsavel,
    dataNascimentoResponsavel,
    numeroCelularResponsavel,
  ]);

  const handleSaveData = () => {
    onNext({
      nomeResponsavel,
      emailResponsavel,
      cpfResponsavel,
      dataNascimentoResponsavel,
      numeroCelularResponsavel,
    });
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

  const validateDataNasc = (value) => {
    const dataNascRegex =
      /^(0[1-9]|1\d|2\d|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (dataNascRegex.test(value)) {
      const year = parseInt(value.substr(6, 4), 10);
      const currentYear = new Date().getFullYear();

      if (year > currentYear) {
        setDataNascError("Data de Nascimento inválida");
      } else {
        setDataNascimento(value);
        setDataNascError("");
      }
    } else {
      setDataNascError("Data de Nascimento inválida");
    }
  };

  const handleDataNascChange = (event) => {
    const value = event.target.value;

    setDataNascimento(value);
    validateDataNasc(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(value)) {
      setEmailResponsavel(value);
      setEmailError("");
    } else {
      setEmailError("Email inválido");
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmailResponsavel(value);
    validateEmail(value);
  };

  const stepBoxStyle = {
    my: 4,
    width: "50%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  const smallScreenStyle = {
    width: "80%",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{ ...stepBoxStyle, "@media (maxWidth: 800px)": smallScreenStyle }}
      >
        <div className="box">
          <div className="titleContainer">
            <Typography variant="h6" component="h1" gutterBottom>
              Dados do responsável
            </Typography>
          </div>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              style={{ "@media (maxWidth: 800px)": { width: "95%" } }}
            >
              <TextField
                required
                id="nomeResponsavel"
                name="nomeResponsavel"
                label="Nome"
                fullWidth
                value={nomeResponsavel}
                onChange={(event) => setNome(event.target.value)}
                sx={{
                  borderRadius: "16px",
                  mb: 2,
                  marginRight: "10px",
                  marginLeft: "10px",
                  width: "100%",
                  "@media (max-width: 800px)": { width: "90%" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                value={emailResponsavel}
                onChange={handleEmailChange}
                sx={{
                  borderRadius: "16px",
                  marginLeft: "10px",
                  width: "90%",
                  "@media (max-width: 800px)": { width: "90%" },
                }}
              />
              {emailError && (
                <div
                  style={{
                    color: "red",
                    marginLeft: "10px",
                    marginBottom: "10px",
                  }}
                >
                  {emailError}
                </div>
              )}
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputMask
                mask="999.999.999-99"
                value={cpfResponsavel}
                onChange={handleCpfChange}
              >
                {(inputProps) => (
                  <div>
                    <TextField
                      required
                      id="cpfResponsavel"
                      name="cpfResponsavel"
                      label="CPF"
                      fullWidth
                      inputProps={inputProps}
                      sx={{
                        borderRadius: "16px",
                        width: "100%",
                        marginLeft: "10px",
                        "@media (max-width: 800px)": { width: "90%" },

                      }}
                    />
                    {cpfError && (
                      <div
                        style={{
                          color: "red",
                          marginLeft: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        {cpfError}
                      </div>
                    )}
                  </div>
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputMask
                mask="99/99/9999"
                value={dataNascimentoResponsavel}
                onChange={handleDataNascChange}
              >
                {(inputProps) => (
                  <div>
                    <TextField
                      required
                      id="dataNascimentoResponsavel"
                      name="dataNascimentoResponsavel"
                      label="Data de Nascimento"
                      fullWidth
                      inputProps={inputProps}
                      sx={{
                        borderRadius: "16px",
                        width: "100%",
                        marginLeft: "10px",
                        "@media (max-width: 800px)": { width: "90%" },

                      }}
                    />
                    {dataNascError && (
                      <div
                        style={{
                          color: "red",
                          marginBottom: "10px",
                          marginLeft: "10px",
                        }}
                      >
                        {dataNascError}
                      </div>
                    )}
                  </div>
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12} sm={3}>
              <InputMask
                mask="(99) 99999-9999"
                value={numeroCelularResponsavel}
                onChange={(event) => setNumeroCelular(event.target.value)}
              >
                {(inputProps) => (
                  <TextField
                    required
                    id="numeroCelularResponsavel"
                    name="numeroCelularResponsavel"
                    label="Número de Celular"
                    fullWidth
                    inputProps={inputProps}
                    sx={{
                      borderRadius: "16px",
                      mb: 2,
                      width: "100%",
                      marginLeft: "10px",
                      "@media (max-width: 800px)": { width: "90%" },

                    }}
                  />
                )}
              </InputMask>
            </Grid>
          </Grid>
        </div>
      </Box>

      <style jsx>{`
        .box {
          display: flex;
          flex-direction: column;
          min-width: 0;
          word-wrap: break-word;
          background-color: #fff;
          background-clip: border-box;
          border: 1px solid rgba(0, 0, 0, 0.125);
          border-radius: 0.25rem;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .titleContainer {
          color: black;
          text-align: center;
          margin-bottom: 30px;
        }
        .input {
          display: flex;
          margin-left: 20px;
          margin-right: 20px;
        }
      `}</style>
    </Container>
  );
}
