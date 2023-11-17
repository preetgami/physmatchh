import React from "react";
import "./Auth.css";
import Input from "../shared/formsElement/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../shared/formsElement/validators";
import { useForm } from "../shared/hooks/form-hook";
import Card from "../shared/UIelemets/Card";
import Button from "../shared/formsElement/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthFunction from "../functions/AuthFunction";

function Auth({ supabase, session }) {
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
  const [islogin, setIslogin] = useState(false);
  const switchModeHandler = () => {
    if (!islogin) {
      setformdata(
        {
          ...formstate.inputs,
          name: undefined,
          image: undefined,
        },
        formstate.inputs.email.isValid && formstate.inputs.password.isValid
      );
    } else {
      setformdata(
        {
          ...formstate.inputs,
          name: {
            value: "",
            isValid: false,
          },
          image: {
            value: null,
            isValid: false,
          },
        },
        false
      );
    }
    setIslogin((prevMode) => !prevMode);
  };
  const navigate = useNavigate();
  const authsubmithandler = async (event) => {
    const authFunction = AuthFunction(supabase);
    event.preventDefault();
    if (formstate.inputs.email.value && formstate.inputs.password.value) {
      const email = formstate.inputs.email.value;
      const password = formstate.inputs.password.value;
      console.log(email, password);

      // sign up user
      if (!islogin) {
        const name = formstate.inputs.name.value;
        const { user, session } = await authFunction.signupUser(
          email,
          password,
          name
        );

        if (user) {
          // sign in user
          const { user, session } = await authFunction.signIn(email, password);
          const doctor_id = user.id;

          // push user to database
          const { data, error } = await supabase
            .from("doctors")
            .insert({ doctor_id: doctor_id });

          navigate("/clients");
        }
      } else {
        // if login page
        // sign in user
        const data = await authFunction.signIn(email, password);
        console.log(data);

        navigate("/clients");
      }
    }
  };

  return (
    <React.Fragment>
      <Card className="authentication">
        <h2>Login Required</h2>
        <hr />
        <form onSubmit={authsubmithandler}>
          {!islogin && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Your Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter a name."
              onInput={inputHandler}
            />
          )}

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
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password, at least 6 characters."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formstate.isValid}>
            {islogin ? "LOGIN" : "SIGNUP"}
          </Button>
        </form>
        <Button inverse onClick={switchModeHandler}>
          SWITCH TO {islogin ? "SIGNUP" : "LOGIN"}
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Auth;
