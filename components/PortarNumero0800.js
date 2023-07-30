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
            <TableCell>{data.tipoPessoaPort0800}</TableCell>
            <TableCell>
              {data.tipoPessoaPort0800 === "fisica"
                ? data.nomeCompletoPort0800
                : data.nomeSocialPort0800}{" "}
            </TableCell>
            <TableCell>
              {data.tipoPessoaPort0800 === "fisica"
                ? data.cpfPort0800
                : data.cnpjPort0800}
            </TableCell>
            <TableCell>{data.dddPort0800}</TableCell>
            <TableCell>{data.numeroPort0800}</TableCell>
            <TableCell>
              {getTruncatedFileName(data.contaTelefonica0800, 30)}
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
            <TableCell>{data.cepPort0800}</TableCell>
            <TableCell>{data.enderecoPort0800}</TableCell>
            <TableCell>{data.numeroEndPort0800}</TableCell>
            <TableCell>{data.complementoPort0800}</TableCell>
            <TableCell>{data.bairroPort0800}</TableCell>
            <TableCell>{data.cidadePort0800}</TableCell>
            <TableCell>{data.ufPort0800}</TableCell>
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
  onPortarNumeroDataChange0800,
}) {
  const [nomeSocialPort0800, setnomeSocialPort0800] = useState("");
  const [cnpjPort0800, setCnpjPort0800] = useState("");
  const [tipoPessoaPort0800, setTipoPessoaPort0800] = useState("fisica");
  const [nomeCompletoPort0800, setNomeCompletoPort0800] = useState("");
  const [cpfPort0800, setCpfPort0800] = useState("");
  const [dddPort0800, setDddPort0800] = useState("");
  const [numeroPort0800, setNumeroPort0800] = useState("");
  const [operadoraPort0800, setOperadoraPort0800] = useState("");
  const [contaTelefonica0800, setContaTelefonica0800] = useState(null);
  const [cepPort0800, setCepPort0800] = useState(
    defaultValue?.cepPort0800 || ""
  );
  const [enderecoPort0800, setEnderecoPort0800] = useState("");
  const [numeroEndPort0800, setNumeroEndPort0800] = useState(
    defaultValue?.numeroEndPort0800 || ""
  );
  const [complementoPort0800, setComplementoPort0800] = useState(
    defaultValue?.complementoPort0800 || ""
  );
  const [bairroPort0800, setBairroPort0800] = useState("");
  const [ufPort0800, setUf0800] = useState("");
  const [cidadePort0800, setCidadePort0800] = useState("");
  const [portarNumero, setPortarNumero] = useState(false);
  const [cepError, setCepError] = useState("");
  const [cpfError, setCpfError] = useState("");
  const [cnpjError, setCnpjError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [dadosSalvos, setDadosSalvos] = useState(null);
  const [listaDadosSalvos, setListaDadosSalvos] = useState([]);
  const [savedNumbers, setSavedNumbers] = useState([]);
  const [downloadLink0800, setDownloadLink0800] = useState(null);

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
    setTipoPessoaPort0800(tipoSelecionado);
    setNomeCompletoPort0800("");
    setCpfPort0800("");
    setnomeSocialPort0800("");
    setCnpjPort0800("");
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
      nomeSocialPort0800,
      cnpjPort0800,
      tipoPessoaPort0800,
      nomeCompletoPort0800,
      cpfPort0800,
      dddPort0800,
      numeroPort0800,
      operadoraPort0800,
      contaTelefonica0800,
      cepPort0800,
      enderecoPort0800,
      numeroEndPort0800,
      complementoPort0800,
      bairroPort0800,
      ufPort0800,
      cidadePort0800,
      portarNumero: portarNumero,
      downloadLink0800,
    };

    onPortarNumeroDataChange0800(dados);
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
      setCepPort0800(value);
      setCepError("");
    } else {
      setCepError("CEP inválido");
    }
  };

  const fetchAddress = async (cepPort0800) => {
    if (cepPort0800.length === 8) {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepPort0800}/json/`
      );
      const data = await response.json();
      if (!data.erro) {
        setEnderecoPort0800(data.logradouro);
        setBairroPort0800(data.bairroPort0800);
        setUf0800(data.ufPort0800);
        setCidadePort0800(data.localidade);
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
      setCepPort0800(value);
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
    setContaTelefonica0800(null);
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

      setDownloadLink0800(response.data.link);

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
      setCpfPort0800(value);
      setCpfError("");
    } else {
      setCpfError("CPF inválido");
    }
  };

  const handleCpfChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 11) {
      setCpfPort0800(value);
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
      setCnpjPort0800(value);
      setCnpjError("");
    } else {
      setCnpjError("CNPJ inválido");
    }
  };

  const handleCnpjChange = (event) => {
    const value = event.target.value.replace(/\D/g, "");

    if (value.length <= 14) {
      setCnpjPort0800(value);
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
                        value={dddPort0800}
                        onChange={(event) => setDddPort0800(event.target.value)}
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="dddPort0800"
                            name="dddPort0800"
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
                        value={portarNumero.numeroPort0800}
                        onChange={(event) =>
                          setNumeroPort0800(event.target.value)
                        }
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="numeroPort0800"
                            name="numeroPort0800"
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
                        id="operadoraPort0800"
                        name="operadoraPort0800"
                        label="Operadora"
                        value={operadoraPort0800}
                        onChange={(event) =>
                          setOperadoraPort0800(event.target.value)
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
                          name="contaTelefonica0800"
                        />
                      </Button>

                      {contaTelefonica0800 && (
                        <span style={{ fontSize: "10px" }}>
                          {contaTelefonica0800.name}
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
                          value={tipoPessoaPort0800}
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
                    {tipoPessoaPort0800 === "fisica" ? (
                      <>
                        <Grid item xs={12} sm={4}>
                          <TextField
                            required
                            id="nomeCompletoPort0800"
                            name="nomeCompletoPort0800"
                            label="Nome Completo"
                            fullWidth
                            onChange={(event) =>
                              setNomeCompletoPort0800(event.target.value)
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
                            value={cpfPort0800}
                            onChange={handleCpfChange}
                          >
                            {(inputProps) => (
                              <div>
                                <TextField
                                  required
                                  id="cpfPort0800"
                                  name="cpfPort0800"
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
                            id="nomeSocialPort0800"
                            name="nomeSocialPort0800"
                            label="Nome Social"
                            fullWidth
                            onChange={(event) =>
                              setnomeSocialPort0800(event.target.value)
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
                            value={cnpjPort0800}
                            onChange={handleCnpjChange}
                          >
                            {(inputProps) => (
                              <div>
                                <TextField
                                  required
                                  id="cnpjPort0800"
                                  name="cnpjPort0800"
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
                        value={cepPort0800}
                        onChange={(event) => handleCepChange(event)}
                      >
                        {(inputProps) => (
                          <TextField
                            required
                            id="cepPort0800"
                            name="cepPort0800"
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
                        id="enderecoPort0800"
                        name="enderecoPort0800"
                        label="Endereço"
                        fullWidth
                        value={enderecoPort0800}
                        onChange={(event) =>
                          setEnderecoPort0800(event.target.value)
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
                        id="numeroPort0800"
                        name="numeroPort0800"
                        label="Número"
                        fullWidth
                        value={numeroEndPort0800}
                        onChange={(event) =>
                          setNumeroEndPort0800(event.target.value)
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
                        id="complementoPort0800"
                        name="complementoPort0800"
                        label="Complemento"
                        fullWidth
                        value={complementoPort0800}
                        onChange={(event) =>
                          setComplementoPort0800(event.target.value)
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
                        id="bairroPort0800"
                        name="bairroPort0800"
                        label="Bairro"
                        fullWidth
                        value={bairroPort0800}
                        onChange={(event) =>
                          setBairroPort0800(event.target.value)
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
                        <InputLabel id="ufPort0800-label">UF</InputLabel>
                        <Select
                          labelId="ufPort0800-label"
                          id="ufPort0800"
                          label="UF"
                          value={ufPort0800}
                          onChange={(event) => setUf0800(event.target.value)}
                          fullWidth
                          sx={{ borderRadius: "16px" }}
                        >
                          {ufs.map((ufPort0800) => (
                            <MenuItem key={ufPort0800} value={ufPort0800}>
                              {ufPort0800}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        id="cidadePort0800"
                        name="cidadePort0800"
                        label="Cidade"
                        fullWidth
                        value={cidadePort0800}
                        onChange={(event) =>
                          setCidadePort0800(event.target.value)
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
