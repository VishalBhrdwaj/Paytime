import  { useEffect,useState } from 'react'
import axios from "axios";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function History() {
    const [transactions,setTransactions]=useState([]);
    useEffect(()=>{   
    axios.get("http://localhost:3000/api/v1/history/",{
            headers:{
            "Authorization":`Bearer ${localStorage.getItem("token")}`
        }}).then(res=>{
            console.log(res.data.history);
            setTransactions(res.data.history);
            console.log(transactions)
        })

        return ()=>{
            setTransactions([])
        }
    
    },[])
  return (
    <div className='mt-10 pt-3 pb-10'>
    {
        transactions.length === 0? (
            <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
              <LinearProgress color="secondary" />
              <LinearProgress color="success" />
              <LinearProgress color="inherit" />
            </Stack>
          ):
    (<TableContainer className='border-b-0 pb-12'  component={Paper}>
      <Table align="center"  sx={{ maxWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>From </StyledTableCell>
            <StyledTableCell align="right">To</StyledTableCell>
            <StyledTableCell align="right">Amount&nbsp;(Rs)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction) => (
            <StyledTableRow key={new Date().getMilliseconds()}>
              <StyledTableCell component="th" scope="row">
                {transaction.from.firstname}
              </StyledTableCell>
              <StyledTableCell align="right">{transaction.to.firstname}</StyledTableCell>
              <StyledTableCell align="right">{transaction.amount}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>)
}
</div>  
  );
}
