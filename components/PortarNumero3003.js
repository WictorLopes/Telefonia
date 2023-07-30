import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import InputMask from "react-input-mask";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Modal from "react-modal";
import { validarCPF, validarCNPJ } from "./validacaoDocumento";
import axios from "axios";


function SavedNumberTable({ data, onRemove }) {
  const getTruncatedFileName = (file, maxLength) => {
    if (file instanceof File) {
      const fileName = file.name;
      if (fileName.length > maxLength) {
        const truncatedName = fileName.substring(0, maxLength - 10) + "...";
        return truncatedName;
      }
      return fileName;
    }
    return "";
  };

  return (
    <TableContainer
      component={Paper}
      style={{ marginTop: "10px", paddingLeft: "65px" }}
    >
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Tipo</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Nome</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>CPF/CNPJ</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>DDD</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Telefone</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>
              Conta Telefônica
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{data.tipoPessoaPort3003}</TableCell>
            <TableCell>
              {data.tipoPessoaPort3003 === "fisica"
                ? data.nomeCompletoPort3003
                : data.nomeSocialPort3003}{" "}
            </TableCell>
            <TableCell>
              {data.tipoPessoaPort3003 === "fisica"
                ? data.cpfPort3003
                : data.cnpjPort3003}
            </TableCell>
            <TableCell>{data.dddPort3003}</TableCell>
            <TableCell>{data.numeroPort3003}</TableCell>
            <TableCell>
              {getTruncatedFileName(data.contaTelefonica3003, 30)}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Cep</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Endereço</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Número</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Complemento</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Bairro</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Cidade</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>UF</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{data.cepPort3003}</TableCell>
            <TableCell>{data.enderecoPort3003}</TableCell>
            <TableCell>{data.numeroEndPort3003}</TableCell>
            <TableCell>{data.complementoPort3003}</TableCell>
            <TableCell>{data.bairroPort3003}</TableCell>
            <TableCell>{data.cidadePort3003}</TableCell>
            <TableCell>{data.ufPort3003}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="outlined"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={() => onRemove(data)}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Remover
        </Button>
      </div>
    </TableContainer>
  );
}

