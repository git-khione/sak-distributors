import React from 'react';

//MUI Components
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';

//MUI Icons
import VisibilityIcon from '@mui/icons-material/Visibility';

//SCSS style
import style from './CustomerOrders.module.scss';

//Axios
import axios from 'axios';

export default function CustomerOrders(props) {

    const handleClick = (orderno) => {

        axios
            .get(`http://localhost:8080/orders/${orderno}`, {
                headers: {
                    'authorization': JSON.parse(sessionStorage.getItem("Auth")).accessToken
                }
            })
            .then(res => {
                localStorage.setItem(orderno, JSON.stringify(res.data.order));
                window.open(`http://localhost:3000/store-keeper/view-order-details/${orderno}`, "_blank");
            })
            .catch(err => {
                console.log(err);
            })

    }

    return (
        <div className={style.container}>

            <div className={style.head}>
                Processing Invoices
            </div>

            <div className={style.body}>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} >
                        <TableHead sx={{ fontWeight: 900 }}>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 700 }}>Order Number</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Route</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                                <TableCell sx={{ fontWeight: 700 }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.customerOrders.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{row.orderno} </TableCell>
                                    <TableCell>{row.route}</TableCell>
                                    <TableCell sx={{ color: "#2196F3", fontWeight: 700 }}>{row.status}</TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <VisibilityIcon
                                                className={style.icon}
                                                onClick={() => handleClick(row.orderno)}
                                            />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    )
}
