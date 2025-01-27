import React, { useState, useEffect } from "react";
import { MapPin, ChevronDown, AlertCircle } from "lucide-react";

interface LocationInputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: { target: { value: string; suggestion?: any } }) => void; // Replace `any` with the actual type of the suggestion object
  error?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  type,
  placeholder,
  value,
  onChange,
  error,
}) => {
  const [suggestions, setSuggestions] = useState<any[]>([]); // Replace `any` with the actual type of the suggestion object
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (value.length > 2 && isFocused) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  }, [value, isFocused]);

  const fetchSuggestions = async (input: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=CcVwEWToot1QSl3YgwwqrwsFxEdXaAlTZotfvRdy`,
      );
      const data = await response.json();
      setSuggestions(data.predictions || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: any) => {
    onChange({ target: { value: suggestion.description, suggestion } });
    setSuggestions([]);
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setSuggestions([]);
      setIsFocused(false);
    }
  };

  return (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 transform">
        <MapPin
          className={`h-5 w-5 ${error ? "text-red-400" : "text-gray-400"}`}
        />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange({ target: { value: e.target.value } })}
        onFocus={() => setIsFocused(true)}
        onKeyDown={handleKeyDown}
        className={`w-full rounded-lg border bg-white p-2.5 pl-11 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? "border-red-300" : "border-gray-200"
        }`}
      />
      {isLoading && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent"></div>
        </div>
      )}
      {suggestions.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.place_id}
              className="cursor-pointer p-2 text-sm hover:bg-gray-100"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="font-medium">
                {suggestion.structured_formatting.main_text}
              </div>
              <div className="text-xs text-gray-500">
                {suggestion.structured_formatting.secondary_text}
              </div>
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};

export default LocationInput;
