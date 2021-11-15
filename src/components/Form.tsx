import React, { useState, useEffect } from "react";

const Form: React.FC = (): JSX.Element => {
  const [isEmailValidated, setIsEmailValidated] = useState<boolean>(false);
  const [emailValue, setEmailValue] = useState<string>("");

  const [isPasswordValidated, setIsPasswordValidated] =
    useState<boolean>(false);
  const [passwordValue, setPasswordValue] = useState<string>("");

  const [isButtonDisable, setIsButtonDisabled] = useState<boolean>(true);

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const [data, setData] = useState<{ title?: string; body?: string }>({});

  const handlChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
  };

  const handleValidateEmail = (): void => {
    // /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(emailValue)
    emailValue.includes("@")
      ? setIsEmailValidated(true)
      : setIsEmailValidated(false);
  };

  const handlChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
  };

  const handleValidatePassword = (): void => {
    passwordValue.length > 5
      ? setIsPasswordValidated(true)
      : setIsPasswordValidated(false);
  };

  const handleChangeButtonAvailability = (): void => {
    isEmailValidated && isPasswordValidated
      ? setIsButtonDisabled(false)
      : setIsButtonDisabled(true);
  };

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>): void => {
    e.preventDefault();

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: emailValue,
        body: passwordValue,
        userId: 1,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => setData(json))
      .then(() => setIsSubmitted(true))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleValidateEmail();
  }, [emailValue]);

  useEffect(() => {
    handleValidatePassword();
  }, [passwordValue]);

  useEffect(() => {
    handleChangeButtonAvailability();
  }, [isEmailValidated, isPasswordValidated]);

  useEffect(() => {
    console.log(data);
  }, [data]);
  return (
    <div className="registerForm__wrapper">
      <h1>Register</h1>
      {isSubmitted && (
        <p className="registerForm__feedback registerForm__feedback-success">
          registered successfully!!
        </p>
      )}
      <div>
        {data.body && data.title && (
          <div style={{ backgroundColor: "whitesmoke" }}>
            <p>title: {data.title}</p> <p>body: {data.body}</p>
          </div>
        )}
      </div>
      <form
        className="registerForm"
        data-testid="registerForm"
        onSubmit={handleSubmit}
      >
        <div className="registerForm-control">
          <label className="registerForm-label" htmlFor="name">
            Name
            <input
              className="registerForm-input"
              id="name"
              placeholder="Name"
            />
          </label>
        </div>
        <div className="registerForm-control">
          {!isEmailValidated && emailValue && (
            <p className="registerForm__alert">email must have character, @</p>
          )}
          <label className="registerForm-label" htmlFor="email">
            Email
            <input
              className="registerForm-input"
              id="email"
              placeholder="Email"
              onChange={handlChangeEmailValue}
            />
          </label>
        </div>
        <div className="registerForm-control">
          {!isPasswordValidated && passwordValue && (
            <p className="registerForm__alert">
              password must be longer than 6 characters
            </p>
          )}
          <label className="registerForm-label" htmlFor="password">
            Password
            <input
              type="password"
              className="registerForm-input"
              id="password"
              placeholder="Password"
              onChange={handlChangePasswordValue}
            />
          </label>
        </div>
        <button
          type="submit"
          className={`registerForm__button ${
            isButtonDisable ? "registerForm__button-disabled" : ""
          }`}
          disabled={isButtonDisable}
        >
          Submit
        </button>
      </form>
    </div>
  );
};
export default Form;
