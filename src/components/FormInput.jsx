import React, { useState } from "react";

const FormInput = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [step, setStep] = useState(1);
  const [showMessage, setShowMessage] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      setName(name.trim());
    } else if (step === 2) {
      const trimmedLocation = location.trim();
      if (name && trimmedLocation) {
        console.log(`SUCCESS: Added ${name} from ${trimmedLocation}`);
        console.log("SUCCESS: Added to the list successfully!");

        try {
          const response = await fetch(import.meta.env.VITE_PHASE_ONE_API_URL, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name, location: trimmedLocation }),
          });
          let data;
          try {
            data = await response.json();
            console.log("Full API Response:", data);
          } catch (jsonError) {
            const text = await response.text();
            console.error("Failed to parse JSON. Response text:", text);
            throw jsonError;
          }
        } catch (error) {
          console.error("API fetch failed:", error);
        }

        setShowMessage(true);
      }
    }
  };

  if (showMessage) {
    return (
      <>
        <p className="proceed-message">Thank you! Proceed for the next step</p>
        <button className="proceed-button" onClick={() => { if (typeof onProceed === 'function') onProceed(); }}>
          Proceed
        </button>
      </>
    );
  }

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      {step === 1 ? (
        <input
          className="input-field"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Introduce Yourself"
        />
      ) : (
        <input
          className="input-field"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Where are you from?"
        />
      )}
    </form>
  );
};

export default FormInput;
