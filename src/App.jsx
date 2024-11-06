import { Formik, Form, Field, ErrorMessage } from "formik";
import { useId } from "react";
import * as Yup from "yup";
function App() {
  const FeedbackSchema = Yup.object().shape({
    username: Yup.string()
      .min(2, "Too short")
      .max(50, "Too long")
      .required("Required"),
    email: Yup.string().min(2).max(20).required("Required"),
    message: Yup.string()
      .min(3, "Too short")
      .max(256, "Too long")
      .required("Required"),
    country: Yup.string()
      .oneOf(["Ukraine", "Spain", "Portugal"])
      .required("Required"),
  });

  const initialValues = {
    username: "",
    email: "",
    message: "",
    country: "ukraine",
  };

  const FeedbackForm = () => {
    const nameFieldId = useId();
    const emailFieldId = useId();
    const messageFieldId = useId();
    const countryFieldId = useId();

    const handleSubmit = (values, actions) => {
      console.log(values);
      actions.resetForm();
    };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={FeedbackSchema}
      >
        <Form>
          <label htmlFor={nameFieldId}>Username</label>
          <Field type="text" name="username" id={nameFieldId} />
          <ErrorMessage name="username" component="span" />

          <label htmlFor={emailFieldId}>Email</label>
          <Field type="email" name="email" id={emailFieldId} />
          <ErrorMessage name="email" component="span" />

          <label htmlFor={messageFieldId}>Comment</label>
          <Field as="textarea" name="message" id={messageFieldId} />
          <ErrorMessage name="message" component="span" />

          <label htmlFor={countryFieldId}>Choose the country</label>
          <Field as="select" name="country" id={countryFieldId} />
          <option value="ukraine">Ukraine</option>
          <option value="spain">Spain</option>
          <option value="portugal">Portugal</option>
          <Field />
          <ErrorMessage name="country" component="span" />

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    );
  };
  return <FeedbackForm />;
}
export default App;
