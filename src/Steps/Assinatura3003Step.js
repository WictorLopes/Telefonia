import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Modal from "react-modal";
import MUIDataTable from "mui-datatables";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import numerosData from "../../components/assinatura3003Numeros";
import Portabilidade from "../../components/PortarNumero3003";

import {
  Container,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

export default function Assinatura3003Step({
  assinaturas3003,
  onAssinatura3003Change,
  onNext,
  defaultValue,
  onPortarNumeroDataChange3003,
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  const [assinatura3003pos, setAssinatura3003pos] = useState(
    defaultValue?.assinatura3003pos || false
  );
  const [portarNumero, setPortarNumero] = useState(
    defaultValue?.portarNumero || false
  );
  const [canais3003, setCanais] = useState(defaultValue?.canais3003 || 0);
  const [tipoPlano3003, setTipoPlano] = useState(
    defaultValue?.tipoPlano3003 || "canaisSIP"
  );
  const [exibirSegundoSelect, setExibirSegundoSelect] = useState(
    defaultValue?.exibirSegundoSelect || false
  );
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [showTable, setShowTable] = useState(defaultValue?.showTable || false);
  const [selectedNumbersData3003, setSelectedNumbersData] = useState(
    defaultValue?.selectedNumbersData3003 || []
  );
  let [valorTotalAssinatura3003, setvalorTotalAssinatura3003] = useState(
    defaultValue?.valorTotalAssinatura3003 || ""
  );
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 700);
  const [open, setOpen] = useState(false);

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
    handleSaveData();
    calculateTotal();
  }, [
    assinatura3003pos,
    portarNumero,
    canais3003,
    tipoPlano3003,
    exibirSegundoSelect,
    showTable,
    valorTotalAssinatura3003,
  ]);

  const handleSaveData = () => {
    onNext({
      assinatura3003pos,
      portarNumero,
      canais3003,
      tipoPlano3003,
      exibirSegundoSelect,
      selectedNumbersData3003,
      showTable,
      valorTotalAssinatura3003,
    });
  };
  const handlePortarNumeroDataChange3003 = (portarNumeroData) => {
    onNext({ ...defaultValue, ...portarNumeroData });
    onPortarNumeroDataChange3003(portarNumeroData);
  };

  const handlePortarNumeroChange = (event) => {
    setPortarNumero(event.target.checked);
    // if (event.target.checked) {
    //   setOpen(true);
    // } else {
    //   setOpen(false);
    // }
  };

  const handleClose = () => {
    setOpen(false);
    setPortarNumero(false);
  };

  const handleChange = (event) => {
    const value = event.target.value;
    if (value === "ilimitado") {
      if (assinatura3003pos) {
        setAssinatura3003pos(false);
        onAssinatura3003Change("assinaturas");
      }
      setExibirSegundoSelect(true);
    } else {
      setExibirSegundoSelect(false);
    }
    onAssinatura3003Change(value);
  };

  const handleNumberRemoval = (number) => {
    let updatedNumbersData = selectedNumbersData3003.filter(
      (item) => item !== number
    );
    setSelectedNumbersData(updatedNumbersData);

    const updatedRows = selectedRows.filter((rowIndex) => {
      const numberInDataTable = dataTable[rowIndex][0];
      return String(numberInDataTable) !== String(number);
    });

    setSelectedRows(updatedRows);
  };

  const handleAssinatura3003posChange = (event) => {
    const checked = event.target.checked;
    setAssinatura3003pos(checked);
    if (checked && assinaturas3003 === "ilimitado") {
      onAssinatura3003Change("assinaturas");
      setExibirSegundoSelect(false);
    }
  };

  const handleIncrement = () => {
    setCanais((prevCanais) => prevCanais + 1);
  };

  const handleDecrement = () => {
    if (canais3003 > 0) {
      setCanais((prevCanais) => prevCanais - 1);
    }
  };

  const handleSaveNumbers = () => {
    const selectedNumbersData3003 = selectedRows.map(
      (index) => dataTable[index][0]
    );

    setSelectedNumbers(selectedNumbersData3003);
    setSelectedNumbersData(selectedNumbersData3003);
    setShowTable(true);
    closeModal();

    onNext({
      assinatura3003pos,
      portarNumero,
      canais3003,
      tipoPlano3003,
      exibirSegundoSelect,
      selectedNumbers: selectedNumbersData3003,
      valorTotalAssinatura3003,
    });
  };

  const dataTable = numerosData.map((item) => [item.numeros, item.selected]);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleTipoPlanoChange = (event) => {
    setTipoPlano(event.target.value);
  };

  const calculateTotal = () => {
    const total = canais3003 * 69.9;
    setvalorTotalAssinatura3003(total.toFixed(2));
  };

  const handleRowSelect = (currentRowsSelected, allRowsSelected) => {
    if (Array.isArray(allRowsSelected)) {
      setSelectedRows(allRowsSelected.map((row) => row.index));
    }
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
    overflowY: "auto",
  };
  const smallScreenStyle = {
    width: "80%",
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
    overflowY: "auto",
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          overflowX: "hidden",
          ...stepBoxStyle,
          "@media (max-width: 800px)": smallScreenStyle,
          maxHeight: "80vh", // Defina a altura máxima para o contêiner de steps
        }}
      >
        <div className="box">
          <div className="titleContainer">
            <Typography variant="h6" component="h1" gutterBottom>
              Assinatura 3003
            </Typography>
          </div>
          <div className="selectContainer" style={{ width: "130%" }}>
            <Select
              value={assinaturas3003}
              onChange={handleChange}
              sx={{
                borderRadius: "16px",
                width: "40%",
                textAlign: "left",
                height: "40px",
              }}
              MenuProps={{
                anchorOrigin: { vertical: "bottom", horizontal: "left" },
                transformOrigin: { vertical: "top", horizontal: "left" },
              }}
            >
              <MenuItem value="assinaturas">Assinaturas</MenuItem>
              <MenuItem value="ilimitado">Ilimitado</MenuItem>
            </Select>
          </div>
          <div className="checkboxContainer">
            <div>
              <Checkbox
                checked={assinatura3003pos}
                onChange={handleAssinatura3003posChange}
              />
              <label>Assinatura 3003 Pós</label>
            </div>
            <div>
              <Checkbox
                checked={portarNumero}
                onChange={handlePortarNumeroChange}
              />
              <label>Portar meu número</label>
            </div>
          </div>

          {assinatura3003pos && !exibirSegundoSelect && (
            <div className="boxAssinatura">
              <div className="canaisContainer">
                <button onClick={handleDecrement}>-</button>
                <span>{canais3003}</span>
                <button onClick={handleIncrement}>+</button>
              </div>
              <div className="valorPorCanalContainer">
                <span style={{ fontWeight: "bold" }}>69.90</span> por canal
              </div>
              <div className="totalContainer">
                <Typography variant="body1" component="span">
                  <span style={{ fontWeight: "bold" }}>Total R$:</span>{" "}
                  {valorTotalAssinatura3003}
                </Typography>
              </div>
            </div>
          )}
          {exibirSegundoSelect && (
            <div className="selectContainerIlimitado">
              <Select
                value={tipoPlano3003}
                onChange={handleTipoPlanoChange}
                sx={{
                  borderRadius: "16px",
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
                <MenuItem value="174,90">1 - R$ 174,90</MenuItem>
                <MenuItem value="448,90">3 - R$ 448,90</MenuItem>
                <MenuItem value="729,90">5 - R$ 729,90</MenuItem>
                <MenuItem value="1.429,90">10 - R$ 1.429,90</MenuItem>
                <MenuItem value="2.099,90">15 - R$ 2.099,90</MenuItem>
                <MenuItem value="2.739,90">20 - R$ 2.739,90</MenuItem>
                <MenuItem value="4.029,90">30 - R$ 4.029,90</MenuItem>
                <MenuItem value="7.899,90">60 - R$ 7.899,90</MenuItem>
              </Select>
            </div>
          )}
          <div className="portabilidadeShowTable">
            {portarNumero && (
              <Portabilidade
                open={open}
                onClose={handleClose}
                defaultValue={defaultValue}
                onPortarNumeroDataChange3003={handlePortarNumeroDataChange3003}
              />
            )}
            {showTable && selectedNumbersData3003.length > 0 && (
              <div className="tableContainer">
                <Typography
                  variant="h6"
                  component="h2"
                  gutterBottom
                  className="titleCenter"
                >
                  Números Paco 3003
                </Typography>
                <MUIDataTable
                  title={""}
                  data={selectedNumbersData3003.map((number, index) => [
                    index + 1,
                    number,
                    "3003",
                    0, // TODO calcular valor, por enquanto ta fixo 0
                    <DeleteIcon
                      onClick={() => handleNumberRemoval(number)}
                      style={{ cursor: "pointer" }}
                    />,
                  ])}
                  columns={[
                    { name: "Quantidade" },
                    { name: "Número" },
                    { name: "Tipo do Plano" },
                    { name: "Valor" },
                    { name: "Remover" },
                  ]}
                  options={{
                    filter: false,
                    download: false,
                    print: false,
                    selectableRows: "none",
                  }}
                />
              </div>
            )}
          </div>

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
          <div className={isSmallScreen ? "" : "defaultModal"}>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
              portalClassName="smallScreenModal"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: "16px",
                }}
              >
                <CloseIcon onClick={closeModal} />
              </div>
              <MUIDataTable
                title={"Números disponíveis"}
                data={dataTable}
                columns={[
                  {
                    name: "Número",
                  },
                  {
                    name: "Selecionar",
                    options: {
                      filter: false,
                      customBodyRender: (value, tableMeta) => (
                        <Checkbox
                          checked={selectedRows.includes(tableMeta.rowIndex)}
                          onChange={() => {
                            const toggledRowIndex = tableMeta.rowIndex;
                            const isRowSelected =
                              selectedRows.includes(toggledRowIndex);
                            const updatedSelectedRows = isRowSelected
                              ? selectedRows.filter(
                                  (rowIndex) => rowIndex !== toggledRowIndex
                                )
                              : [...selectedRows, toggledRowIndex];
                            handleRowSelect(
                              null,
                              updatedSelectedRows.map((rowIndex) => ({
                                index: rowIndex,
                              }))
                            );
                          }}
                        />
                      ),
                    },
                  },
                ]}
                options={{
                  filter: false,
                  download: false,
                  print: false,
                  selectableRows: "none",
                  onRowSelectionChange: handleRowSelect,
                  customToolbarSelect: () => (
                    <Button variant="contained" color="primary">
                      Selecionar
                    </Button>
                  ),
                }}
              />
              <span
                style={{
                  display: "flex",
                  marginTop: "20px",
                  justifyContent: "center",
                  fontWeight: "bold",
                  fontSize: "80%",
                }}
              >
                Importante! Os números não são garantidos até a compra ser
                aprovada e confirmada.
              </span>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "16px",
                }}
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={closeModal}
                  style={{ marginRight: "8px" }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSaveNumbers}
                >
                  Salvar Número
                </Button>
              </div>
            </Modal>
          </div>
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
          transition: height 0.3s ease-in-out;
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
          margin-top: 22px;
          margin-left: 20px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row;
          flex-wrap: nowrap;
          align-content: stretch;
        }
        .selectContainerIlimitado {
          margin-top: -105px;
          margin-right: 20px;
          display: flex;
          justify-content: flex-start;
          flex-direction: row-reverse;
          flex-wrap: nowrap;
          align-content: stretch;
          margin-bottom: 67px;
        }
        .canaisContainer {
          display: flex;
          align-items: center;
          border: 1px solid #ccc;
          border-radius: 4px;
          position: absolute;
          left: 60%;
          width: 20%;
          margin-top: -105px;
          margin-right: 20px;
          justify-content: flex-start;
          flex-direction: row;
          flex-wrap: nowrap;
          align-content: stretch;
          margin-bottom: 67px;
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
        .boxAssinatura {
          display: flex;
          justify-content: flex-end;
          margin-right: 10%;
        }

        .valorPorCanalContainer {
          position: absolute;
          text-align: center;
          width: 40%;
          margin-top: -65px;
        }
        .buttonContainer {
          display: flex;
          align-items: center;
          flex-direction: column;
          margin-top: 20px;
        }
        .titleCenter {
          text-align: center;
          margin-bottom: 16px;
        }
        .tableContainer {
          margin-top: 20px;
          text-align: center;
          width: 80%;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 20px;
        }
        .defaultModal {
          overlay: {
            background-color: rgba(0, 0, 0, 0.5);
          }
          content: {
            top: 50%;
            left: 50%;
            right: auto;
            bottom: auto;
            transform: translate(-50%, -50%);
            width: 650px;
            max-height: 80vh;
            padding: 24px;
            border-radius: 8px;
            display: flex;
            flex-direction: column;
            align-items: stretch;
          }
        }

        .smallScreenModal {
          top: 50%;
          left: 50%;
          right: auto;
          bottom: auto;
          transform: translate(-50%, -50%);
          width: 150px;
          max-height: 80vh;
          padding: 24px;
          border-radius: 8px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
        }

        @media (max-width: 700px) {
          .box {
            overflow-y: auto;
            overflow-x: hidden;
            max-height: 570px;
          }
          .boxAssinatura {
            margin-top: 100px;
            margin-bottom: 25px;
          }
          .selectContainerIlimitado {
            margin-top: 55px;
            margin-bottom: -20px;
            width: 133%;
            margin-left: -220px;
          }
          .canaisContainer {
            left: 50%;
            width: 40%;
          }
          .totalContainer {
            margin-top: -35px;
          }
          .tableContainer {
            display: flex;
            flex-direction: column;
          }
        }
      `}</style>
    </Container>
  );
}
