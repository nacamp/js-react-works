import React, { FC, useState, useRef, useEffect } from 'react';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

/*
https://mui.com/material-ui/api/text-field/
https://mui.com/material-ui/api/input/
inputProps
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

todo
https://stackoverflow.com/questions/60080038/send-props-to-number-format-material-ui-textfield
https://codesandbox.io/s/react-hook-form-v6-controller-qsd8r
*/

// https://stackoverflow.com/questions/68571001/using-react-number-format-cannot-type-more-than-one-symbol-at-once
// https://codesandbox.io/s/little-cherry-ubcjv?file=/src/App.js:703-1057
const NumberFormatCustom = (props: any) => {
    const { inputRef, onChange, ...other } = props;
    return (
        <NumberFormat
            {...other}
            getInputRef={inputRef}
            onValueChange={(values) => {
                onChange({
                    target: {
                        name: props.name,
                        value: values.value,
                    },
                });
            }}
            thousandSeparator
            isNumericString
            prefix="$"
        />
    );
};
/*
            <div className="App">
                <TextField
                    label="Min Assets"
                    value={minAssets}
                    onChange={(e:any) => setMinAssets(e.target.value)}
                    name="minAssets"
                    variant="outlined"
                    id="Minimum-Income-filter"
                    InputProps={{
                        inputComponent: NumberFormatCustom,
                    }}
                />
            </div>
*/

export default function ReactNumberFormat() {
    const [minAssets, setMinAssets] = useState();
    const [state, setState] = useState(10000);
    const msg: string = 'hi';
    const handleChange = (event: any) => {
        console.log(event.target.value);
    };
    return (
        <>
            <Typography variant="h5" >
                react-number-format
            </Typography>
            <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            <NumberFormat
                value={2456981}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value: string) => <div >{value}</div>}
            />
            <Box sx={{ mt: 2 }} >
                <NumberFormat
                    // value={state}
                    thousandSeparator={true}
                    prefix={'$'}
                    onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        console.log(`formattedValue : ${formattedValue}, value:${value}`);
                    }}
                />
            </Box>
            <Box sx={{ mt: 2 }} >
                <NumberFormat
                    value={2456981}
                    className="foo"
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                    renderText={(value: string) => <TextField label={msg} variant="outlined" />}
                />
            </Box>
            <FormControl sx={{ mt: 2 }} size='small' focused className="col " variant="outlined" color='error'>
                <InputLabel className="mText">FormControl, TextField</InputLabel>
                <NumberFormat customInput={TextField}
                    value={state}
                    thousandSeparator={true}
                    onChange={handleChange}
                    autoComplete="off" />
            </FormControl>
            <FormControl sx={{ mt: 2 }} size='small' focused className="col " variant="outlined" color='error'>
                <InputLabel className="mText">FormControl, Input</InputLabel>
                <NumberFormat customInput={Input}
                    // variant="outlined"
                    value={state}
                    thousandSeparator={true}
                    onChange={handleChange}
                    autoComplete="off" />
            </FormControl>
        </>
    );

}