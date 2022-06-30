import React, { FC, useState, useRef, useEffect } from 'react';
import {
    Box, Button, Checkbox, Collapse, DialogActions, IconButton, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
/*
https://stackoverflow.com/questions/69870930/inputprops-vs-inputprops-in-mui-textfield
https://www.daleseo.com/material-ui-text-fields/
https://mui.com/material-ui/api/input-base/
export interface InputProps extends StandardProps<InputBaseProps>
*/

export default function MuiTextField() {
    const [phoneValue, setPhoneValue] = useState('');
    return (
        <>
            <div> &nbsp;</div>
            <div> mui textfield</div>
            <TextField fullWidth placeholder={`휴대폰 번호`} value={phoneValue || ''}
                onChange={(e: any) => { 
                    setPhoneValue(e.target.value); 
                    console.log(phoneValue);
                }}
                error={!+phoneValue}
                helperText={ !+phoneValue && '올바른 휴대폰 번호를 입력해주세요.'}
                inputProps={{ type: 'tel', maxLength: 11 }}
                InputProps={{
                    endAdornment: (<>
                        {phoneValue !== '' &&
                            <IconButton size='small' onClick={() => setPhoneValue('')}>
                                <AddIcon />
                            </IconButton>
                        }
                    </>)
                }}
            />

        </>


    );

}