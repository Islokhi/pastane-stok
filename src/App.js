import './App.css';
import { useState, useEffect } from 'react';
import { db } from "./firebase";
import { collection, getDocs } from 'firebase/firestore';
import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import ActionAreaCard from './ui_components/card';

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db,"products")
      const documentRef = await getDocs(collectionRef)  
      const fetchedData = documentRef.docs.map((doc) => doc.data());
      setData(fetchedData);
    }

    fetchData()
  }, [])

  return (
    <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
            {data.map((item, index) => (
              <Grid xs={2} sm={4} md={4} key={index}>
                {ActionAreaCard(item.title, item.description, item.image)}
              </Grid>
            ))}
          </Grid>
        </Box> 
  );
}

export default App;
