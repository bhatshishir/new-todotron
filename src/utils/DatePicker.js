import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDatePicker from "@mui/lab/MobileDatePicker";
// import DesktopDatePicker from "@mui/lab/DesktopDatePicker";

const DatePicker = ({ date, setDate, setNewDate, edit }) => {
  
  const handleDateChange = (newVal) => {
    if (edit) {
      setNewDate(newVal);
    } else {
      setDate(newVal);
    }
    // textField: {
    //   border:"1px solid blue"
    // }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
      // className={DatePicker().textField}
        label="Schedule"
        inputFormat="dd/MM/yyyy"
        value={date}
        onChange={(newVal) => handleDateChange(newVal)}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;