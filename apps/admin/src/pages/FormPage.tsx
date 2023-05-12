import { Page, Form, HiArrowNarrowLeft } from "ui/src/index";
import { useNavigate, useLocation } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { createKiosk, editKiosk, getKiosks, setLoading } from "../feature/Kiosk/KioskSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

interface IPropMainPage {
    kiosk?: any;
    getKiosks?: any;
    navigate?: any;
}

export const FormPage = (props: IPropMainPage) => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useAppDispatch();
    const kiosk = useSelector((state: any) => state?.kiosks);
    const dataEdit = kiosk?.kioskList.find((item: any) => item?.id === state?.id);

    const onSuccess = () => {
        dispatch(getKiosks())
        toast.success("Created Successfully");
        console.log("Successfully created");
        navigate("/");
    };

    const onError = (err: any) => {
        console.log(err);
        toast.error(err.message);
    };

    const checkValidations = (data: any) => {

        console.log('checkValidations data', data);

        if(!data.description || !isNaN(data.storeOpensAt) || !isNaN(data.storeClosedAt) || !data.serialKey){
            toast.error("It is necessary to complete all the information");
            return;
        }

        
        if(new Date(data.storeOpensAt).getTime() == new Date(data.storeClosedAt).getTime()){
            toast.error("Time fields must be different");
            return;
        }
        
        let startDate = new Date(data.storeOpensAt).getTime();
        let closeDate = new Date(data.storeClosedAt).getTime();

        if(startDate > closeDate) {
            toast.error("The opening time must be earlier than the closing time");
            return;
        }

        dispatch(setLoading(true))
        dispatch(createKiosk({...data, onSuccess, onError }))
    };

    const onSuccessEdit = () => {
        dispatch(getKiosks())
        navigate("/");
        toast.success("Edited Successfully")
    };

    return (
        <Page>
            <div className="w-full flex justify-center mt-32">
                <div onClick={() => navigate("/")} className="flex w-3/6 ml-12 items-center cursor-pointer">    
                    <HiArrowNarrowLeft/>
                    <span className="ml-2 text-lg">Back to List</span>
                </div>
            </div>
            <div className="w-full flex justify-center mt-6">
                <div className="w-3/6 rounded bg-white">
                    <Form onEdit={(data) => {
                        dispatch(setLoading(true))
                        dispatch(editKiosk({...data, onSuccess: onSuccessEdit }))
                    }} loading={kiosk.loadingCreate} onSave={(data) => {
                        checkValidations(data);
                    }} data={dataEdit}>
                    </Form>
                </div>
            </div>
        </Page>
    );
}