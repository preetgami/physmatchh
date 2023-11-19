import React from 'react'
import Button from '../shared/formsElement/Button';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE,
} from "../shared/formsElement/validators";
import Input from '../shared/formsElement/Input';
import { useForm } from '../shared/hooks/form-hook';
function MainForm(props) {
    const [formstate, inputHandler, setformdata] = useForm({
        email: {
            value: "",
            isValid: false,
        },
        password: {
            value: "",
            isValid: false,
        },
    });
    const switchModeHandler = () => {
            setformdata(
                {
                    ...formstate.inputs,
                    name: undefined,
                    image: undefined,
                },
                formstate.inputs.email.isValid && formstate.inputs.password.isValid
            );
        
    };
    return(<React.Fragment>

    
    <div>
          <form>

              <Input
                element="input"
                id="name"
                type="text"
                label="Your Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a name."
                onInput={inputHandler}
              />

            <Input
              element="input"
              id="email"
              type="email"
              label="E-Mail"
              validators={[VALIDATOR_EMAIL()]}
              errorText="Please enter a valid email address."
              onInput={inputHandler}
            />
            <Input
              element="input"
            id="Phone Number"
              type="Phone Number"
                    label="Phone Number"
                    validators={[VALIDATOR_REQUIRE()]}
                    errorText="Please enter a phone  number."

              onInput={inputHandler}
            />
            
          </form>
          
    </div>
    </React.Fragment >
    )
}
export default MainForm;