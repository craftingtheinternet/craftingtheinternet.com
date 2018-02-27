import {
  FormikActions,
  FormikComputedProps,
  FormikHandlers,
  FormikState,
  withFormik
} from "formik";
import * as React from "react";
import * as yup from "yup";

import Input from "components/Input";

import * as styles from "./styles.styl";

interface Props {
  isClient: boolean;
  mobile: boolean;
}

interface Fields {
  name: string;
  email: string;
  message: string;
}

const FORM_ACTION = `https://formspree.io/${process.env.CRAFTING_FORMSPREE_ID}`;

const FORM_METHOD = "POST";

const component: React.SFC<
  Props &
    FormikActions<{}> &
    FormikComputedProps<{}> &
    FormikState<Fields> &
    FormikHandlers
> = ({
  errors,
  isClient,
  handleBlur,
  handleChange,
  handleSubmit,
  mobile,
  touched,
  values
}) => (
  <form
    action={isClient ? undefined : FORM_ACTION}
    className={[styles.form, mobile ? styles.mobile : ""].join(" ")}
    onSubmit={isClient ? handleSubmit : undefined}
    method={isClient ? undefined : FORM_METHOD}
    noValidate={isClient ? true : undefined}
  >
    <div className={styles.personalFields}>
      <div className={styles.personalField}>
        <Input
          error={errors.name}
          label="Your name"
          name="name"
          onBlur={handleBlur}
          onChange={handleChange}
          type="text"
          value={values.name}
        />
      </div>
      <div className={styles.personalField}>
        <Input
          error={errors.email}
          label="Your email address"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          type="email"
          value={values.email}
        />
      </div>
    </div>
    <input type="text" name="_gotcha" style={{ display: "none" }} />
    <Input
      error={errors.message}
      label="And your message"
      name="message"
      onBlur={handleBlur}
      onChange={handleChange}
      size={7}
      type="textarea"
      value={values.message}
    />
    <div className={styles.submitContainer}>
      <div className={styles.submitButton}>
        <input className={styles.submit} type="submit" value="Send" />
      </div>
    </div>
  </form>
);

component.displayName = "ContactForm";
component.defaultProps = {
  isClient: typeof window !== "undefined",
  mobile: true
};

export { component };

const Form: React.ComponentType<any> = withFormik({
  handleSubmit: (values, { props, setSubmitting, setErrors }) =>
    fetch(FORM_ACTION, {
      body: JSON.stringify(values),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      method: FORM_METHOD
    })
      .then(response => {
        // tslint:disable-next-line no-console
        console.log(response);
      })
      .catch(response => {
        // tslint:disable-next-line no-console
        console.log(response);
      }),
  mapPropsToValues: props => ({ name: "", email: "", message: "" }),
  validateOnBlur: false,
  validateOnChange: false,
  validationSchema: yup.object().shape({
    email: yup
      .string()
      .email("Please enter a valid email address")
      .required("Please enter your email address"),
    message: yup.string().required("Please enter your message"),
    name: yup.string().required("Please enter your name")
  })
})(component);

export default Form;
