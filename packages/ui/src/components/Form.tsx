import { Box, TextField } from '@mui/material'
import { CButton } from "../components/Button"
import React, { useState } from 'react'
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import convertToInputDateTime from '../../utils/convertToInputDateTime';

import "react-datepicker/dist/react-datepicker.css";


interface IData {
    description?: string;
    url?: string;
    cnpj?: string;
    storeOpensAt?: string;
    storeClosedAt?: string;
    serialKey?: string;
    id?: string;
}

interface IFormProps {
    children: React.ReactNode;
    data: IData;
    onSave: (data: any) => void;
    loading: boolean;
    onEdit: (data: any) => void;
}

export function Form({ children, data, onSave, loading, onEdit }: IFormProps) {
  const [kioskData, setRegister] = useState({...data});
  
  const [valueOpen, setValueOpen] = React.useState<any>(convertToInputDateTime(data?.storeOpensAt || ''));
  const [valueClose, setValueClose] = React.useState<any>(convertToInputDateTime(data?.storeClosedAt || ''));

  const onChange = (e: any, prop?: string) => {
    let _kioskData:IData = {...kioskData};
    console.log('onChange', e?.['$d']);

    if(e?.['$d'] && prop){
        //@ts-ignore
        _kioskData[prop] = new Date(e?.['$d']+'').toISOString();
    }else{   
        //@ts-ignore
        _kioskData[prop ?? e?.target?.name] = e?.target?.value;
    }
    setRegister({ ..._kioskData });
  };

  console.log("loading", loading);
  
  return (
    <Box>
        <div className='flex justify-center text-3xl mt-10'>{data?.id ? "Edit Kiosk" : "New Kiosk"}</div>
        <div className='flex justify-center'>
            <div className='w-3/5 mt-12'>
            {loading ?  
                <div className='flex justify-center items-center pb-14 h-40'>
                    <CircularProgress color="inherit"/>
                </div> :
                <>
                    <div className='w-11/12 m-auto'>
                        <TextField title='Description' style={{ width: "100%" }} placeholder='Description' value={kioskData.description} onChange={onChange} name='description' autoFocus/>
                    </div>
                    <div className='w-11/12 m-auto mt-8'>
                        <TextField title='Serial Key' style={{ width: "100%" }} placeholder='SerialKey' value={kioskData.serialKey} onChange={onChange} name='serialKey'/>
                    </div>
                    <div className='flex justify-between m-auto w-11/12 pt-7'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <div>
                                    <TimePicker
                                        ampm={false}
                                        label="Open Time"
                                        maxTime={dayjs(valueClose)}
                                        value={dayjs(valueOpen)}
                                        onChange={(e: any) => {
                                            onChange(e, "storeOpensAt");
                                            setValueOpen(e)
                                        }}
                                    />
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['TimePicker']}>
                                <div>
                                    <TimePicker
                                        label="Close Time"
                                        ampm={false}
                                        minTime={dayjs(valueOpen)}
                                        value={dayjs(valueClose)}
                                        onChange={(e: any) => {
                                            onChange(e, "storeClosedAt");
                                            setValueClose(e)
                                        }}
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center'
                                        }}
                                        />
                                </div>
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div className='w-full flex justify-end mt-14  pb-10'>
                        <CButton onClick={() => {
                            let _data = {
                                ...kioskData,
                                storeOpensAt: convertToInputDateTime(kioskData?.storeOpensAt || "", true),
                                storeClosedAt: convertToInputDateTime(kioskData?.storeClosedAt || "", true)
                            }
                            if(kioskData.id){
                                onEdit(_data)
                            }else{
                                onSave(_data)
                            }
                        }} style={{width: '30%', marginRight: "4%"}}>{"Salvar"}</CButton>
                    </div>
                </>}
            </div>
        </div>
        
    </Box>
  )
}