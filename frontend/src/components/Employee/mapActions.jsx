import { useState } from 'react';
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LocationOn from '@mui/icons-material/LocationOn';
const MapLocation = ({ id,latitiude,longitude, editRoute }) => {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    const pushPin = {
        center: {
          latitude: 27.987850,
          longitude: 86.925026,
        },
        options: {
          title: "Mt. Everest",
        },
      }
      
      const pushPins = [pushPin];
    return (
        <>
            <div className="flex justify-between items-center gap-3">
                {editRoute !== "review" && (
                    <Link to={`/employee/${editRoute}/${id}`} className="text-blue-600 hover:bg-blue-200 p-1 rounded-full bg-blue-100">
                        <EditIcon />
                    </Link>
                )}
                <button onClick={() => setOpen(true)} className="text-blue-600 hover:bg-white-200 p-1 rounded-full bg-white-100">
                    <LocationOn />
                </button>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogContent>
                    
                {latitiude} ,{longitude}
                </DialogContent>
                <DialogActions>
                    {/* <button onClick={handleClose} className="py-2 px-6 rounded shadow bg-gray-400 hover:bg-gray-500 text-white">Cancel</button> */}
                    {/* <button onClick={() => deleteHandler(id)} className="py-2 px-6 ml-4 rounded bg-red-600 hover:bg-red-700 text-white shadow">Delete</button> */}
                </DialogActions>
            </Dialog>
        </>
    );
};

export default MapLocation;
