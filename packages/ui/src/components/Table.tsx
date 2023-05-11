import { TableContainer, TableHead, TableRow, TableBody, Paper, TableCell, Table, Box } from '@mui/material';
import Create from "@mui/icons-material/Create"
import Delete from "@mui/icons-material/Delete"
import React, { useState } from 'react';
import { IInitialStateKiosk } from '../../../../apps/admin/src/feature/Kiosk/KioskSlice';
import getHoursMinutesFromISODate from '../../utils/getHoursMinutesFromISODate';
import Modal from './Modal';
import { CButton } from './Button';
import CircularProgress from '@mui/material/CircularProgress';

interface IKiosk {
    description: string;
    id: string;
}

interface ICTableProps {
    children?: React.ReactNode; 
    kioskState: IInitialStateKiosk; 
    navigate: any; 
    onDelete: (data: IKiosk | undefined) => void;
    onEdit: (data: IKiosk | undefined) => void;
    loading: boolean;
}

export function CTable({ children, kioskState, navigate, onDelete, loading, onEdit }: ICTableProps) {
    const [modalDelete, showModalDelete] = useState(false);
    const [selectedToDelete, setSelectedToDelete] = useState<IKiosk | undefined>(undefined);

    const columns = [
        "Description", 
        "Status", 
        "Open Time", 
        "Close Time", 
        "Actions"
    ];

    return (
        <div className='w-screen flex justify-center items-center'>
            {modalDelete ? 
                <Modal onClose={() => {
                    showModalDelete(false);
                    setSelectedToDelete(undefined);
                    }} type='delete' title="Delete" aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description" open={modalDelete}>
                    <div className='p-10 text-3xl'>
                        <p>{`Are you sure you want to delete ${selectedToDelete?.description}?`}</p>
                        <div className='w-full flex justify-between mt-24'>
                            <CButton style={{ backgroundColor: "#ccc"}} onClick={() => {
                                showModalDelete(false);
                                setSelectedToDelete(undefined);
                            }}>Cancel</CButton>
                            <CButton style={{ backgroundColor: "#F34646" }} onClick={() => {
                                onDelete && onDelete(selectedToDelete);
                                showModalDelete(false);
                            }}>Delete</CButton>
                        </div>
                    </div>
                </Modal> 
                : undefined
            }

            {loading ? 
                <div className='flex justify-center'>
                    <CircularProgress color="inherit" />
                </div> : 
                <div style={{ height: "80vh"}} className='w-full flex justify-center'>
                    <TableContainer style={{ width: '70%'}}  component={Paper}>
                        <Table aria-label="custom pagination table" sx={{ minWidth: 650, backgroundColor: '#FFFFFF' }}>
                            <TableHead>
                                <TableRow>
                                    {columns?.map((columnH) => {
                                        return(<TableCell style={{color: '#000000', fontSize: '1.2em', fontWeight: 'bold', padding: 30, borderBottom: '1px solid #E4E4E4'}}>{columnH}</TableCell>)
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {kioskState.kioskList?.map((kiosk: any) => (
                                <TableRow style={{ opacity: kiosk.isKioskClosed ? 0.3 : 1, transition: "opacity 2s" }} key={kiosk.serialKey}>
                                    <TableCell onClick={() => {
                                        // dispatch(selectCompany(campany));
                                        // navigate('/location')
                                    }} style={{ color: '#000000', fontSize: '1.1em', padding: 30, borderBottom: '1px solid #E4E4E4'}} component="th" scope="kiosk">
                                        {kiosk.description}
                                    </TableCell>
                                    <TableCell>
                                        {!kiosk.isKioskClosed ? 
                                            <div className='bg-green-600 rounded text-center text-rose-50 w-3/5 text-lg'>Open</div> : 
                                            <div className='bg-gray-700 rounded text-center text-rose-50 w-3/5 text-lg'>Closed</div>}
                                    </TableCell>
                                    <TableCell>
                                        <div className='rounded font-medium ml-10 text-black w-3/5 text-xl'>
                                            {getHoursMinutesFromISODate(kiosk.storeOpensAt)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className='rounded font-medium ml-10 text-black w-3/5 text-xl'>
                                            {getHoursMinutesFromISODate(kiosk.storeClosedAt)}
                                        </div>
                                    </TableCell>
                                    <TableCell style={{ color: '#000000', fontSize: '1.1em', padding: 30, borderBottom: '1px solid #E4E4E4' }}>
                                        <Create onClick={() => {
                                            onEdit(kiosk)
                                        }} sx={{ cursor: 'pointer' }} fontSize='medium'/>
                                        <Delete onClick={() => {
                                            showModalDelete(true);
                                            setSelectedToDelete(kiosk);
                                        }} fontSize='medium' sx={{ color: '#F34646', marginLeft: 2, cursor: 'pointer' }}/>
                                    </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            }
        </div>
    )
}