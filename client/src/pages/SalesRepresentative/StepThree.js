import React, { useMemo, useRef } from 'react';
import AutoSizer from 'react-virtualized-auto-sizer';

//Material UI Components
import {
    Paper,
    TableHead,
    TableRow,
    TableCell,
    Button,
    TablePagination,
    Grid,
    TextField as MuiTextField,
    Typography,
} from '@material-ui/core';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';

//Material Table
import MaterialTable, { MTableAction, MTableToolbar } from 'material-table';

//Material UI Icons
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import DeleteIcon from '@mui/icons-material/Delete';

//Styling
import style from './StepThree.module.scss';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    tablehead: {
        position: 'sticky',
        top: 0,
        zIndex: 9999
    },
    row1: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "5px 0 2.5px 0"
        },
    },
    row2: {
        "& .MuiTableCell-head": {
            color: "white",
            backgroundColor: "#20369f",
            fontSize: "0.8em",
            border: "none",
            padding: "2.5px 0 5px 0"
        },
    }
});

export default function StepThree(props) {

    const {
        action,
        formStep,
        data,
        setData,
        handleClosePopUp,
        productOptions,
        backFormStep,
        completeFormStep,
        getTotal
    } = props;

    const classes = useStyles();
    const addActionRef = useRef();

    const getProductItemList = useMemo(() => {
        const selectedDescriptions = data.map(x => x.description);
        const productItemList = productOptions.filter(x => selectedDescriptions.indexOf(x.title) === -1);
        return productItemList;

    }, [data, productOptions]);

    return (
        <div className={style.three}>

            <div className={style.header}>

                <div className={style.title}>
                    <div>
                        Add Items to Order
                    </div>
                    <div>
                        <HighlightOffIcon
                            className={style.icon}
                            onClick={handleClosePopUp}
                        />
                    </div>
                </div>

                {
                    action === "Create" && formStep === 2 &&
                    <div className={style.step}>
                        Step 3 of 5
                    </div>
                }

                {
                    action === "Edit" && formStep === 1 &&
                    <div className={style.step}>
                        Step 2 of 4
                    </div>
                }


            </div>

            <div className={style.body}>

                <div className={style.btndiv}>
                    <Button
                        style={{
                            backgroundColor: '#20369f',
                            color: 'white'
                        }}
                        variant="contained"
                        onClick={() => addActionRef.current.click()}
                    >
                        Add new item
                    </Button>
                </div>

                <AutoSizer>
                    {({ height, width }) => {
                        const bodyHeight = height - 160;
                        const pageSize = Math.floor((bodyHeight) / 48);
                        return (
                            <div style={{ height: `${height}px`, width: `${width}px`, overflowY: 'auto' }}>

                                <MaterialTable
                                    components={{
                                        Container: props => <Paper {...props} elevation={1} />,
                                        Action: props => {
                                            if (typeof props.action === typeof Function || props.action.tooltip !== 'Add') {
                                                return <MTableAction {...props} />
                                            } else {
                                                return <div ref={addActionRef} onClick={props.action.onClick} />;
                                            }
                                        },
                                        Toolbar: (props) => (
                                            <div
                                                style={{
                                                    height: "0px",
                                                }}
                                            >
                                                <MTableToolbar {...props} />
                                            </div>
                                        ),
                                        Pagination: props => (
                                            <td style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }} >
                                                <Grid container style={{ background: "#f5f5f5", padding: 15 }}>
                                                    <Grid item align="Left" style={{ margin: "0px 120px 0px auto", width: '100px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> Total (Rs.) </Typography>
                                                    </Grid>
                                                    <Grid item align="Right" style={{ margin: "0px 102.59px  0px 0px", width: '100px' }}>
                                                        <Typography style={{ fontWeight: 600 }}> {getTotal()} </Typography>
                                                    </Grid>
                                                </Grid>
                                                <TablePagination {...props} />
                                            </td>
                                        ),
                                        Header: props => (
                                            <TableHead {...props} className={classes.tablehead}>
                                                <TableRow className={classes.row1}>
                                                    <TableCell width="28%" padding="none" rowSpan={2}>
                                                        <div style={{ padding: '0 10px' }}>
                                                            Description
                                                        </div>
                                                    </TableCell>
                                                    <TableCell width="8%" padding="none" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Selling Price (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Sales Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Free Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" colSpan={2} align="center">
                                                        Return Qty.
                                                    </TableCell>
                                                    <TableCell padding="none" width="14%" rowSpan={2} align="center">
                                                        <div style={{ padding: '0 10px' }}>
                                                            Gross Amount (Rs.)
                                                        </div>
                                                    </TableCell>
                                                    <TableCell padding="none" width="11%" rowSpan={2} align="center">
                                                        Action
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow className={classes.row2}>
                                                    <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Cs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">Pcs</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">D</TableCell>
                                                    <TableCell width="7%" padding="none" align="center">R</TableCell>
                                                </TableRow>
                                            </TableHead>
                                        ),
                                    }}
                                    columns={[
                                        {
                                            field: "description",
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '28%',
                                                textAlign: 'left'
                                            },
                                            editComponent: props => (
                                                <Autocomplete
                                                    options={getProductItemList}
                                                    autoHighlight
                                                    getOptionLabel={(option) => option.title}
                                                    renderOption={(props, option) => (
                                                        <Box
                                                            components="li"
                                                            {...props}
                                                            sx={{ borderBottom: "1px solid #c2c2c2" }}
                                                        >
                                                            <Grid container>
                                                                <Grid item xs={12}>
                                                                    <b>Prod. ID: </b> {option.productid}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <b>Variant ID: </b> {option.variantid}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <b>Name: </b> {option.name}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <b> Type: </b>
                                                                    {option.type}
                                                                </Grid>
                                                                {option.type === "Promotion" ? <Grid item xs={12}>  <b> Offer Caption: </b> {option.offercaption}  </Grid> : ""}
                                                                <Grid item xs={12}>
                                                                    <b>MRP: </b> {option.mrp}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <b> Selling Price: </b> {option.sellingprice}
                                                                </Grid>
                                                                <Grid item xs={12}>
                                                                    <b> Pcs/Cases: </b> {option.piecespercase}
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    )}
                                                    // onChange={e => props.onChange(e.target.innerText)}
                                                    onChange={(e, option) => {
                                                        props.onChange(option.title)
                                                        let data = { ...props.rowData };
                                                        data.description = option.title;
                                                        data.sellingprice = parseInt(option.sellingprice).toFixed(2);
                                                        data.piecespercase = option.piecespercase;
                                                        data.mrp = parseInt(option.mrp).toFixed(2);
                                                        props.onRowDataChange(data);
                                                    }}
                                                    inputValue={props.value}
                                                    renderInput={(params) => (
                                                        <MuiTextField
                                                            {...params}
                                                            helperText={props.helperText}
                                                            error={props.error}
                                                            variant="standard"
                                                        />
                                                    )}
                                                />
                                            ),
                                            validate: (rowData) =>
                                                rowData.description === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.description === ''
                                                        ? { isValid: false, helperText: 'Invalid *' }
                                                        : true

                                        },
                                        {
                                            field: "piecespercase",
                                            hidden: true,
                                        },
                                        {
                                            field: "sellingprice",
                                            editable: 'never',
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '8%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        },
                                        {
                                            field: "mrp",
                                            hidden: true,

                                        },
                                        {
                                            field: "salesqtycases",
                                            type: 'numeric',
                                            cellStyle: {
                                                padding: "10px 5px 10px 7px",
                                                width: '7%',
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.salesqtycases = e.target.value;
                                                        let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                        let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let numberofpieces = (salesqtycases * piecespercase) + +salesqtypieces;
                                                        data.grossamount = (numberofpieces * data.sellingprice).toFixed(2);
                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "salesqtypieces",
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.salesqtypieces = e.target.value;
                                                        let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                        let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let numberofpieces = (salesqtycases * piecespercase) + +salesqtypieces;
                                                        data.grossamount = (numberofpieces * data.sellingprice).toFixed(2);
                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.salesqtypieces === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.salesqtypieces === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.salesqtypieces > 23
                                                            ? { isValid: false, helperText: 'Invalid *' }
                                                            : true

                                        },
                                        {
                                            field: "freeqtycases",
                                            type: 'numeric',
                                            initialEditValue: 0,
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            validate: (rowData) =>
                                                rowData.freeqtycases === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.freeqtycases === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "freeqtypieces",
                                            type: 'numeric',
                                            initialEditValue: 0,
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            validate: (rowData) =>
                                                rowData.freeqtypieces === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.freeqtypieces === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : rowData.freeqtypieces > 23
                                                            ? { isValid: false, helperText: 'Invalid *' }
                                                            : true

                                        },
                                        {
                                            field: "damaged",
                                            type: 'numeric',
                                            initialEditValue: 0,
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.damaged = e.target.value;
                                                        let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                        let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let numberofpieces = (salesqtycases * piecespercase) + +salesqtypieces;
                                                        data.grossamount = (numberofpieces * data.sellingprice).toFixed(2);
                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.damaged === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.damaged === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "returns",
                                            type: 'numeric',
                                            initialEditValue: 0,
                                            cellStyle: {
                                                width: '7%',
                                                padding: "10px 5px 10px 7px",
                                                textAlign: 'right'
                                            },
                                            editComponent: props =>
                                                <MuiTextField
                                                    onChange={e => {
                                                        let data = { ...props.rowData };
                                                        data.returns = e.target.value;
                                                        let salesqtycases = isNaN(data.salesqtycases) ? 0 : data.salesqtycases;
                                                        let salesqtypieces = isNaN(data.salesqtypieces) ? 0 : data.salesqtypieces;
                                                        let piecespercase = isNaN(data.piecespercase) ? 0 : data.piecespercase;
                                                        let numberofpieces = (salesqtycases * piecespercase) + +salesqtypieces;
                                                        data.grossamount = (numberofpieces * data.sellingprice).toFixed(2);
                                                        props.onRowDataChange(data);
                                                    }}
                                                    type="number"
                                                    helperText={props.helperText}
                                                    error={props.error}
                                                    variant="standard"
                                                    value={props.value}
                                                />
                                            ,
                                            validate: (rowData) =>
                                                rowData.returns === undefined
                                                    ? { isValid: false, helperText: 'Required *' }
                                                    : rowData.returns === ''
                                                        ? { isValid: false, helperText: 'Required *' }
                                                        : true

                                        },
                                        {
                                            field: "grossamount",
                                            editable: 'never',
                                            type: 'numeric',
                                            cellStyle: {
                                                width: '14%',
                                                padding: "10px 10px 10px 7px",
                                                textAlign: 'right'
                                            },
                                        }
                                    ]}
                                    data={data}
                                    editable={{
                                        onRowAdd: newData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    setData([newData, ...data]);

                                                    resolve();
                                                }, 1)
                                            }),
                                        onRowUpdate: (newData, oldData) =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataUpdate = [...data];
                                                    const index = oldData.tableData.id;
                                                    dataUpdate[index] = newData;
                                                    setData([...dataUpdate]);

                                                    resolve();
                                                }, 1)
                                            }),
                                        onRowDelete: oldData =>
                                            new Promise((resolve, reject) => {
                                                setTimeout(() => {
                                                    const dataDelete = [...data];
                                                    const index = oldData.tableData.id;
                                                    dataDelete.splice(index, 1);
                                                    setData([...dataDelete]);

                                                    resolve()
                                                }, 1)
                                            }),
                                    }}
                                    icons={{
                                        Delete: () => (
                                            <div>
                                                <DeleteIcon className={style.deleteItemBtn} />
                                            </div>
                                        )
                                    }}
                                    options={{
                                        paging: true,
                                        pageSize: pageSize,
                                        pageSizeOptions: [],
                                        minBodyHeight: bodyHeight,
                                        maxBodyHeight: bodyHeight,
                                        addRowPosition: "first",
                                        toolbar: true,
                                        search: false,
                                        actionsColumnIndex: -1,
                                        headerStyle: {
                                            position: "sticky",
                                            top: "0",
                                            backgroundColor: '#20369f',
                                            color: '#FFF',
                                            fontSize: "0.8em",
                                            padding: "10px 0 10px 10px",
                                        },
                                        rowStyle: rowData => ({
                                            fontSize: "0.8em",
                                            backgroundColor: (rowData.tableData.id % 2 === 1) ? '#ebebeb' : '#ffffff'
                                        })
                                    }}
                                />

                            </div>
                        );
                    }}
                </AutoSizer>

            </div>

            <div className={style.footer}>

                <div className={style.backBtn}>
                    <Button
                        variant="contained"
                        onClick={backFormStep}
                        style={{
                            backgroundColor: '#ACA9BB',
                            color: 'white'
                        }}
                    >
                        Back
                    </Button>
                </div>

                <div className={style.submitBtn}>

                    <Button
                        disabled={data.length === 0}
                        variant="contained"
                        onClick={() => completeFormStep()}
                    >
                        Next
                    </Button>

                </div>

            </div>

        </div>
    )
}
