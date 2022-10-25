import { useEffect, useState } from "react";
import service from '../Core/Service.js';
import { DataGrid, GridLinkOperator, GridToolbarQuickFilter } from '@mui/x-data-grid';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material"
import '../Styles/Data.css'
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import IosShareIcon from '@mui/icons-material/IosShare';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function DataGridData() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);

    const openModalDialog = () => {
        setOpen(true);
    };

    const closeModalDialog = () => {
        setOpen(false);
    };

    const getData = async () => {
        let params = {};
        await service.answer(params).then((response) => {
            setData(response.data.result);
        });
    };

    useEffect(() => {
        getData();
    }, []);

    const columns = [
        { field: 'categ_nombre', headerName: 'Nombre Categoria', width: 150 },
        { field: 'cur_fh_reg', headerName: 'Fecha Registro', width: 150 },
        { field: 'cur_id', headerName: 'ID', width: 50 },
        { field: 'cur_nombre', headerName: 'Nombre del Curso', width: 500 },
        { field: 'cur_precio', headerName: 'Precio', width: 75 },
        { field: 'cur_url_imagen', headerName: 'Imagen', width: 150, renderCell: (params) => (params.row.cur_url_imagen !== null) ? <img alt={""} height={60} width={60} src={params.row.cur_url_imagen} /> : <em>null</em> },
        { field: 'estatus_id', headerName: 'ID Estatus', width: 100 },
        { field: 'estatus_nombre', headerName: 'Nombre Estatus', width: 150 },
        {
            field: 'Acciones', width: 150, renderCell: (cellValues) => {
                return (
                    <Stack direction="row" spacing={0.01}>
                        <IconButton onClick={() => {
                            openModalDialog();
                        }}>
                            <EditIcon></EditIcon>
                        </IconButton>
                        <IconButton onClick={() => {
                            imprimirDetalle(cellValues);
                        }}>
                            <IosShareIcon></IosShareIcon>
                        </IconButton>
                        <IconButton onClick={() => {
                            alertarDetalle(cellValues);
                        }}>
                            <DeleteIcon></DeleteIcon>
                        </IconButton>
                    </Stack>
                )
            }
        }
    ];

    function imprimirDetalle(variable) {
        console.log(variable.row);
    }

    function alertarDetalle(variable) {
        alert(variable.row);
    }

    const rows = data.map((row) => ({
        id: row.cur_id,
        categ_nombre: row.categ_nombre,
        cur_fh_reg: row.cur_fh_reg,
        cur_id: row.cur_id,
        cur_nombre: row.cur_nombre,
        cur_precio: row.cur_precio,
        cur_url_imagen: row.cur_url_imagen,
        estatus_id: row.estatus_id,
        estatus_nombre: row.estatus_nombre
    }));

    function QuickSearchToolbar() {
        return (
            <Box
                sx={{
                    p: 0.5,
                    pb: 0,
                }}
            >
                <GridToolbarQuickFilter
                    quickFilterParser={(searchInput) =>
                        searchInput
                            .split(',')
                            .map((value) => value.trim())
                            .filter((value) => value !== '')
                    }
                />
            </Box>
        );
    }

    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ flexGrow: 1 }}>
                <Button onClick={() => {
                    openModalDialog();
                }}>
                    Hola
                </Button>
                <Box sx={{ height: 673, width: 1 }}>
                    <DataGrid
                        sx={{
                            boxShadow: 2,
                            border: 2,
                            borderColor: 'primary.main',
                            '& .MuiDataGrid-cell:hover': {
                                color: 'primary.main',
                            },
                            '& .MuiDataGrid-row.Mui-odd': {
                                color: 'primary.main',
                            }
                        }}
                        title={"Listado de cursos"}
                        rows={rows}
                        columns={columns}
                        initialState={{
                            filter: {
                                filterModel: {
                                    items: [],
                                    quickFilterLogicOperator: GridLinkOperator.Or
                                },
                            },
                        }}
                        components={{ Toolbar: QuickSearchToolbar }}
                        pageSize={100}
                    />
                </Box>
            </div>
            <div>
                <Dialog open={open} onClose={closeModalDialog}>
                    <DialogTitle>
                        Hola
                    </DialogTitle>
                    <DialogContent>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                            <Grid item xs={12}>
                                <TextField autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Nombre"
                                    fullWidth
                                    variant="standard">
                                </TextField>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeModalDialog}>
                            Cerrar
                        </Button>
                        <Button onClick={closeModalDialog}>
                            Guardar
                        </Button>
                    </DialogActions>

                </Dialog>
            </div>
        </div>
    )
}

export default DataGridData;