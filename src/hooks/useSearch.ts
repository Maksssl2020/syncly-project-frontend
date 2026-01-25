import { useEffect } from "react";
import useSaveSearchMutation from "./mutations/useSaveSearchMutation.ts";

type UseSearchProps = {
  inputValue: string;
  setSearch: (search: string) => void;
  saveSearchEnabled?: boolean;
};

function useSearch({
  inputValue,
  setSearch,
  saveSearchEnabled = false,
}: UseSearchProps) {
  const { saveSearch } = useSaveSearchMutation();

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch(inputValue);

      if (saveSearchEnabled && inputValue !== "") {
        saveSearch({ searchName: inputValue });
      }
    }, 500);

    return () => clearTimeout(id);
  }, [inputValue, saveSearch, saveSearchEnabled, setSearch]);
}

export default useSearch;
