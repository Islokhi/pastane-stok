import * as React from 'react';
import { useEffect, useState } from "react";
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import TextField from '@mui/material/TextField';
import getGetProducts from './GetProducts';
import { collection, getDocs, query, updateDoc, doc, addDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

function App() {

  const [products, setProducts] = useState([])

  // ürün getirme
  const q = query(
    collection(db, 'products')
  )
  getDocs(q).then((val) => {
    var list = []
    val.docs.map((doc) => {
      list.push({ ...doc.data(), id: doc.id, })
    })
    setProducts(list)
  })
  const [title, settitle] = useState([])
  const [stock, setstock] = useState([])
  const [image, setimage] = useState([])

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <BakeryDiningIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Şerbetçi Baba
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Pastane Stok
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Bu uygulama bir pastanenin stok kontrolünün yapılmabilmesine imkan sağlamaktadır.

            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              Bu proje BTK staj programında crud işlemlerinin öğrenilmesi için yapılmıştır.
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained" href='https://github.com/Islokhi'>GitHub</Button>
            </Stack>
          </Container>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={1}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Typography variant="h6" color="inherit" noWrap>
              Ürün Ekleme
            </Typography>
          </Grid>
          <Grid item xs={12} sm={9}>
            <hr />
          </Grid>
          <Grid item xs={12} sm={1}>
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField id="outlined-basic" label="Ürün Adı" variant="outlined" onChange={e => settitle(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <TextField id="outlined-basic" label="Stok Miktarı" variant="outlined" onChange={e => setstock(e.target.value)} />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField id="outlined-basic" label="Ürün Görseli" variant="outlined" onChange={e => setimage(e.target.value)} />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Button variant="contained" onClick={() => {
              const patient = addDoc(collection(db, 'products'), {
                title: title,
                stock: parseInt(stock),
                image: image,
              })
            }} >Ürünü Ekle</Button>
          </Grid>
          <Grid item xs={12} sm={12}>
            <hr />
          </Grid>
        </Grid>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {products.map((product) => (
              <Grid item key={product.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <CardMedia
                    component="div"
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image={product.image}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.title}
                    </Typography>
                    <Typography gutterBottom variant="h5">
                      Stok:{product.stock}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button variant="outlined" startIcon={<AddIcon />} onClick={() => {
                      updateDoc(doc(db, 'products', product.id), {
                        stock: product.stock + 1
                      })
                    }}>Ekle</Button>
                    <Button variant="outlined" startIcon={<RemoveIcon />} onClick={() => {
                      updateDoc(doc(db, 'products', product.id), {
                        stock: product.stock - 1
                      })
                    }}>Çıkar</Button>
                    <Button variant="outlined" startIcon={<DeleteIcon />}
                      onClick={() => {
                        deleteDoc(doc(db, 'products', product.id))
                      }}>
                      Sil
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Şerbetçi Baba
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Tatlıcılık Bizim İşimiz...
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}


export default App;
