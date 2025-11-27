"use client";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaEnvelope, FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import Footer from "@/components/Footer";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { VerificationModal } from "@/components/EmailVerificationModel";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function Register() {
  const t = useTranslations("register");
  const button = useTranslations("button");
  const { register, loading, error, success } = useAuthStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState({ day: "", month: "", year: "" });
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [genderOpen, setGenderOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const gender = [t("Gender.Male"), t("Gender.Female"), t("Gender.Others")];
  const books = [
    t("Books.cosmicSymphony"),
    t("Books.tantra"),
    t("Books.dasaMahavidya"),
    t("Books.chakras"),
    t("Books.sriChakraYantra"),
    t("Books.sriVidya"),
    t("Books.sriChakra"),
    t("Books.none"),
  ];

  const [years, setYears] = useState([]);
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYears(Array.from({ length: 100 }, (_, i) => currentYear - i));
  }, []);

  useEffect(() => {
    if (success) {
      setIsModalOpen(true);
      resetForm();
    } else if (error) {
      alert(error);
    }
  }, [success, error]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAge({ day: "", month: "", year: "" });
    setSelectedGender("");
    setSelectedCity("");
    setSelectedCountry("");
    setSelectedBooks([]);
  };

  const toggleBook = (book) => {
    const noneLabel = t("Books.none");
    setSelectedBooks((prev) => {
      if (book === noneLabel) return [noneLabel];
      const filtered = prev.filter((b) => b !== noneLabel);
      if (filtered.includes(book)) return filtered.filter((b) => b !== book);
      return [...filtered, book];
    });
  };

  const handleRegister = async () => {
    const data = {
      username: name,
      email,
      phone,
      DOB: `${age.day}-${age.month}-${age.year}`,
      gender: selectedGender,
      city: selectedCity,
      country: selectedCountry,
      booksRead: selectedBooks,
    };
    await register(data);
    console.log("data submitted", data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white flex-1 items-center justify-center">
      <div className="w-full flex flex-1 flex-col justify-center max-w-[425px] min-h-screen bg-gradient-to-b from-[#fce3da] via-[#f8f1ff] to-[#efe0fc] shadow-lg py-3 backdrop-blur-sm ">
        <p className="text-center text-[#4A4365] text-lg sm:text-xl leading-relaxed mb-6 px-4 sm:px-6">
          {t("text")} <br /> {t("text1")} <br /> {t("text2")}
        </p>
        <form
          className="space-y-4 px-4 sm:px-6 mb-16 sm:mb-10 lg:mb-18"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          {/* Name */}
          <InputField
            icon={<FaUser size={18} />}
            value={name}
            onChange={setName}
            placeholder={t("Form.name")}
            type="text"
            required
          />

          {/* Email */}
          <InputField
            icon={<FaEnvelope size={18} />}
            value={email}
            onChange={setEmail}
            placeholder={t("Form.email")}
            type="email"
            required
          />

          <PhoneInput
            className='w-full h-full border-2 border-orange-200 bg-white/80 rounded-full px-4 py-2'
            buttonStyle={{
              width: "max-content",
              height: "100%",
              marginLeft: "-12px",
              border: "0",
              borderRadius: "50px",
              hover: { border: "50px" },
              borderRight: "2px #b4b4b4 solid",

            }}
            id='phone'
            name='phone'
            country={"in"}
            value={phone}
            type='tel'
            onChange={setPhone}
            inputProps={{
              name: "phone",
              required: true,
              autoFocus: false,
              className:
                "w-full h-full border-none pl-10 pr-1 outline-none rounded-full",
            }}
            countryCodeEditable={false}
          />

          {/* DOB */}
          <div className="px-1 flex justify-center items-center gap-3">
            <label className="block text-gray-700 text-lg font-medium">
              {t("Form.age")}:
            </label>
            <div className="flex flex-1 gap-3">
              {[t("Form.day"), t("Form.month"), t("Form.year")].map((label, i) => (
                <select
                  key={label}
                  value={Object.values(age)[i]}
                  onChange={(e) =>
                    setAge((prev) => ({
                      ...prev,
                      [Object.keys(age)[i]]: e.target.value,
                    }))
                  }
                  className="flex-1 px-1 rounded-3xl border-2 border-orange-300 bg-white py-1 text-base text-gray-700 focus:border-orange-400 focus:outline-none"
                  required
                >
                  <option value="">{label}</option>
                  {i === 0 &&
                    Array.from({ length: 31 }, (_, j) => j + 1).map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  {i === 1 &&
                    [
                      "Jan",
                      "Feb",
                      "Mar",
                      "Apr",
                      "May",
                      "Jun",
                      "Jul",
                      "Aug",
                      "Sep",
                      "Oct",
                      "Nov",
                      "Dec",
                    ].map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  {i === 2 &&
                    years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                </select>
              ))}
            </div>
          </div>

          {/* Gender */}
          <Dropdown
            label={selectedGender}
            open={genderOpen}
            setOpen={setGenderOpen}
            items={gender}
            setSelected={setSelectedGender}
            placeholder={t("Form.gender")}
          />

          {/* Country */}
          <CountryDropdown
            value={selectedCountry}
            onChange={setSelectedCountry}
          />

          {/* City */}
          <input
            type="text"
            placeholder={t("Form.city")}
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="w-full rounded-3xl border-2 border-orange-300 bg-white py-2 px-5 text-base text-gray-700 placeholder-gray-400 focus:border-orange-400 focus:outline-none"
          />



          {/* Books */}
          <Dropdown
            label={
              selectedBooks.length
                ? `${selectedBooks.length} Book(s) Selected`
                : t("Form.selectedBooks")
            }
            open={bookOpen}
            setOpen={setBookOpen}
            items={books}
            multiSelect
            selectedItems={selectedBooks}
            toggleItem={toggleBook}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full max-w-26 mx-auto flex justify-center items-center cursor-pointer py-2 text-white font-semibold rounded-full transition duration-300 ${loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-pink-300 to-orange-300 hover:opacity-90"
              }`}
          >
            {loading ? "Submitting..." : button("submit")}
          </button>
        </form>
        <div className="w-full absolute bottom-0 z-20 mx-auto px-2">
          <Footer />
        </div>
        <VerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
}

function InputField({ icon, value, onChange, placeholder, type, required }) {
  return (
    <div className="relative flex items-center border-2 border-orange-200 bg-white/80 rounded-3xl px-4 py-2">
      <span className="text-gray-600 mr-3">{icon}</span>
      <input
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-base text-gray-700 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
}

function Dropdown({
  label,
  open,
  setOpen,
  items,
  setSelected,
  multiSelect = false,
  selectedItems = [],
  toggleItem,
  placeholder,
}) {
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  return (
    <div ref={dropdownRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-3xl border-2 border-orange-200 bg-white/80 py-2.5 px-5 text-sm text-gray-700 cursor-pointer hover:shadow-md transition-all "
      >
        <span
          className={
            label || selectedItems.length
              ? "text-gray-900 font-medium"
              : "text-gray-400"
          }
        >
          {label || placeholder}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${open ? "rotate-180 text-orange-400" : "text-gray-500"
            }`}
        />
      </div>
      {open && (
        <div className="absolute z-50 top-full mt-2 left-0 right-0 rounded-2xl border border-pink-100 bg-white shadow-lg max-h-36 overflow-y-scroll pt-2 pb-8">
          {items.map((item) => (
            <div
              key={item}
              onClick={() =>
                multiSelect
                  ? toggleItem(item)
                  : (setSelected(item), setOpen(false))
              }
              className={`flex items-center px-4 py-2 text-gray-700 cursor-pointer hover:bg-pink-100 ${selectedItems.includes(item) ? "bg-pink-50" : ""
                }`}
            >
              {multiSelect && (
                <input
                  type="checkbox"
                  checked={selectedItems.includes(item)}
                  onChange={() => toggleItem(item)}
                  className="mr-2 accent-orange-500"
                />
              )}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CountryDropdown({ value, onChange }) {
  const [input, setInput] = useState(value || "");
  const [show, setShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [isCountryValid, setIsCountryValid] = useState(false);

  const ref = useRef(null);
  const t = useTranslations("register");

  const allCountries = useRef([]);

  useEffect(() => {
    allCountries.current = Object.entries(countries.getNames("en")).map(
      ([code, name]) => ({ code, name })
    );
    setFiltered(allCountries.current);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    setShow(true);

    if (val.trim() === "") {
      setIsCountryValid(true);
      setFiltered(allCountries.current);
      return;
    }

    setIsCountryValid(false);

    const result = allCountries.current.filter((c) =>
      c.name.toLowerCase().includes(val.toLowerCase())
    );

    setFiltered(result);
  };


  const handleSelect = (name) => {
    setInput(name);
    onChange(name);
    setIsCountryValid(true); 
    setShow(false);
  };


  return (
    <div ref={ref} className="relative w-full">
      <input
        value={input}
        onChange={handleInput}
        onFocus={() => setShow(true)}
        placeholder={t("Form.country")}
        className="w-full px-4 py-2 border-2 border-orange-300 rounded-3xl bg-white placeholder-gray-400 focus:outline-none"
      />

      {show && (
        <ul className="absolute z-50 bg-white border border-orange-300 rounded-2xl w-full mt-1 max-h-40 overflow-y-auto shadow-md text-gray-700">
          {filtered.map((country) => (
            <li
              key={country.code}
              onClick={() => handleSelect(country.name)}
              className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}

      {input.length > 0 && !isCountryValid && (
        <p className="text-red-500 text-sm mt-1 ml-2">
          Please select a valid country from the list.
        </p>
      )}
    </div>
  );
}
