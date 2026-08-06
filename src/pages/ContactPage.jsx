import { useEffect, useRef, useState } from 'react';
import { FaRegPaperPlane } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';

const initialFormData = {
  anrede: 'Herr',
  vorname: '',
  nachname: '',
  email: '',
  telefonnummer: '',
  postleitzahl: '',
  message: '',
};

function ContactPage() {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState({ success: '', error: '' });
  const [errors, setErrors] = useState({ vorname: '', nachname: '', email: '', message: '', validationEmail: '' });
  const inputEmailRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = { vorname: '', nachname: '', email: '', message: '', validationEmail: '' };
    if (!formData.vorname) {
      newErrors.vorname = 'required';
    }
    if (!formData.nachname) {
      newErrors.nachname = 'required';
    }
    if (!formData.email) {
      newErrors.email = 'required';
    }
    if (!formData.message) {
      newErrors.message = 'required';
    }
    if (inputEmailRef.current && !inputEmailRef.current.checkValidity()) {
      newErrors.validationEmail = 'NotValid';
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const submitData = async (e) => {
    e.preventDefault();
    setMessages({ success: '', error: '' });
    if (!validateForm()) return;
    setLoading(false);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/send`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const userInfo = await response.json();

      if (userInfo) {
        setLoading(true);
        setMessages({
          success:
            'Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt. Unser Team wird sich zeitnah bei Ihnen melden.',
          error: '',
        });
        setFormData(initialFormData);
      }
    } catch (error) {
      setLoading(true);
      setMessages({
        success: '',
        error:
          'Ein technischer Fehler ist aufgetreten. Bitte versuchen Sie es später erneut. Wir bitten um Entschuldigung und danken für Ihr Verständnis.',
      });
    }
  };

  return (
    <form className="container sideBar" onSubmit={submitData}>
      <p className="mb-2">
        Sie haben eine Frage? Dann schreiben Sie uns! Wir bemühen uns Ihr Anliegen zu bearbeiten und setzen uns
        schnellstmöglich mit Ihnen in Verbindung.
      </p>
      <p className="mb-2 fontW-b fontS-xl"> Persönliche Angaben </p>
      <div className="d-grid gridTC-2-1fr-contact gap-1-15">
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label>Anrede:</label>
          <select
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            name="anrede"
            value={formData.anrede}
            onChange={handleInputChange}
          >
            <option>Herr</option> <option>Frau</option> <option>Dr.</option> <option>Andere</option>
          </select>
        </div>
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label style={{ color: errors.vorname ? '#EA2027' : '' }}> Vorname: </label>
          <input
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            type="text"
            name="vorname"
            value={formData.vorname}
            onChange={handleInputChange}
            style={{ borderColor: errors.vorname ? '#EA2027' : '' }}
          />
        </div>
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label style={{ color: errors.nachname ? '#EA2027' : '' }}> Nachname: </label>
          <input
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            type="text"
            name="nachname"
            value={formData.nachname}
            onChange={handleInputChange}
            style={{ borderColor: errors.nachname ? '#EA2027' : '' }}
          />
        </div>
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label style={{ color: errors.email || errors.validationEmail ? '#EA2027' : '' }}> E-Mail: </label>
          <input
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            type="email"
            name="email"
            ref={inputEmailRef}
            value={formData.email}
            onChange={handleInputChange}
            style={{ borderColor: errors.email || errors.validationEmail ? '#EA2027' : '' }}
          />
        </div>
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label>Telefonnummer:</label>
          <input
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            type="tel"
            name="telefonnummer"
            value={formData.telefonnummer}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-inline-Contact d-flex alignItem-c justifyContent-sb">
          <label>Postleitzahl:</label>
          <input
            className="mt-Contact-05 d-flex w-10 w-15 p-1 borderR-05 outline-none border"
            type="text"
            name="postleitzahl"
            value={formData.postleitzahl}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <textarea
        name="message"
        rows="5"
        className="d-flex w-100p mt-2 mb-2 resize-none p-1 borderR-05 fontS-md border outline-none fontF-inherit"
        placeholder="Bitte schreiben Sie Ihre Anfrage"
        value={formData.message}
        onChange={handleInputChange}
        style={{ borderColor: errors.message ? '#EA2027' : '' }}
      />
      <button type="submit" className="mb-05 p-1 fontW-b fontS-md fontC-w bg-blue border-none borderR-03 hover">
        <FaRegPaperPlane className="mr-1" /> SENDEN
      </button>
      {(errors.vorname || errors.nachname || errors.email || errors.message) && (
        <div className="fontS-md fontW-b fontC-r mt-1"> Bitte füllen Sie Pflichtangaben aus! </div>
      )}
      {errors.validationEmail && (
        <div className="fontS-md fontW-b fontC-r mt-1"> Bitte geben Sie eine gültige E-Mail ein ! </div>
      )}
      {!loading && (
        <div className="d-block mt-1">
          <ClipLoader />
        </div>
      )}

      {messages.success && <div className="fontC-b fontS-md fontW-b mt-1"> {messages.success} </div>}
      {messages.error && <div className="fontC-r fontS-md fontW-b mt-1"> {messages.error} </div>}
    </form>
  );
}

export default ContactPage;
