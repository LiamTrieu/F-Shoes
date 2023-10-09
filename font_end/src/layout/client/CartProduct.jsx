import React from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

export default function CartProduct({ products, colmd, collg }) {
  return (
    <Grid container rowSpacing={1} columnSpacing={3}>
      {products.map((product, i) => {
        return (
          <Grid key={i} item xs={6} sm={6} md={colmd} lg={collg} width={"100%"}>
            <Button
              component={Link}
              to={`/product/${product.id}`}
              sx={{ width: "100%", p: 0, my: 1 }}>
              <Card sx={{ width: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                  }}>
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                    <CardMedia
                      component="img"
                      alt="Product"
                      image={product.image}
                      sx={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                </CardContent>
              </Card>
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
}
