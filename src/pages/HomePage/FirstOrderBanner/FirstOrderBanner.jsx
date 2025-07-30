import React, { useState, useEffect } from "react";
import styles from "./FirstOrderBanner.module.css";
import InputField from "../../../shared/components/InputField/InputField";
import Button from "../../../shared/components/Button/Button";

import animalsImage from "../../../assets/FirstOrderBanner.png"; // Adjust the path as needed

export default function FirstOrderBanner() {
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [submitted, setSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: тут відправка на бекенд
    setSubmitted(true);
    setShowToast(true);
  };

  // Ховаємо тост через 3 сек
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  return (
    <div className={styles.banner}>
      <h2 className={styles.title}>5% off on the first order</h2>

      <form className={styles.form} onSubmit={handleSubmit}>
        <InputField
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <InputField
          name="phone"
          type="tel"
          placeholder="Phone number"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <InputField
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          disabled={submitted}
          className={submitted ? styles.submitted : styles.button}
        >
          {submitted ? "Request Submitted" : "Get a discount"}
        </Button>
      </form>

      {/* Тост-повідомлення */}
      {showToast && (
        <div className={styles.toast}>
          Your request has been submitted successfully!
        </div>
      )}

      <img
        src={animalsImage}
        alt=""
        aria-hidden="true"
        className={styles.animalsImage}
      />
    </div>
  );
}
