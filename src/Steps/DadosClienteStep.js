import React, { useState, useEffect } from "react";
import { Container, Box, Typography } from "@mui/material";
import ClientForm from "../../components/clientForm";

export default function DadosCliente({ onNext, formData }) {
  const handleNext = (formData) => {
    onNext(formData);
  };

  const stepBoxStyle = {
    my: 4,
    width: "50%",
    margin: "0 auto",
    position: "fixed",
    left: "50%",
    top: "55%",
    transform: "translate(-50%, -50%)",
  };
  const smallScreenStyle = {
    width: "90%",
    maxHeight: "75%", // Defina uma altura máxima para o conteúdo
    position: "fixed",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0 .5rem 1rem rgba(0,0,0,.15)!important",
    overflow: "auto", // Adicione overflow para permitir que o conteúdo seja rolável
  };
  return (
    <Container maxWidth="sm">
      <Box
        sx={{ ...stepBoxStyle, "@media (max-width: 800px)": smallScreenStyle }}
      >
        <div className="box">
          <div className="titleContainer">
            <Typography variant="h6" component="h1" gutterBottom>
              Dados do cliente
            </Typography>
          </div>
          <ClientForm
            onNext={handleNext}
            formData={formData}
            defaultValue={formData}
          />
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
      `}</style>
    </Container>
  );
}
