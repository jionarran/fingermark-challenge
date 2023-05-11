import Modal from '@mui/material/Modal';
import { Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

export default ({ onClose, open, title, type, children,  }: any) => {
    const style = {
        position: 'absolute' as 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '30vw',
        height: '25vh',
        bgcolor: '#ffffff',
        boxShadow: 24,
        borderRadius: 3,
      };

      const ContentHeaderStyle = {
        width: '100%',
        height: '5vh',
        backgroundColor: '#0385fd',
        alignItems: "center",
        display: "flex",
        alignContent: "center",
        justifyContent: "space-between"
        }

        const label = {
            marginLeft: "5%",
            color: "#ffffff",
            fontSize: "1.8em",
            fontWeight: "bold",
        }
    return(
        <Modal onBackdropClick={() => {}} open={open} onClose={(event, reason) => { 
            if(reason === 'backdropClick') return;
            onClose();
        }} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
                <div style={{ ...ContentHeaderStyle, backgroundColor: type === 'delete' ? '#F34646' : '#0385fd'}}>
                    <div style={label}>{title ?? ''}</div>
                    <CloseIcon onClick={() => onClose()} sx={{ marginRight: '3%', color: '#FFFFFF', cursor:"pointer" }}/>
                </div>
                {children}
            </Box>
        </Modal>
    )
}