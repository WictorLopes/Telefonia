import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  Checkbox,
} from "@mui/material";

export default function VencimentoStep({
  valorVencimento,
  onVencimentoChange,
  onNext,
  defaultValue,
}) {
  const [vencimento, setVencimento] = useState(defaultValue || "escolha");

  useEffect(() => {
    onNext({ vencimento });
  }, [vencimento]);

  useEffect(() => {
    setVencimento(defaultValue || "escolha");
  }, [defaultValue]);

  const handleChange = (event) => {
    const value = event.target.value;
    setVencimento(value);
  };

  const handleStepData = (stepData) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [activeStep]: stepData,
    }));

    const vencimentoDefault = stepData.vencimento;
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
        sx={{ ...stepBoxStyle, "@media (max-width: 800px)": smallScreenStyle }}
      >
        <div className="box">
          <div className="titleContainer">
            <Typography variant="h6" component="h1" gutterBottom>
              Dia do Vencimento
            </Typography>
          </div>
          <div className="selectContainer">
            <Select
              value={vencimento}
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
              <MenuItem value="escolha">Escolha o dia de vencimento</MenuItem>
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="20">20</MenuItem>
              <MenuItem value="25">25</MenuItem>
            </Select>
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
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .titleContainer {
          color: black;
          text-align: center;
        }
        .selectContainer {
          margin-top: 30px;
          margin-bottom: 30px;
          text-align: center;
        }
        @media (max-width: 700px) {
          .selectContainer {
            width: 160%;
            margin-left: -90px;
          }
        }
      `}</style>
    </Container>
  );
}