export default function Portabilidade({
  open,
  onClose,
  defaultValue,
  onPortarNumeroDataChange3003,
}) {
  const [nomeSocialPort3003, setnomeSocialPort3003] = useState("");
  const [cnpjPort3003, setCnpjPort3003] = useState("");
  const [tipoPessoaPort3003, setTipoPessoaPort3003] = useState("fisica");
  const [nomeCompletoPort3003, setNomeCompletoPort3003] = useState("");
  const [cpfPort3003, setCpfPort3003] = useState("");
  const [dddPort3003, setDddPort3003] = useState("");
  const [numeroPort3003, setNumeroPort3003] = useState("");
  const [operadoraPort3003, setOperadoraPort3003] = useState("");
  const [contaTelefonica3003, setContaTelefonica3003] = useState(null);
  const [cepPort3003, setCepPort3003] = useState(
    defaultValue?.cepPort3003 || ""
  );
  const [enderecoPort3003, setEnderecoPort3003] = useState("");
  const [numeroEndPort3003, setNumeroEndPort3003] = useState(
    defaultValue?.numeroEndPort3003 || ""
  );
  const [complementoPort3003, setComplementoPort3003] = useState(
    defaultValue?.complementoPort3003 || ""
  );
  const [bairroPort3003, setBairroPort3003] = useState("");
  const [ufPort3003, setUf3003] = useState("");
  const [cidadePort3003, setCidadePort3003] = useState("");
  const [portarNumero, setPortarNumero] = useState(false);
  const [cepError, setCepError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dadosSalvos, setDadosSalvos] = useState(null);
  const [listaDadosSalvos, setListaDadosSalvos] = useState([]);
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [downloadLink3003, setDownloadLink3003] = useState(null);

  const saveToLocalStorage = (data) => {
    localStorage.setItem("savedNumbers", JSON.stringify(data));
  };

  const getFromLocalStorage = () => {
    const savedData = localStorage.getItem("savedNumbers");
    return savedData ? JSON.parse(savedData) : [];
  };
  useEffect(() => {
    const dataFromLocalStorage = getFromLocalStorage();
    setSavedNumbers(dataFromLocalStorage);
  }, []);
  useEffect(() => {
    saveToLocalStorage(savedNumbers);
  }, [savedNumbers]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleTipoChange = (event) => {
    const tipoSelecionado = event.target.value;
    setTipoPessoaPort3003(tipoSelecionado);
    setNomeCompletoPort3003("");
    setCpfPort3003("");
    setnomeSocialPort3003("");
    setCnpjPort3003("");
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

  const handleRemoveData = (dataToRemove) => {
    setSavedNumbers((prevSavedNumbers) =>
      prevSavedNumbers.filter((data) => data !== dataToRemove)
    );
  };

  const handleSaveNumbers = () => {
    const dados = {
      nomeSocialPort3003,
      cnpjPort3003,
      tipoPessoaPort3003,
      nomeCompletoPort3003,
      cpfPort3003,
      dddPort3003,
      numeroPort3003,
      operadoraPort3003,
      contaTelefonica3003,
      cepPort3003,
      enderecoPort3003,
      numeroEndPort3003,
      complementoPort3003,
      bairroPort3003,
      ufPort3003,
      cidadePort3003,
      portarNumero: portarNumero,
      downloadLink3003,
    };

    onPortarNumeroDataChange3003(dados);
    setSavedNumbers((prevSavedNumbers) => [...prevSavedNumbers, dados]);

    setDadosSalvos(dados);
    setListaDadosSalvos((prevListaDadosSalvos) => [
      ...prevListaDadosSalvos,
      dados,
    ]);
    saveToLocalStorage([...savedNumbers, dados]);

    setModalOpen(false);
  };

  const validateCep = (value) => {
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (cepRegex.test(value)) {
      setCepPort3003(value);
      setCepError("");
    } else {
      setCepError("CEP inválido");
    }
  };

  const fetchAddress = async (cepPort3003) => {
    if (cepPort3003.length === 8) {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepPort3003}/json/`
      );
      const data = await response.json();
      if (!data.erro) {
        setEnderecoPort3003(data.logradouro);
        setBairroPort3003(data.bairroPort3003);
        setUf3003(data.ufPort3003);
        setCidadePort3003(data.localidade);
      }
    }
  };

  const handleCepBlur = (value) => {
    const cepDigitsOnly = value.replace(/\D/g, "");
    fetchAddress(cepDigitsOnly);
  };

  const handleCepChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 8) {
      setCepPort3003(value);
      if (value.length === 8) {
        validateCep(value);
      } else {
        setCepError("");
      }
    }
  };
  const CepBlur = (event) => {
    handleCepChange(event.target.value);
  };

  const handleRemove = () => {
    setContaTelefonica3003(null);
  };

  const handleUpload = async (event) => {
    // const file = event.target.files[0];
    // setContaTelefonica(file);
    const file = event.target.files[0];

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post("https://file.io/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setDownloadLink3003(response.data.link);

      // Aqui você pode enviar o link response.data.link por email usando um serviço de envio de emails (por exemplo, SendGrid).
    } catch (error) {
      console.error("Erro ao fazer upload do arquivo:", error);
    }
  };

  const handlePortarNumeroChange = (event) => {
    setPortarNumero((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    // Send the updated portarnumero data back to the parent component
    onPortabilidadeDataChange(portarNumero);
  };
  const validateCpf = (value) => {
    const cpfRegex = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    if (cpfRegex.test(value) && validarCPF(value)) {
      setCpfPort3003(value);
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  };

  const handleCpfChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      setCpfPort3003(value);
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
      setCnpjPort3003(value);
      setCnpjError("");
    } else {
      setCnpjError("CNPJ inválido");
    }
  };

  const handleCnpjChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 14) {
      setCnpjPort3003(value);
      if (value.length === 14) {
        validateCnpj(value);
      } else {
        setCnpjError("");
      }
    }
  };

  return (
    <div
      style={
        savedNumbers.length > 0
          ? { height: "50vh", overflow: "auto", marginTop: "20px" }
          : { height: "100%", overflow: "auto" }
      }
    >
      <Container maxWidth="lg">
        <div className="box">
          <Typography variant="h4" align="center" sx={{ marginBottom: "1rem" }}>
            Portabilidade
          </Typography>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>
              Preencha o formulário com os dados do(s) número(s) que será(ão)
              portado(s)
            </span>
            <span style={{ marginBottom: "10px" }}>
              Não é possível portar número de celular.
            </span>
          </div>
          <div className="Modal">
            <Modal
              isOpen={modalOpen}
              onClose={() => setModalOpen(false)}
              dialogClassName="custom-modal"
            >
              <Box
                sx={{
                  my: 4,
                  top: "80%",
                  minHeight: "60vh",
                }}
              >
                <React.Fragment>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={2}>
                      <InputMask
                        mask="(99)"
                        value={dddPort3003}
                        onChange={(event) => setDddPort3003(event.target.value)}
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="dddPort3003"
                            name="dddPort3003"
                            label="DDD"
                            fullWidth
                            inputProps={inputProps}
                            style={{ borderRadius: "16px" }}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} sm={2.5}>
                      <InputMask
                        mask="9999-9999"
                        value={portarNumero.numeroPort3003}
                        onChange={(event) =>
                          setNumeroPort3003(event.target.value)
                        }
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="numeroPort3003"
                            name="numeroPort3003"
                            label="Número"
                            fullWidth
                            inputProps={inputProps}
                            style={{ borderRadius: "16px" }}
                          />
                        )}
                      </InputMask>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        required
                        id="operadoraPort3003"
                        name="operadoraPort3003"
                        label="Operadora"
                        value={operadoraPort3003}
                        onChange={(event) =>
                          setOperadoraPort3003(event.target.value)
                        }
                        style={{
                          borderRadius: "16px",
                          width: "100%",
                          height: "50%",
                          "@media (maxWidth: 800px)": { width: "70%" },
                        }}
                      />
                    </Grid>

                    <Grid item xs={6} sm={2} style={{ marginLeft: "25px" }}>
                      <span style={{ fontSize: "15px" }}>Conta Telefônica</span>
                      <Button
                        variant="contained"
                        component="label"
                        fullWidth
                        style={{ borderRadius: "16px", marginTop: "10px" }}
                      >
                        SELECIONAR
                        <input
                          type="file"
                          accept="application/pdf"
                          style={{ display: "none" }}
                          onChange={handleUpload}
                          name="contaTelefonica3003"
                        />
                      </Button>

                      {contaTelefonica3003 && (
                        <span style={{ fontSize: "10px" }}>
                          {contaTelefonica3003.name}
                        </span>
                      )}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <FormControl fullWidth sx={{ borderRadius: "16px" }}>
                        <InputLabel id="tipo-label">Tipo</InputLabel>
                        <Select
                          labelId="tipo-label"
                          id="tipo"
                          label="Tipo"
                          value={tipoPessoaPort3003}
                          onChange={handleTipoChange}
                          fullWidth
                          sx={{
                            borderRadius: "16px",
                            marginLeft: "10px",
                            width: "80%",
                          }}
                        >
                          <MenuItem value="fisica">Pessoa Física</MenuItem>
                          <MenuItem value="juridica">Pessoa Jurídica</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    {tipoPessoaPort3003 === "fisica" ? (
                      <>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            required
                            id="nomeCompletoPort3003"
                            name="nomeCompletoPort3003"
                            label="Nome Completo"
                            fullWidth
                            onChange={(event) =>
                              setNomeCompletoPort3003(event.target.value)
                            }
                            sx={{
                              borderRadius: "16px",
                              marginLeft: "10px",
                              width: "80%",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <InputMask
                            mask="999.999.999-99"
                            value={cpfPort3003}
                            onChange={handleCpfChange}
                          >
                            {(inputProps) => (
                              <div>
                                <TextField
                                  required
                                  id="cpfPort3003"
                                  name="cpfPort3003"
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
                        <Grid item xs={12} sm={4}>
                          <TextField
                            required
                            id="nomeSocialPort3003"
                            name="nomeSocialPort3003"
                            label="Nome Social"
                            fullWidth
                            onChange={(event) =>
                              setnomeSocialPort3003(event.target.value)
                            }
                            sx={{
                              borderRadius: "16px",
                              marginLeft: "10px",
                              width: "80%",
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <InputMask
                            mask="99.999.999/9999-99"
                            value={cnpjPort3003}
                            onChange={handleCnpjChange}
                          >
                            {(inputProps) => (
                              <div>
                                <TextField
                                  required
                                  id="cnpjPort3003"
                                  name="cnpjPort3003"
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
                    <Grid item xs={12} sm={4}>
                      <InputMask
                        mask="99999-999"
                        onBlur={(event) => handleCepBlur(event.target.value)}
                        value={cepPort3003}
                        onChange={(event) => handleCepChange(event)}
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="cepPort3003"
                            name="cepPort3003"
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
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="enderecoPort3003"
                        name="enderecoPort3003"
                        label="Endereço"
                        fullWidth
                        value={enderecoPort3003}
                        onChange={(event) =>
                          setEnderecoPort3003(event.target.value)
                        }
                        sx={{
                          borderRadius: "20px",
                          marginLeft: "10px",
                          width: "80%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        required
                        id="numeroPort3003"
                        name="numeroPort3003"
                        label="Número"
                        fullWidth
                        value={numeroEndPort3003}
                        onChange={(event) =>
                          setNumeroEndPort3003(event.target.value)
                        }
                        sx={{
                          borderRadius: "16px",
                          marginLeft: "10px",
                          width: "80%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        id="complementoPort3003"
                        name="complementoPort3003"
                        label="Complemento"
                        fullWidth
                        value={complementoPort3003}
                        onChange={(event) =>
                          setComplementoPort3003(event.target.value)
                        }
                        sx={{
                          borderRadius: "16px",
                          marginLeft: "10px",
                          width: "80%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="bairroPort3003"
                        name="bairroPort3003"
                        label="Bairro"
                        fullWidth
                        value={bairroPort3003}
                        onChange={(event) =>
                          setBairroPort3003(event.target.value)
                        }
                        sx={{
                          borderRadius: "16px",
                          marginLeft: "10px",
                          width: "80%",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <FormControl
                        fullWidth
                        sx={{
                          borderRadius: "16px",
                          marginLeft: "10px",
                          width: "80%",
                        }}
                      >
                        <InputLabel id="ufPort3003-label">UF</InputLabel>
                        <Select
                          labelId="ufPort3003-label"
                          id="ufPort3003"
                          label="UF"
                          value={ufPort3003}
                          onChange={(event) => setUf3003(event.target.value)}
                          fullWidth
                          sx={{ borderRadius: "16px" }}
                        >
                          {ufs.map((ufPort3003) => (
                            <MenuItem key={ufPort3003} value={ufPort3003}>
                              {ufPort3003}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="cidadePort3003"
                        name="cidadePort3003"
                        label="Cidade"
                        fullWidth
                        value={cidadePort3003}
                        onChange={(event) =>
                          setCidadePort3003(event.target.value)
                        }
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
              </Box>
              <div className="buttons">
                <Button
                  variant="outlined"
                  onClick={handleCloseModal}
                  sx={{ marginBottom: "1rem" }}
                >
                  Fechar
                </Button>
                <Button
                  variant="outlined"
                  onClick={handleSaveNumbers}
                  sx={{ marginBottom: "1rem" }}
                >
                  Salvar
                </Button>
              </div>
            </Modal>
            {savedNumbers.length > 0 &&
              savedNumbers.map((data, index) => (
                <SavedNumberTable
                  key={index}
                  data={data}
                  onRemove={handleRemoveData}
                />
              ))}
          </div>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpenModal}
            sx={{ marginBottom: "1rem", marginTop: "10px" }}
          >
            Adicionar Número
          </Button>
          <span style={{ fontSize: "12px", marginBottom: "10px" }}>
            Para confirmação dos dados, inclua uma imagem da sua conta
            telefônica constando as linhas a serem portadas.
          </span>
        </div>

        <style jsx>{`
          .box {
            display: flex;
            flex-direction: column;
            border: 1px solid rgba(0, 0, 0, 0.125);
            width: 100%;
            border-radius: 0.25rem;
            align-items: center;
            margin-bottom: 30px;
            overflow: auto;
          }
          .titleContainer {
            background-color: rgb(116, 163, 218);
            padding: 10px;
            color: white;
            font-size: 1.2rem;
            font-weight: bold;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            text-align: center;
          }
          .input {
            display: flex;
            margin-left: 20px;
            margin-right: 20px;
          }
          .main {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 90%;
            height: 50%;
            margin-left: 15px;
            position: absolute;
            background-color: #fff;
            border: 1px solid rgba(0, 0, 0, 0.125);
            border-radius: 0.25rem;
            box-shadow: 0 0 10px 0px rgba(0, 0, 0, 0.2);
            padding: 20px;
            margin-bottom: 20px;
          }
          .custom-modal .modal-dialog {
            max-width: none;
            width: 400px; /* Ajuste a largura conforme desejado */
            height: 70vh; /* Defina a altura desejada */
          }
          .buttons {
            display: flex;
            flex-direction: column-reverse;
            align-items: stretch;
          }
        `}</style>
      </Container>
    </div>
  );
}
