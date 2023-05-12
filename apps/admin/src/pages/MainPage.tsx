import { useEffect } from "react";
import { CTable, CButton } from "ui/src/index";
import { deleteKiosk, getKiosks } from "../feature/Kiosk/KioskSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IInitialStateKiosk } from "../feature/Kiosk/KioskSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

interface IPropMainPage {
    kiosk?: any;
    getKiosks?: any;
    navigate?: any;
}

interface IKiosk {
    description: string;
    id: string;
}

export const MainPage = (props: IPropMainPage) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    
    const kioskState = useAppSelector((state) => (state.kiosks as IInitialStateKiosk));
    const loading = useAppSelector((state) => ((state.kiosks as IInitialStateKiosk).loading));

    const kioskList = kioskState?.kioskList;

    useEffect(() => {
        dispatch(getKiosks())
    }, []);

    const onDeleteSuccess  = () => {
        dispatch(getKiosks());
        toast.success("Deleted successfully")
    };

    const onDelete = (data: IKiosk | undefined): void => {
        if(data?.id) {
            dispatch(deleteKiosk({...data, onSuccess: onDeleteSuccess}));
        };
    };

    const onEdit = (data: IKiosk | undefined): void => {
        if(data?.id) {
            navigate("/create", {state: {id: data?.id}});
        };
    };

    return (
        <div>
            <ToastContainer/>
            {kioskList?.length === 0 && !loading ? 
                <div className="text-center mt-44">
                    <h1 className='text-6xl'>No kiosk has been added!</h1>
                    <CButton onClick={() => {
                        navigate("/create")
                    }} style={{ width: '8vw', marginTop: "2vh", fontSize:"1.2em"}}>Add new</CButton>
                </div>
            : 
            <> 
                {!loading ? 
                    <div className="mr-96 mt-24 float-right mb-5">
                        <CButton size='large' onClick={() => navigate("/create")}>Add</CButton>
                    </div> 
                : undefined}
                <CTable loading={loading} onEdit={onEdit} navigate={navigate} onDelete={onDelete} kioskState={kioskState}/>
            </>}
        </div>
    );
}