import iconSearch from "@/assets/icon-search.svg";

interface SearchSectionProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputRef: any;
  clearSearch: any;
  onClear: any;
}
// isClearable
const SearchSection = ({
  onClick,
  onChange,
  inputRef,
  clearSearch,
  onClear,
}: SearchSectionProps) => {
  return (
    <section className="search-section">
      <div className="search-section_left">
        <img
          className="search-section_icon"
          src={iconSearch.src}
          alt="icon-search"
        />

        <input
          className="search-section_input"
          type="text"
          placeholder="Search Github username..."
          onChange={onChange}
          ref={inputRef}
        />

        {clearSearch && (
          <button onClick={onClear} className="search-delete-icon">
            <i className="fa-solid fa-xmark"></i>
          </button>
        )}
      </div>

      <button className="search-section_btn" onClick={onClick}>
        Search
      </button>
    </section>
  );
};

export default SearchSection;
