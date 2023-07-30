import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import Portabilidade from "../../components/PortarNumero";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import MUIDataTable from "mui-datatables";
import cidadesAtendidas from "../../components/cidadesAtendidas.json";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";

export default function PlanoDeVozStep({
  onNext,
  defaultValue,
  onPortarNumeroDataChange,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [planoIlimitado, setPlanoIlimitado] = useState(
    defaultValue?.planoIlimitado || false
  );
  const [assinaturaSTFC, setAssinaturaSTFC] = useState(
    defaultValue?.assinaturaSTFC || false
  );
  const [portarNumero, setPortarNumero] = useState(
    defaultValue?.portarNumero || false
  );
  const [tipoPlanoDeVoz, setTipoPlano] = useState(
    defaultValue?.tipoPlanoDeVoz || "canaisSIP"
  );
  const [canaisPlanoDeVoz, setCanais] = useState(
    defaultValue?.canaisPlanoDeVoz || 0
  );
  let [valorTotalPlanoDeVoz, setvalorTotalPlanoDeVoz] = useState(
    defaultValue?.valorTotalPlanoDeVoz || ""
  );
  const [open, setOpen] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const [showPortabilidade, setShowPortabilidade] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 700);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    calculateTotal();
    handleSaveData();
  }, [
    planoIlimitado,
    assinaturaSTFC,
    portarNumero,
    tipoPlanoDeVoz,
    canaisPlanoDeVoz,
    valorTotalPlanoDeVoz,
  ]);

  const handleSaveData = () => {
    onNext({
      planoIlimitado,
      assinaturaSTFC,
      portarNumero,
      tipoPlanoDeVoz,
      canaisPlanoDeVoz,
      valorTotalPlanoDeVoz,
    });
  };
  

  const handlePortarNumeroDataChange = (portarNumeroData) => {
    onNext({ ...defaultValue, ...portarNumeroData });
    onPortarNumeroDataChange(portarNumeroData);
  };

  const handleTipoChange = (event) => {
    const tipoSelecionado = event.target.value;
    setTipoPessoa(tipoSelecionado);
    setNomeCompleto("");
    setCpf("");
    setNomeSocial("");
    setCnpj("");
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

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const fetchAddress = async (cep) => {
    if (cep.length === 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();
      if (!data.erro) {
        setEndereco(data.logradouro);
        setBairro(data.bairro);
        setUf(data.uf);
        setCidade(data.localidade);
      }
    }
  };

  const handleCepChange = (cep) => {
    const cepDigitsOnly = cep.replace(/\D/g, "");
    fetchAddress(cepDigitsOnly);
  };
  const handleCepBlur = (event) => {
    handleCepChange(event.target.value);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handlePortarNumeroChange = (event) => {
    setPortarNumero(event.target.checked);
    if (event.target.checked) {
      setOpen(true);
    } else {
      setPortarNumero(false);
      setOpen(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPortarNumero(false);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setCartaTelefonica(file);
  };

  const handlePlanoIlimitadoChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setAssinaturaSTFC(false);
    }
    setPlanoIlimitado(checked);
  };

  const handleAssinaturaSTFCChange = (event) => {
    const checked = event.target.checked;
    if (checked) {
      setPlanoIlimitado(false);
    }
    setAssinaturaSTFC(checked);
  };

  const handleTipoPlanoChange = (event) => {
    setTipoPlano(event.target.value);
  };

  const handleIncrement = () => {
    setCanais((prevCanais) => prevCanais + 1);
  };

  const handleDecrement = () => {
    if (canaisPlanoDeVoz > 0) {
      setCanais((prevCanais) => prevCanais - 1);
    }
  };

  const calculateTotal = () => {
    const total = canaisPlanoDeVoz * 19.9;
    setvalorTotalPlanoDeVoz(total.toFixed(2));
  };

  const stepBoxStyle = {
    my: 4,
    width: "50%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
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
        sx={{ ...stepBoxStyle, "@media (max-width: 800px)": smallScreenStyle }}
      >
        <div className="box">
          <div className="titleContainer">
            <Typography variant="h6" component="h1" gutterBottom>
              Plano de voz
            </Typography>
          </div>

          <div className="checkboxContainer">
            <div>
              <Checkbox
                checked={planoIlimitado}
                onChange={handlePlanoIlimitadoChange}
              />
              <label>Plano Ilimitado</label>
            </div>
            <div>
              <Checkbox
                checked={assinaturaSTFC}
                onChange={handleAssinaturaSTFCChange}
              />
              <label>Assinatura STFC</label>
            </div>
            <div>
              <Checkbox
                checked={portarNumero}
                onChange={handlePortarNumeroChange}
              />
              <label>Portar meu número</label>
            </div>
          </div>

          {planoIlimitado && (
            <div className="selectContainer">
              <Select
                value={tipoPlanoDeVoz}
                onChange={handleTipoPlanoChange}
                sx={{
                  borderRadius: "16px",
                  bottom: 80,
                  left: 200,
                  transform: "translateY(-100%)",
                  height: "40px",
                  width: "40%",
                  textAlign: "left",
                }}
                MenuProps={{
                  anchorOrigin: { vertical: "bottom", horizontal: "right" },
                  transformOrigin: { vertical: "top", horizontal: "right" },
                }}
              >
                <MenuItem value="canaisSIP">Canais SIP</MenuItem>
                <MenuItem value="69,90">1 - R$ 69,90</MenuItem>
                <MenuItem value="139,80">2 - R$ 139,80</MenuItem>
                <MenuItem value="197,70">3 - R$ 197,70</MenuItem>
                <MenuItem value="293,00">5 - R$ 293,00</MenuItem>
                <MenuItem value="444,00">10 - R$ 444,00</MenuItem>
                <MenuItem value="793,50">15 - R$ 793,50</MenuItem>
                <MenuItem value="959,90">20 - R$ 959,90</MenuItem>
                <MenuItem value="1.077,00">30 - R$ 1.077,00</MenuItem>
                <MenuItem value="2.150,00">60 - R$ 2.150,00</MenuItem>
              </Select>
            </div>
          )}
          {assinaturaSTFC && (
            <div className="boxAssinatura">
              <div className={`canaisContainer ${portarNumero ? "ativo" : ""}`}>
                <button onClick={handleDecrement}>-</button>
                <span>{canaisPlanoDeVoz}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <div className="valorPorCanalContainer">
                <span style={{ fontWeight: "bold" }}>19.90</span> por canal
              </div>
              <div className="totalContainer">
                <Typography variant="body1" component="span">
                  <span style={{ fontWeight: "bold" }}>Total R$:</span>{" "}
                  {valorTotalPlanoDeVoz}
                </Typography>
              </div>
            </div>
          )}

          {portarNumero && (
            <div style={{ display: "flex", marginTop: "15px" }}>
              <Portabilidade
                open={open}
                onClose={handleClose}
                onPortarNumeroDataChange={handlePortarNumeroDataChange}
                onChange={handlePortarNumeroChange}
              />
            </div>
          )}
          <div className="buttonContainer">
            <Button
              variant="contained"
              color="secondary"
              onClick={openModal}
              fullWidth
              sx={{
                borderRadius: "16px",
                marginBottom: "10px",
                width: "80%",
              }}
            >
              Adicionar Número
            </Button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            portalClassName="custom-modal-root"
          >
            <div
              className={isSmallScreen ? "smallScreenModal" : "defaultModal"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "16px",
                }}
              >
                <Typography variant="h6">Números disponíveis</Typography>
                <CloseIcon onClick={closeModal} />
              </div>
              <hr
                style={{
                  width: "100%",
                  margin: "16px 0",
                  border: "none",
                  padding: "0",
                }}
              />
              <div className="selectAdicionarNumero">
                <Select
                  value={selectedState}
                  onChange={handleStateChange}
                  displayEmpty
                  renderValue={(value) =>
                    value === "" ? "Selecione o estado (UF)" : value
                  }
                  sx={{
                    borderRadius: "16px",
                    width: "100%",
                    textAlign: "left",
                    height: "40px",
                    marginBottom: "10px",
                  }}
                >
                  <MenuItem value="">Selecione o estado</MenuItem>
                  {Object.keys(cidadesAtendidas).map((estado) => (
                    <MenuItem key={estado} value={estado}>
                      {estado}
                    </MenuItem>
                  ))}
                </Select>

                <Select
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedState}
                  sx={{
                    borderRadius: "16px",
                    width: "100%",
                    textAlign: "left",
                    height: "40px",
                    marginBottom: "10px",
                  }}
                >
                  <MenuItem value="">Selecione a cidade</MenuItem>
                  {selectedState &&
                    cidadesAtendidas[selectedState].cidades.map((cidade) => (
                      <MenuItem key={cidade.nome} value={cidade.nome}>
                        {cidade.nome}
                      </MenuItem>
                    ))}
                </Select>

                <Button onClick={closeModal} style={{ marginTop: "10px" }}>
                  Fechar
                </Button>
              </div>
            </div>
          </Modal>
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
          transition: height 0.3s ease-in-out; /* Adicionado */
        }
        .titleContainer {
          background-color: rgb(116, 163, 218);
          padding: 10px;
          color: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
          text-align: center;
        }
        .checkboxContainer {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-top: 20px;
          margin-left: 20px;
        }
        .selectContainer {
          display: flex;
          margin-left: 20px;
          flex-direction: row;
        }
        .canaisContainer {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 40%;
        }
        .canaisContainer button {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background-color: #f5f5f5;
          border: none;
          cursor: pointer;
        }
        .canaisContainer span {
          flex: 1;
          text-align: center;
        }
        .canaisContainer.ativo {
          /* Estilos do canaisContainer quando portarNumero está ativo */
          top: 25%;
        }
        .boxAssinatura {
          display: flex;
          justify-content: flex-end;
          margin-right: 10%;
        }
        .valorPorCanalContainer {
          position: absolute;
          text-align: center;
          width: 40%;
          margin-top: -25px;
        }
        .buttonContainer {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
        .selectAdicionarNumero {
          width: "300px";
          padding: "20px";
        }
        .smallScreenModal {
          position: absolute;
          inset: 30%40px 40px 20%;
          border: 1px solid rgb(204, 204, 204);
          overflow: auto;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          outline: none;
          padding: 20px;
          width: 85%;
          height: 49%;
          margin-left: -59px;
          background-color: white;
        }
        .defaultModal {
          position: absolute;
          inset: 30% 40px 40px 20%;
          border: 1px solid rgb(204, 204, 204);
          background: rgb(255, 255, 255);
          overflow: auto;
          border-radius: 4px;
          outline: none;
          padding: 20px;
          width: 50%;
          height: 40%;
        }

        @media (max-width: 700px) {
          .boxAssinatura {
            margin-top: 65px;
            margin-bottom: 55px;
          }
          .selectContainer {
            margin-top: 117px;
            /* margin-right: 11px; */
            margin-bottom: -70px;
            width: 135%;
            margin-left: -175px;
          }
          .selectAdicionarNumero {
            border: 1px solid rgb(204, 204, 204);
            background: rgb(255, 255, 255);
            overflow: auto;
            border-radius: 4px;
            padding: 20px;
          }
          .canaisContainer.ativo.jsx-854e4e27fdba52b8 {
            top: 30%;
            width: 45%;
          }
        }
      `}</style>
    </Container>
  );
}
