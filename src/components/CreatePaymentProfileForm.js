import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Form, Col, Row, Button } from "react-bootstrap";
import { noop } from "lodash";
import { Formik } from "formik";
import {
  CardComponent,
  CardCVV,
  CardExpiry,
  CardNumber,
} from "@chargebee/chargebee-js-react-wrapper";

import { CHARGEBEE_SITE_TEST, CHARGEBEE_PUBLIC_KEY_TEST } from "../config";

const CreatePaymentProfileForm = ({ onSubmit, onClose }) => {
  const [loading, setLoading] = useState(false);

  const cardRef = useRef();

  window.Chargebee.init({
    site: CHARGEBEE_SITE_TEST,
    publishableKey: CHARGEBEE_PUBLIC_KEY_TEST,
  });

  const handleFormValidate = (values) => {
    const errors = {};

    if (!values.terms) {
      errors.terms = "Required Field!";
    }

    return errors;
  };

  const handleFormSubmit = (values) => {
    setLoading(true);

    // example of payment intent
    // created from Chargebee API - Payment Intents - Create a payment intent endpoint
    const paymentIntent = {
      id: "...",
      status: "inited",
      amount: 0,
      gateway_account_id: "...",
      expires_at: 1618585721,
      payment_method_type: "card",
      created_at: 1618583921,
      modified_at: 1618583921,
      object: "payment_intent",
      currency_code: "USD",
      gateway: "chargebee",
    };

    cardRef.current
      .authorizeWith3ds(paymentIntent, {}, {})
      .then((authorizedPaymentIntent) => {
        console.log("Authorized payment intent", authorizedPaymentIntent.id);
      })
      .catch((error) => {
        console.error("Error occurred", error);
      });
  };

  return (
    <Formik
      enableReinitialize
      initialValues={{
        terms: false,
      }}
      onSubmit={handleFormSubmit}
      validate={handleFormValidate}
    >
      {({
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        touched,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <CardComponent className="field-set field" ref={cardRef}>
            <CardNumber
              placeholder="4111 1111 1111 1111"
              className="field empty"
            />
            <CardExpiry placeholder="MM / YY" className="field empty" />
            <CardCVV placeholder="CVV" className="field empty" />
          </CardComponent>

          <Form.Group className="mt-2">
            <Form.Check
              custom
              id="terms"
              name="terms"
              label="I agree to the Terms"
              checked={values.terms}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={touched.terms && !!errors.terms}
              feedback={errors.terms}
            />
          </Form.Group>

          <Row noGutters className="mt-3">
            {loading && (
              <Col xs="auto">
                <span>Loading...</span>
              </Col>
            )}
            <Col className="d-flex justify-content-end">
              <Button
                variant="outline-secondary"
                onClick={onClose}
                className="mr-2"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={loading}>
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

CreatePaymentProfileForm.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

CreatePaymentProfileForm.defaultProps = {
  onSubmit: noop,
  onClose: noop,
};

export default CreatePaymentProfileForm;
