"use client";
import { useState, useRef, useEffect } from "react";
import { FaUser, FaBirthdayCake, FaEnvelope, FaChevronDown } from "react-icons/fa";
import Footer from "@/components/Footer";
import Image from "next/image";
import Back from "@/components/Back";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/store/authStore";
import { VerificationModal } from "@/components/EmailVerificationModel";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
countries.registerLocale(enLocale);

export default function Register() {
  const t = useTranslations("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  // console.log("AGE =", age);
  const [cityOpen, setCityOpen] = useState(false);
  const [genderOpen, setGenderOpen] = useState(false);
  const [countryOpen, setCountryOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  // console.log("Gender", selectedGender);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedBooks, setSelectedBooks] = useState([]);
  const button = useTranslations("button");
  const cities = [t("Cities.delhi"), t("Cities.mumbai"), t("Cities.bangalore")];
  const gender = [t("Gender.Male"), t("Gender.Female"), t("Gender.Others")];
  // const countries = [
  //   t("Countries.india"),
  //   t("Countries.usa"),
  //   t("Countries.uk"),
  // ];

  const books = [
    t("Books.cosmicSymphony"),
    t("Books.tantra"),
    t("Books.dasaMahavidya"),
    t("Books.chakras"),
    t("Books.sriChakraYantra"),
    t("Books.sriVidya"),
  ];

  const toggleBook = (book) => {
    if (selectedBooks.includes(book)) {
      setSelectedBooks(selectedBooks.filter((b) => b !== book));
    } else {
      setSelectedBooks([...selectedBooks, book]);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { register, loading, error, success } = useAuthStore();
  useEffect(() => {
    if (success) {
      console.log("Success =", success);
      setIsModalOpen(true);
      resetForm();
    } else if (error) {
      alert(error);
      console.log("Error =", error);
    }
  }, [success, error]);

  const handleRegister = async () => {
    const data = {
      username: name,
      email: email,
      phone: phone,
      age: age,
      gender: selectedGender,
      city: selectedCity,
      country: selectedCountry,
      booksRead: selectedBooks,
    };
    await register(data);
  };
  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setAge("");
    setSelectedGender("");
    setSelectedCity("");
    setSelectedCountry("");
    setSelectedBooks([]);
    setCityOpen(false);
    setCountryOpen(false);
    setBookOpen(false);
  };

  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="flex justify-center min-h-screen bg-gray-100 overflow-visible">
      <div className="relative w-[425px] bg-[linear-gradient(to_bottom,_#fce3da_40%,_#f8f1ff_60%,_#efe0fc_100%)] bg-red-500 overflow-visible">
        {/* Back Button */}
        <Back />

        <p className="mt-24 mb-8 text-center text-[#4A4365] text-lg leading-relaxed px-2">
          {t("text")} <br /> {t("text1")}
          <br /> {t("text2")}
        </p>

        <form
          className="space-y-4 px-2"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
        >
          <div className="relative px-3">
            <FaUser
              size={20}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-black"
            />
            <input
              type="text"
              placeholder={t("Form.name")}
              className="w-full rounded-3xl border-2 border-orange-200 bg-white/80 py-2 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="relative px-3">
            <FaEnvelope
              size={20}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-black"
            />
            <input
              type="email"
              placeholder={t("Form.email")}
              className="w-full rounded-3xl border-2 border-white bg-transparent py-2 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative px-3">
            <div className="flex items-center w-full rounded-3xl border-2 border-white bg-transparent py-2 px-5">
              <div className="relative w-6 h-5 mr-3">
                <Image
                  src="/hindi.png"
                  alt="India Flag"
                  fill
                  className="object-contain"
                  sizes="(max-width: 425px) 100vw, 425px"
                  priority
                />
              </div>
              <input
                type="tel"
                placeholder={t("Form.phone")}
                className="flex-1 bg-transparent text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="relative px-3">
            <FaBirthdayCake
              size={20}
              className="absolute left-8 top-1/2 -translate-y-1/2 text-black"
            />
            <input
              type="number"
              min={2}
              max={99}
              placeholder={t("Form.age")}
              className="w-full rounded-3xl border-2 border-white bg-white py-2 pl-12 pr-4 text-base text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>

          <Dropdown
            label={selectedGender}
            open={genderOpen}
            setOpen={(v) => {
              setGenderOpen(v);
              if (v) {
                setCityOpen(false);
                setCountryOpen(false);
                setBookOpen(false);
              }
            }}
            placeholder={t("Form.gender")}
            items={gender}
            setSelected={(gender) => setSelectedGender(gender)}
          />
          {/* <Dropdown
            label={selectedCity}
            open={cityOpen}
            setOpen={(v) => {
              setCityOpen(v);
              if (v) {
                setCountryOpen(false);
                setBookOpen(false);
              }
            }}
            placeholder={t("Form.city")}
            items={cities}
            setSelected={(city) => setSelectedCity(city)}
          /> */}

          {/* <Dropdown
            label={selectedCountry}
            open={countryOpen}
            setOpen={(v) => {
              setCountryOpen(v);
              if (v) {
                setCityOpen(false);
                setBookOpen(false);
              }
            }}
            placeholder={t("Form.country")}
            items={countries}
            setSelected={(country) => setSelectedCountry(country)}
          /> */}


          <div className="relative px-3">
              <input
              type="text"
              placeholder={t("Form.city")}
              className="w-full rounded-3xl border-2 border-orange-300 bg-white py-2 px-5 text-base text-gray-700 placeholder-gray-400 focus:border-orange-300 focus:outline-none"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              required
            />
          </div>

          <CountryDropdown onChange={(country) => setSelectedCountry(country)} value={selectedCountry} />

          <Dropdown
            label={
              selectedBooks.length
                ? `${selectedBooks.length} Book(s) Selected`
                : t("Form.selectedBooks")
            }
            open={bookOpen}
            setOpen={(v) => {
              setBookOpen(v);
              if (v) {
                setCityOpen(false);
                setCountryOpen(false);
              }
            }}
            items={books}
            multiSelect={true}
            selectedItems={selectedBooks}
            toggleItem={toggleBook}
          />

          <div className="mx-auto mt-14 mb-20">
            <button
              type="submit"
              disabled={loading}
              className={`px-8 py-3 min-w-36 max-w-36 whitespace-nowrap flex justify-center items-center text-base font-semibold text-white rounded-full mx-auto transition duration-300 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-300 to-orange-300 hover:opacity-90"
              }`}
            >
              {loading ? "submitting..." : button("submit")}
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="absolute bottom-0 z-20 mx-auto w-full ">
          <Footer />
        </div>
        <VerificationModal isOpen={isModalOpen} onClose={closeModal} />
      </div>
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
  placeholder = "Select items...",
}) {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setOpen]);

  const displayLabel =
    multiSelect && selectedItems.length > 0
      ? `${selectedItems.length} Book(s) Selected`
      : label || placeholder;

  return (
    <div
      ref={dropdownRef}
      className={`relative w-full px-3 ${open ? "z-50" : "z-40"}`}
    >
      <div
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center rounded-3xl border-2 border-orange-200 bg-white/80 py-2.5 px-5 text-sm text-gray-700 cursor-pointer hover:shadow-md transition-all"
      >
        <span
          className={`${
            selectedItems.length
              ? "text-gray-900 font-medium "
              : "text-gray-400 "
          }`}
        >
          {displayLabel}
        </span>
        <FaChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180 text-orange-400" : "text-gray-500"
          }`}
        />
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-full left-3 right-3 mt-2 rounded-2xl border border-pink-100 bg-white shadow-lg min-h-20 overflow-y-auto z-[9999]">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item}
                className={`flex items-center px-4 py-1 text-gray-700 text-sm cursor-pointer hover:bg-pink-100 ${
                  selectedItems.includes(item) ? "bg-pink-50" : ""
                }`}
                onClick={() =>
                  multiSelect
                    ? toggleItem(item)
                    : (setSelected(item), setOpen(false))
                }
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
            ))
          ) : (
            <div className="px-4 py-2 text-gray-400 text-sm italic">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}

const CountryDropdown = ({ value, onChange }) => {
  const [input, setInput] = useState(value || "");
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const ref = useRef(null);
  const t = useTranslations("register");


  useEffect(() => {
    setInput(value || "");
  }, [value]);

  useEffect(() => {
    function handleClickOutSide(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, []);

  useEffect(() => {
    const countryNames = countries.getNames("en");
    const countryArray = Object.entries(countryNames).map(([code, name]) => ({
      code,
      name,
    }));
    setAllCountries(countryArray);
    setFilteredCountries(countryArray);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
    setShowDropdown(true);

    if (value.trim() === "") {
      setFilteredCountries(allCountries);
    } else {
      const filtered = allCountries.filter((country) =>
        country.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  const handleSelect = (countryName) => {
    setInput(countryName);
    setShowDropdown(false);
    onChange(countryName);
  };

  return (
    <div ref={ref} className="relative w-full px-3">
        <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder={t("Form.country")}
        onFocus={() => setShowDropdown(true)}
        className="w-full px-4 py-2 border-2 border-orange-300 rounded-4xl bg-white placeholder-gray-400 focus:outline-none  focus:ring-orange-400"
      />

      {showDropdown && filteredCountries.length > 0 && (
        <ul className="absolute z-50 bg-white border border-orange-300 rounded w-[90%] mt-1 max-h-28 overflow-y-auto shadow-md">
          {filteredCountries.map((country) => (
            <li
              key={country.code}
              onClick={() => handleSelect(country.name)}
              className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
            >
              {country.name}
            </li>
          ))}
        </ul>
      )}

      {showDropdown && input && filteredCountries.length === 0 && (
        <div className="absolute z-10 bg-white border border-gray-300 rounded w-full mt-1 px-4 py-2 text-gray-500">
          No countries found
        </div>
      )}
    </div>
  );
};