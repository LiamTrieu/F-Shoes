import { Box, Container, Grid, Typography } from "@mui/material";
import React from "react";

export default function FooterClient() {
  return (
    <Box
      sx={{
        boxShadow: "0px -4px 5px -2px rgba(0,0,0,0.14), 0px 0px",
        width: "100%",
        backgroundColor: "white",
        mt: 2,
      }}>
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h6" fontWeight={600}>
              Đây là FOOTER
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | React | Material UI | Spring Boot`}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
