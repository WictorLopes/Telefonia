import React, { useState, useEffect } from "react";
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

export default function FidelidadeStep({ onNext, defaultValue }) {
  const [fidelidade, setFidelidade] = useState(defaultValue || "escolha");

  useEffect(() => {
    // Função para salvar os dados automaticamente
    onNext({ fidelidade });
  }, [fidelidade]);

  const handleFidelidadeChange = (event) => {
    setFidelidade(event.target.value);
  };

  const stepBoxStyle = {
    width: "50%",
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
              Período de fidelidade
            </Typography>
          </div>

          <div className="selectContainer">
            <Select
              value={fidelidade}
              onChange={handleFidelidadeChange}
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
              <MenuItem value="escolha">Escolha uma fidelidade</MenuItem>
              <MenuItem value="12">12 meses</MenuItem>
              <MenuItem value="24">24 meses</MenuItem>
              <MenuItem value="36">36 meses</MenuItem>
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
        }
        .titleContainer {
          background-color: rgb(116, 163, 218);
          padding: 10px;
          color: white;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
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
