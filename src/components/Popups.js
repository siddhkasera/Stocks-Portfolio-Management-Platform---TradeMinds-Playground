import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  TextField,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  Button,
  Switch,
  FormGroup
} from '@mui/material'
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Popups ({ open, closeModal, stockname, userid }) {
  // const [price,setPrice]=useState([]);
  const [quantity, setQuantity] = useState('')
  const [close, setClose] = useState(0)
  let [stock, setStock] = useState({})

  useEffect(() => {
    axios
      .get(
        `http://localhost:8080/stock-data?symbol=${stockname}&from=2023-11-21&to=2023-11-30&period=d`
      )
      .then(response => {
        if (response) {
          stock = { ...response.data[0] }
          setClose(stock.close)
        }
      })
      .catch(e => {
        console.error('Axios Error', e.message)
      })
  }, [])

  const sellStock = () => {
    axios
      .post(`http://localhost:8080/holdings/${userid}`, {
        stock_name: stockname,
        buy_price: 102,
        quantity: -quantity
      })
      .then(response => {
        console.log(response)
      })
      .catch(e => {
        console.error('Axios Error', e.message)
      })
  }

  useEffect(sellStock, [])

  return (
    <Container sx={{ bgcolor: 'black', padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper
            elevation={3}
            sx={{
              p: '1em',
              display: 'flex',
              flexDirection: 'column',
              gap: '2em',
              minWidth: 390,
              marginBottom: 2,
              padding: '20px'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex' }}>
                <Typography>
                  <strong>Sell</strong>&nbsp;&nbsp;
                </Typography>
                <Typography>
                  <strong>{stockname}</strong>&nbsp;&nbsp;
                </Typography>
                <Typography>
                  <strong>x</strong>&nbsp;&nbsp;
                </Typography>
                <Typography>
                  <strong>{quantity}</strong>&nbsp;&nbsp;
                </Typography>
                <Typography>
                  <strong>Qty</strong>&nbsp;&nbsp;
                </Typography>
              </Box>
              <Box>
                {/* <FormGroup>
                  <FormControlLabel
                    sx={{ color: "white" }}
                    control={<Switch defaultChecked />}
                  />
                </FormGroup> */}
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant='h6'>Qty</Typography>
                <TextField
                  id='quantity'
                  name='quantity'
                  value={quantity}
                  onChange={event => setQuantity(event.target.value)}
                ></TextField>
              </Box>
              <Box>
                <Typography variant='h6'>Price</Typography>
                <TextField
                  id='price'
                  name='price'
                  disabled
                  value={close}
                ></TextField>
                <FormControl>
                  {/* <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="market"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="market"
                      control={<Radio />}
                      label="Market"
                    />
                  </RadioGroup> */}
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box>
                  <Typography variant='h6'>Margin&nbsp;&nbsp;</Typography>
                </Box>
                <Box>
                  <Typography sx={{ color: 'white' }}>Rs 2,000.00</Typography>
                </Box>
              </Box>

              <Box>
                <Button
                  sx={{ color: 'white', bgcolor: 'blue' }}
                  onClick={sellStock}
                >
                  Sell
                </Button>
                &nbsp;&nbsp;
                <Button
                  sx={{ color: 'white', bgcolor: 'blue' }}
                  onClick={() => closeModal()}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Popups
