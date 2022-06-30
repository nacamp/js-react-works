import React, { FC, useState, useRef, useEffect } from 'react';
import NumberFormat, { NumberFormatProps, NumberFormatValues } from 'react-number-format';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
/*
https://mui.com/material-ui/api/text-field/
https://mui.com/material-ui/api/input/
inputProps
https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

todo
https://stackoverflow.com/questions/60080038/send-props-to-number-format-material-ui-textfield
https://codesandbox.io/s/react-hook-form-v6-controller-qsd8r
*/

// https://stackoverflow.com/questions/60080038/send-props-to-number-format-material-ui-textfield
interface ICustomNumberFormat extends NumberFormatProps {
    textField?: TextFieldProps
}
function CustomNumberFormat(props: ICustomNumberFormat) {
    const [state, setState] = useState(10000);
    return (
        <NumberFormat
            {...props}
            // value={2456981}
            className="foo"
            displayType={'text'}
            thousandSeparator={true}
            prefix={'$'}
            onValueChange={(values) => {
                const { formattedValue, value } = values;
                console.log(`formattedValue : ${formattedValue}, value:${value}`);
                // formattedValue = $2,223
                // value ie, 2223
                // this.setState({ profit: formattedValue });
            }}
            renderText={(value: string) => <TextField label={props.textField?.label} value={state} variant="outlined" />}
        />

    );
}

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
    return (
        <>
            <div>react-number-format</div>
            <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} />
            <NumberFormat
                value={2456981}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value: string) => <div >{value}</div>}
            />
            <NumberFormat
                // value={state}
                thousandSeparator={true}
                prefix={'$'}
                onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    console.log(`formattedValue : ${formattedValue}, value:${value}`);
                    // formattedValue = $2,223
                    // value ie, 2223
                    // this.setState({ profit: formattedValue });
                }}
            />
            <NumberFormat
                // value={state}
                thousandSeparator={true}
                prefix={'$'}
                customInput={TextField}
                onValueChange={(values) => {
                    const { formattedValue, value } = values;
                    console.log(`formattedValue : ${formattedValue}, value:${value}`);
                    // formattedValue = $2,223
                    // value ie, 2223
                    // this.setState({ profit: formattedValue });
                }}
            />
            <CustomNumberFormat value='10000' textField={{ label: "test" }} />
            <NumberFormat
                value={2456981}
                className="foo"
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
                renderText={(value: string) => <TextField label={msg} variant="outlined" />}
            />

            <FormControl focused className="col " variant="outlined"  color='error'>
                <InputLabel className="mText">your label</InputLabel>
                <NumberFormat customInput={TextField} 
                    variant="outlined"
                    thousandSeparator={true} 
                    // onChange={handleChange}
                    autoComplete="off"/>
            </FormControl>

        </>


    );

}